"""
Phase 5 Comprehensive Live Validation Script.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.environ["REPOSITORY_BACKEND"] = "supabase"

import asyncio
import httpx
from app.core.config import get_settings
get_settings.cache_clear()
from app.main import app

test_cases = [
    ("/api/health", 200, True),
    ("/api/states", 200, True),
    ("/api/states/mh", 200, True),
    ("/api/states/mh/categories", 200, True),
    ("/api/states/mh/culture", 200, True),
    ("/api/culture/vada-pav", 200, True),
    ("/api/monuments/gateway-of-india", 200, True),
    ("/api/monuments/gateway-of-india/hotspots", 200, True),
    ("/api/festivals", 200, True),
    ("/api/festivals/gudi-padwa", 200, True),
    ("/api/passport", 200, True),
    ("/api/states/nonexistent-state", 404, False),
    ("/api/culture/nonexistent-item", 404, False),
    ("/api/monuments/nonexistent-monument", 404, False),
    ("/api/festivals/nonexistent-festival", 404, False),
]

async def run_live_audit():
    print("=== STEP 9: LIVE READ-ONLY & ERROR ENVELOPE AUDIT ===")
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        for ep, expected_status, expected_success in test_cases:
            r = await client.get(ep)
            j = r.json()
            assert r.status_code == expected_status, f"{ep} expected status {expected_status}, got {r.status_code}"
            assert j.get("success") == expected_success, f"{ep} expected success={expected_success}"
            if expected_success:
                assert "data" in j, f"{ep} missing data envelope"
            else:
                assert "error" in j and "code" in j["error"] and "message" in j["error"], f"{ep} missing error envelope structure"
            print(f"{ep:40} -> Status: {r.status_code:3}, success: {str(j.get('success')):5} (PASS)")

    print("\nALL LIVE ENDPOINTS AND ERROR ENVELOPES VERIFIED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(run_live_audit())
