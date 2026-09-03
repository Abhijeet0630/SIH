import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_1_raigad_intent_differentiation():
    """Verifies that different Raigad Fort queries produce distinct, non-identical responses."""
    # 1. History
    res_history = client.post("/api/ai/chat", json={"message": "Tell me about the history of Raigad Fort"}).json()["data"]["message"]
    # 2. Location
    res_location = client.post("/api/ai/chat", json={"message": "Where is Raigad Fort located?"}).json()["data"]["message"]
    # 3. Gates
    res_gates = client.post("/api/ai/chat", json={"message": "How many gates are there on Raigad Fort?"}).json()["data"]["message"]
    # 4. Builder
    res_builder = client.post("/api/ai/chat", json={"message": "Who built Raigad Fort?"}).json()["data"]["message"]
    # 5. Hirakani Buruj
    res_hirakani = client.post("/api/ai/chat", json={"message": "What is special about Hirakani Buruj?"}).json()["data"]["message"]
    # 6. Coronation
    res_coronation = client.post("/api/ai/chat", json={"message": "Who was crowned at Raigad Fort?"}).json()["data"]["message"]

    # Semantic non-identity assertions
    assert res_history != res_location
    assert res_location != res_gates
    assert res_gates != res_builder
    assert res_builder != res_hirakani
    assert res_hirakani != res_coronation

    # Intent-specific content assertions
    assert "1656" in res_history or "capital" in res_history.lower()
    assert "Mahad" in res_location or "Raigad" in res_location or "Maharashtra" in res_location or "Sahyadri" in res_location
    assert "Maha Darwaja" in res_gates or "Palkhi Darwaja" in res_gates
    assert "Hiroji" in res_builder or "Shivaji" in res_builder or "built" in res_builder.lower()
    assert "milkmaid" in res_hirakani or "mother" in res_hirakani.lower()
    assert "June 6, 1674" in res_coronation or "Gaga Bhatt" in res_coronation

def test_2_multi_turn_pronoun_resolution():
    """Verifies multi-turn session resolves pronouns like 'Where is it?' and 'How many gates does it have?'."""
    # Turn 1: Initial query
    t1 = client.post("/api/ai/chat", json={"message": "Tell me about Raigad Fort"})
    conv_id = t1.json()["data"]["conversation_id"]

    # Turn 2: Pronoun query 1 ("Where is it?")
    t2 = client.post("/api/ai/chat", json={
        "message": "Where is it?",
        "conversation_id": conv_id
    })
    msg2 = t2.json()["data"]["message"]
    assert "Mahad" in msg2 or "Sahyadri" in msg2

    # Turn 3: Pronoun query 2 ("How many gates does it have?")
    t3 = client.post("/api/ai/chat", json={
        "message": "How many gates does it have?",
        "conversation_id": conv_id
    })
    msg3 = t3.json()["data"]["message"]
    assert "Maha Darwaja" in msg3 or "Wagh Darwaja" in msg3

    # Turn 4: Pronoun query 3 ("Who built it?")
    t4 = client.post("/api/ai/chat", json={
        "message": "Who built it?",
        "conversation_id": conv_id
    })
    msg4 = t4.json()["data"]["message"]
    assert "Hiroji Indulkar" in msg4 or "Shivaji Maharaj" in msg4

    # Assert responses across turns are distinct
    assert msg2 != msg3
    assert msg3 != msg4

def test_3_maharashtra_forts_and_vada_pav_differentiation():
    """Verifies intent differentiation for Maharashtra forts and Vada Pav recipe queries."""
    res_forts = client.post("/api/ai/chat", json={"message": "What are the famous forts of Maharashtra?"}).json()["data"]["message"]
    res_recipe = client.post("/api/ai/chat", json={"message": "How is Vada Pav prepared?"}).json()["data"]["message"]
    res_origin = client.post("/api/ai/chat", json={"message": "Where did Vada Pav originate?"}).json()["data"]["message"]

    assert "Sinhagad" in res_forts or "Murud-Janjira" in res_forts
    assert "Potato Filling" in res_recipe or "Besan Batter" in res_recipe
    assert "Dadar" in res_origin or "Ashok Vaidya" in res_origin

    assert res_recipe != res_origin

def test_4_question_specific_suggestions():
    """Verifies follow-up suggestions match the specific intent of the query."""
    sug_gates = client.post("/api/ai/chat", json={"message": "How many gates are there on Raigad Fort?"}).json()["data"]["suggestions"]
    sug_builder = client.post("/api/ai/chat", json={"message": "Who built Raigad Fort?"}).json()["data"]["suggestions"]

    assert sug_gates != sug_builder
    assert any("Maha Darwaja" in s or "gates" in s.lower() for s in sug_gates)
    assert any("Hiroji" in s or "architect" in s.lower() for s in sug_builder)

def test_5_frozen_api_contract_preservation():
    """Verifies API response envelope remains 100% compliant with frozen contract."""
    res = client.post("/api/ai/chat", json={"message": "Tell me about Raigad Fort gates"})
    assert res.status_code == 200
    data = res.json()
    assert data["success"] is True
    assert "message" in data["data"]
    assert "conversation_id" in data["data"]
    assert "avatar_state" in data["data"]
    assert isinstance(data["data"]["suggestions"], list)
