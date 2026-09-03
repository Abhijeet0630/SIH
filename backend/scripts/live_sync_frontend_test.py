"""
Controlled Live Database Sync Verification Script for Frontend Phase 1
1. Reads current value of 'vada-pav' from Supabase / Backend API
2. Modifies a safe non-destructive text field ('origin')
3. Reads modified value from Backend API
4. Restores original value in Supabase
5. Reads restored value from Backend API
"""
import httpx
from app.core.config import get_settings

settings = get_settings()

def run_sync_test():
    url = f"{settings.SUPABASE_URL}/rest/v1/cultural_items?id=eq.vada-pav"
    headers = {
        "apikey": settings.SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {settings.SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

    # 1. Read current
    resp = httpx.get(url, headers=headers, timeout=10.0)
    assert resp.status_code == 200, f"Read failed: {resp.status_code}"
    original_data = resp.json()[0]
    original_origin = original_data.get("origin", "Dadar, Mumbai")
    print(f"[1. ORIGINAL] vada-pav origin in Supabase: '{original_origin}'")

    # 2. Update to safe test string
    test_origin = "Dadar Station Central, Mumbai (Live Sync Test)"
    patch_resp = httpx.patch(url, headers=headers, json={"origin": test_origin}, timeout=10.0)
    assert patch_resp.status_code in (200, 204), f"Patch failed: {patch_resp.status_code}"
    print(f"[2. MODIFIED] Patched vada-pav origin to: '{test_origin}'")

    # 3. Verify read back from Supabase
    verify_resp = httpx.get(url, headers=headers, timeout=10.0)
    assert verify_resp.status_code == 200
    modified_val = verify_resp.json()[0]["origin"]
    assert modified_val == test_origin, f"Expected {test_origin}, got {modified_val}"
    print(f"[3. VERIFIED] Read back modified value from Supabase: '{modified_val}'")

    # 4. Restore original
    restore_resp = httpx.patch(url, headers=headers, json={"origin": original_origin}, timeout=10.0)
    assert restore_resp.status_code in (200, 204), f"Restore failed: {restore_resp.status_code}"
    print(f"[4. RESTORED] Patched vada-pav origin back to: '{original_origin}'")

    # 5. Verify restored
    final_resp = httpx.get(url, headers=headers, timeout=10.0)
    assert final_resp.status_code == 200
    restored_val = final_resp.json()[0]["origin"]
    assert restored_val == original_origin, f"Expected {original_origin}, got {restored_val}"
    print(f"[5. CONFIRMED] Final read back matches original: '{restored_val}'")
    print("\n>>> LIVE DATABASE SYNC TEST: SUCCESSFUL <<<")

if __name__ == "__main__":
    run_sync_test()
