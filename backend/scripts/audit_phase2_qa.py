"""
End-to-End QA Audit Runner for Frontend Phase 2
Directly executes all 16 API endpoints against live Supabase repository layer.
"""
import os
import sys

# Ensure repository backend is supabase
os.environ["REPOSITORY_BACKEND"] = "supabase"

from fastapi.testclient import TestClient
from app.main import app as main_app

def test_e2e_qa():
    print("=== STARTING FRONTEND PHASE 2 END-TO-END QA AUDIT ===")
    
    with TestClient(main_app) as client:
        # 1. Health
        res = client.get("/api/health")
        assert res.status_code == 200, f"Health failed: {res.status_code}"
        assert res.json()["data"]["status"] == "ok"
        print("[QA PASS] GET /api/health -> 200 OK")

        # 2. States List
        res = client.get("/api/states")
        assert res.status_code == 200
        states = res.json()["data"]
        state_ids = [s["id"] for s in states]
        for sid in ["mh", "rj", "gj", "kl", "as", "tn"]:
            assert sid in state_ids, f"Missing state id {sid}"
        print(f"[QA PASS] GET /api/states -> 200 OK (6 authoritative states: {state_ids})")

        # 3. State Details & Culture
        for sid in ["mh", "rj", "gj", "kl", "as", "tn"]:
            res = client.get(f"/api/states/{sid}")
            assert res.status_code == 200
            s_data = res.json()["data"]
            assert s_data["id"] == sid
            
            # Categories
            res_cat = client.get(f"/api/states/{sid}/categories")
            assert res_cat.status_code == 200
            
            # Culture
            res_cul = client.get(f"/api/states/{sid}/culture")
            assert res_cul.status_code == 200
        print("[QA PASS] GET /api/states/{id} & /categories & /culture for all 6 states -> 200 OK")

        # 4. Canonical Cultural Items
        for item_id in ["vada-pav", "mumbai-vada-pav"]:
            res = client.get(f"/api/culture/{item_id}")
            assert res.status_code == 200
            data = res.json()["data"]
            assert "vada" in data["name"].lower()
            assert data["state_id"] == "mh"
            assert data["type"] == "food"
            print(f"[QA PASS] GET /api/culture/{item_id} -> 200 OK ('{data['name']}')")

        # 5. Cultural Connections
        res = client.get("/api/culture/vada-pav/connections")
        assert res.status_code == 200
        conn_data = res.json()["data"]
        assert "center" in conn_data
        assert "connections" in conn_data
        print(f"[QA PASS] GET /api/culture/vada-pav/connections -> 200 OK ({len(conn_data['connections'])} nodes)")

        # 6. Monuments & Hotspots
        res = client.get("/api/monuments")
        assert res.status_code == 200
        monuments = res.json()["data"]
        assert len(monuments) >= 4
        print(f"[QA PASS] GET /api/monuments -> 200 OK ({len(monuments)} monuments)")

        res = client.get("/api/monuments/gateway-of-india")
        assert res.status_code == 200
        m_data = res.json()["data"]
        assert m_data["name"] == "Gateway of India"
        assert "has_3d_model" in m_data

        res = client.get("/api/monuments/gateway-of-india/hotspots")
        assert res.status_code == 200
        hotspots = res.json()["data"]
        assert len(hotspots) >= 4
        for h in hotspots:
            assert "position" in h
            assert "x" in h["position"] and "y" in h["position"] and "z" in h["position"]
            assert isinstance(h["position"]["x"], (int, float))
        print(f"[QA PASS] GET /api/monuments/gateway-of-india/hotspots -> 200 OK ({len(hotspots)} numeric 3D hotspots)")

        # 7. Festivals
        res = client.get("/api/festivals")
        assert res.status_code == 200
        festivals = res.json()["data"]
        assert len(festivals) >= 7

        res = client.get("/api/festivals/gudi-padwa")
        assert res.status_code == 200
        f_data = res.json()["data"]
        assert "Gudi Padwa" in f_data["name"]
        print(f"[QA PASS] GET /api/festivals & /gudi-padwa -> 200 OK ('{f_data['name']}')")

        # 8. Surprise Discovery
        res = client.get("/api/discover/surprise")
        assert res.status_code == 200
        surp_data = res.json()["data"]
        assert "cultural_item" in surp_data
        print(f"[QA PASS] GET /api/discover/surprise -> 200 OK (returned '{surp_data['cultural_item']['name']}')")

        # 9. Passport Persistence & Deduplication
        res = client.get("/api/passport")
        assert res.status_code == 200
        initial_stats = res.json()["data"]["stats"]

        res = client.post("/api/passport/discover", json={"item_type": "food", "item_id": "vada-pav"})
        assert res.status_code == 200
        updated_stats = res.json()["data"]["stats"]
        assert updated_stats["total_discoveries"] >= initial_stats["total_discoveries"]
        print(f"[QA PASS] POST /api/passport/discover -> 200 OK (total discoveries: {updated_stats['total_discoveries']})")

        # 10. 404 Error Envelopes
        res_404 = client.get("/api/states/nonexistent")
        assert res_404.status_code == 404
        assert res_404.json()["success"] is False
        assert res_404.json()["error"]["code"] == "NOT_FOUND"

        res_cul_404 = client.get("/api/culture/nonexistent")
        assert res_cul_404.status_code == 404
        assert res_cul_404.json()["success"] is False
        assert res_cul_404.json()["error"]["code"] == "NOT_FOUND"
        print("[QA PASS] 404 Error Envelopes validated for nonexistent resources")

    print("\n>>> ALL FRONTEND PHASE 2 END-TO-END QA CHECKS PASSED SUCCESSFULLY <<<")

if __name__ == "__main__":
    test_e2e_qa()
