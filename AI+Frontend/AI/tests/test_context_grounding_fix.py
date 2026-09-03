"""
Comprehensive regression test suite for Bharat AI Strict Cultural Domain & Intent Routing.
Covers:
- Cultural queries: Idli, Vada Pav, Raigad Fort, Gateway of India, Gudi Padwa, Muga Silk, Living Root Bridges, Ellora Caves.
- Heritage travel queries: Raigad Fort from Alandi, Gateway of India location, visiting Ellora Caves.
- Out of domain refusals: Politics, sports/cricket, programming/React/Python, weather, stock predictions.
- Context contamination tests across states (MH, AS, KL).
- Multi-turn topic transition tests.
- Explicit assertions against 'In the context of' and unrelated spatial atlas links.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


# ── 1. CULTURAL QUERIES ──────────────────────────────────────────────────────

def test_idli_origin_cultural():
    res = client.post("/api/ai/chat", json={"message": "idli origin", "context": {"view": "/"}})
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()

    assert "idli" in msg
    assert "in the context of" not in msg
    assert "maharashtra has a deeply layered history" not in msg
    assert "gateway of india" not in msg
    assert any("idli" in s.lower() for s in data["suggestions"])


def test_what_is_vada_pav():
    res = client.post("/api/ai/chat", json={"message": "what is vada pav?", "context": {"view": "/"}})
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()

    assert "vada pav" in msg or "mumbai" in msg
    assert "in the context of" not in msg


def test_tell_me_about_raigad_fort():
    res = client.post("/api/ai/chat", json={"message": "tell me about Raigad Fort", "context": {"view": "/"}})
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()

    assert "raigad" in msg or "shivaji" in msg
    assert "in the context of" not in msg


def test_history_of_gateway_of_india():
    res = client.post("/api/ai/chat", json={"message": "history of Gateway of India", "context": {"view": "/"}})
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()

    assert "gateway of india" in msg or "apollo bunder" in msg or "wittet" in msg
    assert "in the context of" not in msg


def test_why_is_gudi_padwa_celebrated():
    res = client.post("/api/ai/chat", json={"message": "why is Gudi Padwa celebrated?", "context": {"view": "/"}})
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()

    assert "gudi padwa" in msg or "new year" in msg or "chaitra" in msg
    assert "in the context of" not in msg


def test_what_is_muga_silk():
    res = client.post("/api/ai/chat", json={"message": "what is Muga silk?", "context": {"view": "/"}})
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()

    assert "muga" in msg or "silk" in msg or "assam" in msg
    assert "in the context of" not in msg


def test_what_are_living_root_bridges():
    res = client.post("/api/ai/chat", json={"message": "what are Living Root Bridges?", "context": {"view": "/"}})
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()

    assert "root bridge" in msg or "meghalaya" in msg or "khasi" in msg
    assert "in the context of" not in msg


def test_tell_me_about_ellora_caves():
    res = client.post("/api/ai/chat", json={"message": "tell me about Ellora Caves", "context": {"view": "/"}})
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()

    assert "ellora" in msg or "kailasa" in msg or "monolithic" in msg
    assert "in the context of" not in msg


# ── 2. HERITAGE TRAVEL QUERIES ───────────────────────────────────────────────

def test_how_to_go_to_raigad_fort_from_alandi():
    """Specific case: Travel route to Raigad Fort from Alandi."""
    res = client.post("/api/ai/chat", json={
        "message": "how to go to Raigad Fort from Alandi?",
        "context": {"view": "/"}
    })
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()

    # Must NOT be rejected as out-of-domain
    assert "can't help with politics" not in msg
    assert "solely in india's cultural heritage" not in msg
    assert "raigad" in msg
    assert any(k in msg for k in ["pune", "mahad", "ropeway", "nh 48", "tamhini", "pachad", "steps", "road", "km"])


def test_where_is_gateway_of_india():
    res = client.post("/api/ai/chat", json={
        "message": "where is Gateway of India?",
        "context": {"view": "/"}
    })
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()

    assert "can't help with politics" not in msg
    assert "mumbai" in msg or "apollo bunder" in msg or "maharashtra" in msg


def test_how_can_i_visit_ellora_caves():
    res = client.post("/api/ai/chat", json={
        "message": "how can I visit Ellora Caves?",
        "context": {"view": "/"}
    })
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()

    assert "can't help with politics" not in msg
    assert "ellora" in msg or "kailasa" in msg or "aurangabad" in msg or "chhatrapati sambhajinagar" in msg or "maharashtra" in msg


# ── 3. OUT-OF-DOMAIN REFUSALS ────────────────────────────────────────────────

def test_out_of_domain_politics():
    res = client.post("/api/ai/chat", json={"message": "who won the election?", "context": {"view": "/"}})
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()
    assert any(k in msg for k in ["can't help", "focused on india's cultural heritage", "political", "politics"])


def test_out_of_domain_sports():
    res = client.post("/api/ai/chat", json={"message": "who won today's cricket match?", "context": {"view": "/"}})
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()
    assert any(k in msg for k in ["can't help", "focused on india's cultural heritage", "sports"])


def test_out_of_domain_react():
    res = client.post("/api/ai/chat", json={"message": "how does React work?", "context": {"view": "/"}})
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()
    assert any(k in msg for k in ["can't help", "focused on india's cultural heritage", "coding", "technical", "topics"])


def test_out_of_domain_python():
    res = client.post("/api/ai/chat", json={"message": "write Python code", "context": {"view": "/"}})
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()
    assert any(k in msg for k in ["can't help", "focused on india's cultural heritage", "coding", "technical", "topics"])


def test_out_of_domain_weather():
    res = client.post("/api/ai/chat", json={"message": "what is today's weather?", "context": {"view": "/"}})
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()
    assert any(k in msg for k in ["can't help", "focused on india's cultural heritage", "topics"])


def test_out_of_domain_stocks():
    res = client.post("/api/ai/chat", json={"message": "stock market prediction", "context": {"view": "/"}})
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()
    assert any(k in msg for k in ["can't help", "focused on india's cultural heritage", "topics"])


# ── 4. CONTEXT CONTAMINATION TESTS ───────────────────────────────────────────

def test_context_contamination_mh_ui_with_idli():
    """UI = Maharashtra, query = 'idli origin' -> Idli only, no MH contamination."""
    res = client.post("/api/ai/chat", json={
        "message": "idli origin",
        "context": {
            "state_id": "mh",
            "category": "food",
            "view": "/state/maharashtra"
        }
    })
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()

    assert "idli" in msg
    assert "in the context of" not in msg
    assert "maharashtra has a deeply layered history" not in msg
    assert "vada pav" not in msg
    assert "gateway of india" not in msg
    assert any("idli" in s.lower() for s in data["suggestions"])


def test_context_contamination_assam_ui_with_vada_pav():
    """UI = Assam, query = 'vada pav origin' -> Vada Pav only, no Assam contamination."""
    res = client.post("/api/ai/chat", json={
        "message": "vada pav origin",
        "context": {
            "state_id": "as",
            "view": "/state/assam"
        }
    })
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()

    assert "vada pav" in msg or "mumbai" in msg
    assert "in the context of" not in msg
    assert "ahom" not in msg
    assert "brahmaputra" not in msg


def test_context_contamination_kerala_ui_with_raigad():
    """UI = Kerala, query = 'Raigad Fort' -> Raigad only, no Kerala contamination."""
    res = client.post("/api/ai/chat", json={
        "message": "tell me about Raigad Fort",
        "context": {
            "state_id": "kl",
            "view": "/state/kerala"
        }
    })
    assert res.status_code == 200
    data = res.json()["data"]
    msg = data["message"].lower()

    assert "raigad" in msg or "shivaji" in msg
    assert "in the context of" not in msg
    assert "kathakali" not in msg
    assert "backwaters" not in msg


# ── 5. MULTI-TURN TOPIC SWITCHING ────────────────────────────────────────────

def test_multi_turn_topic_lock_and_switching():
    # Turn 1: Maharashtra
    res1 = client.post("/api/ai/chat", json={
        "message": "Tell me about Maharashtra",
        "context": {"view": "/"}
    })
    assert res1.status_code == 200
    conv_id = res1.json()["data"]["conversation_id"]

    # Turn 2: Idli origin
    res2 = client.post("/api/ai/chat", json={
        "message": "idli origin",
        "conversation_id": conv_id,
        "context": {"view": "/"}
    })
    assert res2.status_code == 200
    data2 = res2.json()["data"]
    msg2 = data2["message"].lower()

    assert "idli" in msg2
    assert "in the context of" not in msg2
    assert "gateway of india" not in msg2
