import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.fallback_engine import LocalFallbackEngine

@pytest.fixture
def gemini_provider():
    return LocalFallbackEngine()

def count_words(text: str) -> int:
    return len(text.strip().split())

# Test 1: Simple factual question produces concise answer
def test_1_simple_factual_question_concise(gemini_provider):
    res = gemini_provider.get_fallback_response("Who built Raigad Fort?", "c_p28_1", "")
    msg = res["message"]
    words = count_words(msg)
    assert words <= 120
    assert "Shivaji Maharaj" in msg or "Hiroji" in msg

# Test 2: Origin question produces concise answer
def test_2_origin_question_concise(gemini_provider):
    res = gemini_provider.get_fallback_response("Idli origin", "c_p28_2", "")
    msg = res["message"]
    words = count_words(msg)
    assert words <= 120
    assert "South Indian" in msg or "Karnataka" in msg or "India" in msg

# Test 3: Location question produces concise answer
def test_3_location_question_concise(gemini_provider):
    res = gemini_provider.get_fallback_response("Where is Raigad Fort?", "c_p28_3", "")
    msg = res["message"]
    words = count_words(msg)
    assert words <= 120
    assert "Mahad" in msg or "Maharashtra" in msg

# Test 4: History question remains concise
def test_4_history_question_concise(gemini_provider):
    res = gemini_provider.get_fallback_response("Tell me about the history of Raigad Fort", "c_p28_4", "")
    msg = res["message"]
    words = count_words(msg)
    assert words <= 150

# Test 5: How-to question remains focused
def test_5_howto_question_focused(gemini_provider):
    res = gemini_provider.get_fallback_response("How are Living Root Bridges grown?", "c_p28_5", "")
    msg = res["message"]
    words = count_words(msg)
    assert words <= 120
    assert "roots" in msg or "Ficus elastica" in msg

# Test 6: Long answer is not generated for simple questions (rarely > 180 words)
def test_6_no_long_essay_for_simple_question(gemini_provider):
    res = gemini_provider.get_fallback_response("Where is Vada Pav famous?", "c_p28_6", "")
    msg = res["message"]
    words = count_words(msg)
    assert words < 180

# Test 7: Follow-up questions remain concise
def test_7_followup_question_concise(gemini_provider):
    history = [
        {"role": "user", "content": "Tell me about Raigad Fort"},
        {"role": "assistant", "content": "Raigad Fort was the capital of Maratha Empire."}
    ]
    res = gemini_provider.get_fallback_response("Where is it?", "c_p28_7", "", history)
    msg = res["message"]
    words = count_words(msg)
    assert words <= 120
    assert "Mahad" in msg or "Maharashtra" in msg

# Test 8: Conversation context still works
def test_8_conversation_context_works():
    with TestClient(app) as client:
        t1 = client.post("/api/ai/chat", json={"message": "Tell me about Raigad Fort"})
        cid = t1.json()["data"]["conversation_id"]
        t2 = client.post("/api/ai/chat", json={"message": "Where is it?", "conversation_id": cid})
        assert t2.status_code == 200
        assert "Mahad" in t2.json()["data"]["message"] or "Maharashtra" in t2.json()["data"]["message"]

# Test 9: Topic switching still works
def test_9_topic_switching_works():
    with TestClient(app) as client:
        t1 = client.post("/api/ai/chat", json={"message": "Tell me about Raigad Fort"})
        cid = t1.json()["data"]["conversation_id"]
        t2 = client.post("/api/ai/chat", json={"message": "Where is Vada Pav famous?", "conversation_id": cid})
        assert t2.status_code == 200
        assert "Mumbai" in t2.json()["data"]["message"] or "Maharashtra" in t2.json()["data"]["message"]
        assert "Raigad Fort is located in Mahad" not in t2.json()["data"]["message"]

# Test 10: Detailed responses allowed when explicitly requested
def test_10_detailed_response_when_explicitly_requested(gemini_provider):
    res = gemini_provider.get_fallback_response("Give me a detailed history of Raigad Fort", "c_p28_10", "")
    assert res is not None
    assert "message" in res

# Test 11: Suggested questions are not inserted into the main message
def test_11_suggested_questions_not_in_message_body(gemini_provider):
    res = gemini_provider.get_fallback_response("Who built Raigad Fort?", "c_p28_11", "")
    msg = res["message"]
    assert "Suggested Questions" not in msg
    assert "Would you like to know" not in msg
    assert isinstance(res["suggestions"], list)

# Test 12: Active page context does not override current question
def test_12_active_page_context_does_not_override_current_question(gemini_provider):
    page_context = "Active Page Route: /item/raigad-fort\nActive Heritage Item: Raigad Fort"
    res = gemini_provider.get_fallback_response("Where is Vada Pav famous?", "c_p28_12", page_context)
    msg = res["message"]
    assert "Mumbai" in msg or "Maharashtra" in msg
    assert "Mahad, Raigad District" not in msg
