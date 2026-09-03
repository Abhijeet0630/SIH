import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.fallback_engine import LocalFallbackEngine

@pytest.fixture
def fallback_engine():
    return LocalFallbackEngine()

# Test 1: Previous topic Raigad Fort -> Current: "Where is Vada Pav famous?" -> Vada Pav response
def test_1_previous_raigad_current_vada_pav(fallback_engine):
    history = [
        {"role": "user", "content": "Tell me about Raigad Fort"},
        {"role": "assistant", "content": "Raigad Fort is a hill fort in Mahad."}
    ]
    res = fallback_engine.get_fallback_response("Where is Vada Pav famous?", "conv_t1", "", history)
    assert "Vada Pav" in res["message"]
    assert "Mumbai" in res["message"] or "Maharashtra" in res["message"]
    assert "Raigad Fort" not in res["message"]

# Test 2: Previous topic Raigad Fort -> Current: "How are Living Root Bridges grown?" -> Living Root Bridges response
def test_2_previous_raigad_current_root_bridges(fallback_engine):
    history = [
        {"role": "user", "content": "Tell me about Raigad Fort"},
        {"role": "assistant", "content": "Raigad Fort is a hill fort in Mahad."}
    ]
    res = fallback_engine.get_fallback_response("How are Living Root Bridges grown?", "conv_t2", "", history)
    assert "Living Root Bridges" in res["message"] or "Jingkieng Jri" in res["message"]
    assert "Ficus elastica" in res["message"] or "roots" in res["message"]
    assert "Raigad Fort" not in res["message"]

# Test 3: Previous topic Vada Pav -> Current: "Tell me about Raigad Fort." -> Raigad Fort response
def test_3_previous_vada_pav_current_raigad(fallback_engine):
    history = [
        {"role": "user", "content": "How is Vada Pav prepared?"},
        {"role": "assistant", "content": "Vada Pav is made with spiced potato filling."}
    ]
    res = fallback_engine.get_fallback_response("Tell me about Raigad Fort.", "conv_t3", "", history)
    assert "Raigad Fort" in res["message"]
    assert "Maratha Empire" in res["message"] or "Rairi" in res["message"]

# Test 4: Raigad Fort context -> "Where is it?" -> Raigad Fort location
def test_4_raigad_pronoun_where_is_it(fallback_engine):
    history = [
        {"role": "user", "content": "Tell me about Raigad Fort"},
        {"role": "assistant", "content": "Raigad Fort is a capital fort."}
    ]
    res = fallback_engine.get_fallback_response("Where is it?", "conv_t4", "", history)
    assert "Raigad Fort" in res["message"]
    assert "Mahad" in res["message"] or "Location" in res["message"]

# Test 5: Raigad Fort context -> "How many gates does it have?" -> Raigad Fort gates
def test_5_raigad_pronoun_gates(fallback_engine):
    history = [
        {"role": "user", "content": "Tell me about Raigad Fort"},
        {"role": "assistant", "content": "Raigad Fort is a capital fort."}
    ]
    res = fallback_engine.get_fallback_response("How many gates does it have?", "conv_t5", "", history)
    assert "Gates" in res["message"] or "Maha Darwaja" in res["message"] or "gates" in res["message"]

# Test 6: Raigad Fort context -> "Who built it?" -> Raigad Fort builder
def test_6_raigad_pronoun_builder(fallback_engine):
    history = [
        {"role": "user", "content": "Tell me about Raigad Fort"},
        {"role": "assistant", "content": "Raigad Fort is a capital fort."}
    ]
    res = fallback_engine.get_fallback_response("Who built it?", "conv_t6", "", history)
    assert "Shivaji Maharaj" in res["message"] or "Hiroji" in res["message"]

# Test 7: Root bridges context -> "Where are they found?" -> Root bridges location
def test_7_root_bridges_pronoun_where(fallback_engine):
    history = [
        {"role": "user", "content": "Tell me about Living Root Bridges"},
        {"role": "assistant", "content": "Root bridges are bio-engineering marvels."}
    ]
    res = fallback_engine.get_fallback_response("Where are they found?", "conv_t7", "", history)
    assert "Meghalaya" in res["message"] or "Khasi" in res["message"]

