import requests
import json

base_url = 'http://127.0.0.1:8001/api/ai/chat'
queries = [
    ('history', 'Tell me about the history of Raigad Fort'),
    ('location', 'Where is Raigad Fort located?'),
    ('gates', 'How many gates are there on Raigad Fort?'),
    ('hirakani', 'What is special about Hirakani Buruj?'),
    ('coronation', 'Who was crowned at Raigad Fort?'),
    ('forts', 'What are the famous forts of Maharashtra?')
]

print("=== 1. INDEPENDENT QUERY DIFFERENTIATION RESULTS ===")
for tag, q in queries:
    resp = requests.post(base_url, json={'message': q})
    data = resp.json().get('data', {})
    msg = data.get('message', '')
    first_line = msg.split('\n')[0]
    print(f"[{tag.upper()}] Query: '{q}'")
    print(f"  First Line: {first_line}")
    print(f"  Suggestions: {data.get('suggestions', [])[:2]}")

print("\n=== 2. MULTI-TURN PRONOUN RESOLUTION SESSION ===")
t1_resp = requests.post(base_url, json={'message': 'Tell me about Raigad Fort'})
conv_id = t1_resp.json()['data']['conversation_id']
print(f"Turn 1 ConvID: {conv_id} | First Line: {t1_resp.json()['data']['message'].splitlines()[0]}")

t2_resp = requests.post(base_url, json={'message': 'Where is it?', 'conversation_id': conv_id})
print(f"Turn 2 ('Where is it?') | First Line: {t2_resp.json()['data']['message'].splitlines()[0]}")

t3_resp = requests.post(base_url, json={'message': 'How many gates does it have?', 'conversation_id': conv_id})
print(f"Turn 3 ('How many gates does it have?') | First Line: {t3_resp.json()['data']['message'].splitlines()[0]}")

t4_resp = requests.post(base_url, json={'message': 'Why is it historically important?', 'conversation_id': conv_id})
print(f"Turn 4 ('Why is it historically important?') | First Line: {t4_resp.json()['data']['message'].splitlines()[0]}")
