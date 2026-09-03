"""
Authorized Safe Seed Execution Script.
Executes the safe seed records matching the live remote Supabase schema with ON CONFLICT DO NOTHING semantics.
"""
import hashlib
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import httpx
from app.core.config import get_settings

s = get_settings()

HEADERS = {
    "apikey": s.SUPABASE_ANON_KEY,
    "Authorization": f"Bearer {s.SUPABASE_ANON_KEY}",
    "Content-Type": "application/json",
    "Prefer": "resolution=ignore-duplicates,return=representation",
}

def execute():
    print("=== 1. PRE-EXECUTION CHECK ===")
    r_states = httpx.get(f"{s.SUPABASE_URL}/rest/v1/states", headers=HEADERS)
    states = r_states.json()
    print(f"States count: {len(states)} (IDs: {[x['id'] for x in states]})")
    assert len(states) == 6, "States count must be 6"

    # 1. Categories (Additive)
    print("\n=== 2. EXECUTING SAFE SEED VIA POSTGREST ===")
    new_categories = [
        {"id": "crafts", "name": "Arts & Crafts", "description": "Warli tribal paintings, bamboo weaving, bell metal craft, and lacquer art.", "icon": "Palette"},
        {"id": "architecture", "name": "Architecture & Engineering", "description": "Stepwells, living root bridges, monolithic excavations, and vernacular masonry.", "icon": "Building2"},
        {"id": "tribal", "name": "Tribal Culture & Lore", "description": "Sacred groves, indigenous knowledge systems, folklore, and harmonious forest traditions.", "icon": "Trees"},
        {"id": "culture", "name": "Cultural Heritage & Living Traditions", "description": "Sacred pilgrimages, community rituals, and living heritage.", "icon": "Compass"},
        {"id": "monuments", "name": "Monuments & Wonders", "description": "World Heritage landmarks, grand arches, and archaeological marvels.", "icon": "Castle"},
        {"id": "all", "name": "All Heritage", "description": "Explore all living traditions, sacred sites, culinary arts, and monuments.", "icon": "Compass"},
    ]
    r = httpx.post(f"{s.SUPABASE_URL}/rest/v1/categories", headers=HEADERS, json=new_categories)
    print(f"Categories insert status: {r.status_code}")

    # 2. Cultural Items (23 items)
    with open("../DB/Backend/database/seed_data.json", "r", encoding="utf-8") as f:
        src_data = json.load(f)

    approved_states = {"maharashtra": "mh", "assam": "as", "rajasthan": "rj"}
    cultural_items_to_insert = []
    
    for item in src_data["cultural_items"]:
        src_state = item.get("state_id")
        if src_state in approved_states:
            adapted = {
                "id": item["id"],
                "name": item["title"],
                "type": item.get("category"),
                "state_id": approved_states[src_state],
                "category_id": item.get("category"),
                "short_description": item.get("short_description") or "",
                "description": item.get("description") or "",
                "history": item.get("history"),
                "cultural_significance": item.get("cultural_significance"),
                "origin": item.get("location_name", {}).get("name") if isinstance(item.get("location_name"), dict) else item.get("location_name"),
                "region": item.get("location_name", {}).get("district") if isinstance(item.get("location_name"), dict) else None,
                "image_url": item.get("primary_image"),
                "tags": item.get("tags", []),
                "recipe": item.get("recipe_info"),
            }
            cultural_items_to_insert.append(adapted)

    # Add vada-pav canonical alias
    vada_pav_alias = dict(cultural_items_to_insert[1])
    vada_pav_alias["id"] = "vada-pav"
    cultural_items_to_insert.append(vada_pav_alias)

    print(f"Inserting {len(cultural_items_to_insert)} cultural items...")
    r = httpx.post(f"{s.SUPABASE_URL}/rest/v1/cultural_items", headers=HEADERS, json=cultural_items_to_insert)
    print(f"Cultural Items insert status: {r.status_code}")
    if r.status_code >= 400:
        print("Cultural Items Error:", r.text)

    # 3. Monuments (4 monuments)
    monuments_to_insert = []
    for m in src_data["monuments"]:
        src_state = m.get("state_id")
        if src_state in approved_states:
            monuments_to_insert.append({
                "id": m["id"],
                "name": m["name"],
                "state_id": approved_states[src_state],
                "location": m.get("location_name") or m.get("district_or_city") or "",
                "built_year": m.get("year_built"),
                "architecture": m.get("architectural_style"),
                "history": m.get("detailed_history"),
                "description": m.get("description") or m.get("short_description"),
                "image_url": m.get("image") or m.get("banner_image"),
                "model_url": m.get("model_url"),
            })

    print(f"Inserting {len(monuments_to_insert)} monuments...")
    r = httpx.post(f"{s.SUPABASE_URL}/rest/v1/monuments", headers=HEADERS, json=monuments_to_insert)
    print(f"Monuments insert status: {r.status_code}")
    if r.status_code >= 400:
        print("Monuments Error:", r.text)

    # 4. Monument Hotspots (12 hotspots)
    approved_monument_ids = {m["id"] for m in monuments_to_insert}
    hotspots_to_insert = []
    for h in src_data["monument_hotspots"]:
        if h["monument_id"] in approved_monument_ids:
            hotspots_to_insert.append({
                "id": h["id"],
                "monument_id": h["monument_id"],
                "name": h.get("title"),
                "description": h.get("detailed_text") or h.get("short_description"),
                "x": float(h.get("position_x") or 0.0),
                "y": float(h.get("position_y") or 0.0),
                "z": float(h.get("position_z") or 0.0),
                "annotation": h.get("architectural_note"),
            })

    print(f"Inserting {len(hotspots_to_insert)} monument hotspots...")
    r = httpx.post(f"{s.SUPABASE_URL}/rest/v1/monument_hotspots", headers=HEADERS, json=hotspots_to_insert)
    print(f"Monument Hotspots insert status: {r.status_code}")
    if r.status_code >= 400:
        print("Hotspots Error:", r.text)

    # 5. Festivals (7 festivals)
    festivals_state_map = {"maharashtra": "mh", "assam": "as", "kerala": "kl", "rajasthan": "rj"}
    festivals_to_insert = []
    for fest in src_data["festivals"]:
        src_state = fest.get("state_id")
        if src_state in festivals_state_map:
            festivals_to_insert.append({
                "id": fest["id"],
                "name": fest["name"],
                "description": fest.get("short_description") or "",
                "significance": fest.get("cultural_significance"),
                "rituals": fest.get("traditional_practices", []),
                "states": [festivals_state_map[src_state]],
                "duration_days": 1,
                "month": int(fest.get("month_index") if fest.get("month_index") is not None else 1),
                "image_url": fest.get("image"),
            })

    print(f"Inserting {len(festivals_to_insert)} festivals...")
    r = httpx.post(f"{s.SUPABASE_URL}/rest/v1/festivals", headers=HEADERS, json=festivals_to_insert)
    print(f"Festivals insert status: {r.status_code}")
    if r.status_code >= 400:
        print("Festivals Error:", r.text)

    print("\n=== 3. IMMEDIATE DATABASE VALIDATION ===")
    for table in ["states", "categories", "cultural_items", "monuments", "monument_hotspots", "festivals"]:
        r_tab = httpx.get(f"{s.SUPABASE_URL}/rest/v1/{table}", headers=HEADERS)
        data = r_tab.json()
        print(f"Table '{table}': {len(data)} rows")

if __name__ == "__main__":
    execute()