# Test 8: Root bridges context -> "How are they grown?" -> Root bridges process
def test_8_root_bridges_pronoun_grown(fallback_engine):
    history = [
        {"role": "user", "content": "Tell me about Living Root Bridges"},
        {"role": "assistant", "content": "Root bridges are bio-engineering marvels."}
    ]
    res = fallback_engine.get_fallback_response("How are they grown?", "conv_t8", "", history)
    assert "Ficus elastica" in res["message"] or "roots" in res["message"] or "grow" in res["message"]

# Test 9: Multi-topic sequence without stale context leakage
def test_9_multi_topic_switch_sequence(fallback_engine):
    h = []
    # Turn 1: Raigad
    r1 = fallback_engine.get_fallback_response("Tell me about Raigad Fort", "c_seq", "", h)
    assert "Raigad" in r1["message"]
    h.append({"role": "user", "content": "Tell me about Raigad Fort"})
    h.append({"role": "assistant", "content": r1["message"]})

    # Turn 2: Vada Pav
    r2 = fallback_engine.get_fallback_response("Where is Vada Pav famous?", "c_seq", "", h)
    assert "Vada Pav" in r2["message"]
    assert "Raigad Fort is located in Mahad" not in r2["message"]
    h.append({"role": "user", "content": "Where is Vada Pav famous?"})
    h.append({"role": "assistant", "content": r2["message"]})

    # Turn 3: Living Root Bridges
    r3 = fallback_engine.get_fallback_response("How are Living Root Bridges grown?", "c_seq", "", h)
    assert "Root Bridges" in r3["message"] or "Jingkieng Jri" in r3["message"]
    assert "Raigad Fort is located in Mahad" not in r3["message"]
    h.append({"role": "user", "content": "How are Living Root Bridges grown?"})
    h.append({"role": "assistant", "content": r3["message"]})

    # Turn 4: Maharashtra Forts
    r4 = fallback_engine.get_fallback_response("Tell me about Maharashtra forts", "c_seq", "", h)
    assert "Maharashtra" in r4["message"] and "forts" in r4["message"].lower()

# Test 10: Stale active page context cannot override explicit topic
def test_10_stale_raigad_context_cannot_override_explicit_vadapav(fallback_engine):
    context_str = "Active Page Route: /item/raigad-fort\nActive Heritage Item: Raigad Fort"
    history = [
        {"role": "user", "content": "Tell me about Raigad Fort"},
        {"role": "assistant", "content": "Raigad Fort is in Mahad."}
    ]
    res = fallback_engine.get_fallback_response("Where is the vadapav famous", "c_vada", context_str, history)
    assert "Vada Pav" in res["message"]
    assert "Mumbai" in res["message"] or "Maharashtra" in res["message"]
    assert "Mahad, Raigad District" not in res["message"]

# Test 11: Stale active page context cannot override explicit root bridges
def test_11_stale_raigad_context_cannot_override_explicit_root_bridges(fallback_engine):
    context_str = "Active Page Route: /item/raigad-fort\nActive Heritage Item: Raigad Fort"
    history = [
        {"role": "user", "content": "Tell me about Raigad Fort"},
        {"role": "assistant", "content": "Raigad Fort is in Mahad."}
    ]
    res = fallback_engine.get_fallback_response("Where are living root bridges found?", "c_rb", context_str, history)
    assert "Meghalaya" in res["message"] or "Khasi" in res["message"]
    assert "Mahad, Raigad District" not in res["message"]

# Test 12: Conversation history remains intact across topic changes
def test_12_conversation_history_remains_intact_on_topic_change():
    with TestClient(app) as client:
        # Turn 1
        t1 = client.post("/api/ai/chat", json={"message": "Tell me about Raigad Fort"})
        assert t1.status_code == 200
        cid = t1.json()["data"]["conversation_id"]

        # Turn 2: Topic Switch to Vada Pav
        t2 = client.post("/api/ai/chat", json={"message": "Where is Vada Pav famous?", "conversation_id": cid})
        assert t2.status_code == 200
        assert t2.json()["data"]["conversation_id"] == cid
        assert "Vada Pav" in t2.json()["data"]["message"]

        # Turn 3: Follow-up on Vada Pav using pronoun
        t3 = client.post("/api/ai/chat", json={"message": "How is it prepared?", "conversation_id": cid})
        assert t3.status_code == 200
        assert t3.json()["data"]["conversation_id"] == cid
        assert "potato" in t3.json()["data"]["message"].lower() or "vada" in t3.json()["data"]["message"].lower()
