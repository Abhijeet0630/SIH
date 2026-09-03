import httpx
import json

def test_live():
    # 1. Idli Origin on Maharashtra view
    r1 = httpx.post(
        "http://127.0.0.1:5173/api/ai/chat",
        json={
            "message": "idli origin",
            "context": {
                "state_id": "mh",
                "view": "/state/maharashtra"
            }
        },
        timeout=10.0
    ).json()
    print("=== 1. IDLI ORIGIN (Context: Maharashtra) ===")
    print("Message:\n", r1["data"]["message"])
    print("Suggestions:\n", r1["data"]["suggestions"])

    # 2. Heritage travel: Raigad Fort from Alandi
    r2 = httpx.post(
        "http://127.0.0.1:5173/api/ai/chat",
        json={
            "message": "how to go to Raigad Fort from Alandi",
            "context": {"view": "/"}
        },
        timeout=10.0
    ).json()
    print("\n=== 2. RAIGAD FORT FROM ALANDI (Heritage Travel) ===")
    print("Message:\n", r2["data"]["message"])
    print("Suggestions:\n", r2["data"]["suggestions"])

    # 3. Politics refusal
    r3 = httpx.post(
        "http://127.0.0.1:5173/api/ai/chat",
        json={
            "message": "who won the election?",
            "context": {"view": "/"}
        },
        timeout=10.0
    ).json()
    print("\n=== 3. WHO WON THE ELECTION (Out of Domain - Politics) ===")
    print("Message:\n", r3["data"]["message"])

    # 4. Sports refusal
    r4 = httpx.post(
        "http://127.0.0.1:5173/api/ai/chat",
        json={
            "message": "who won today's cricket match?",
            "context": {"view": "/"}
        },
        timeout=10.0
    ).json()
    print("\n=== 4. CRICKET MATCH (Out of Domain - Sports) ===")
    print("Message:\n", r4["data"]["message"])

if __name__ == "__main__":
    test_live()
