import os
import json
import time
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env'))

SUPABASE_URL = os.environ.get('SUPABASE_URL', '').strip()
SUPABASE_ANON_KEY = os.environ.get('SUPABASE_ANON_KEY', '').strip()

if not SUPABASE_URL or not SUPABASE_ANON_KEY:
    print("ERROR: Set SUPABASE_URL and SUPABASE_ANON_KEY in .env")
    exit(1)

sb: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

def upsert_batch(table_name: str, data: list[dict], batch_size: int = 50):
    total = len(data)
    if total == 0:
        return
    for i in range(0, total, batch_size):
        batch = data[i:i + batch_size]
        sb.table(table_name).upsert(batch).execute()
        print(f"  {table_name}: upserted {min(i + batch_size, total)}/{total}")
        time.sleep(0.5)

def run():
    print("Loading seed data...")
    with open('seed_data.json', 'r') as f:
        data = json.load(f)
    
    print("Seeding states...")
    upsert_batch('states', data.get('states', []))
    
    print("Seeding state_sub_regions...")
    upsert_batch('state_sub_regions', data.get('state_sub_regions', []))
    
    print("Seeding categories...")
    upsert_batch('categories', data.get('categories', []))
    
    print("Seeding cultural_items...")
    upsert_batch('cultural_items', data.get('cultural_items', []))
    
    print("Seeding festivals...")
    upsert_batch('festivals', data.get('festivals', []))
    
    print("Seeding monuments...")
    upsert_batch('monuments', data.get('monuments', []))
    
    print("Seeding monument_hotspots...")
    upsert_batch('monument_hotspots', data.get('monument_hotspots', []))
    
    print("✅ All data seeded successfully!")

if __name__ == '__main__':
    run()
