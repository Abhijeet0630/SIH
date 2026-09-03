"""
Mock cultural connection graph data.
Each entry maps a culture_id to its star-schema connections.
"""

MOCK_CONNECTIONS: dict[str, list[dict]] = {
    "vada-pav": [
        {"id": "mh", "name": "Maharashtra", "type": "state", "relationship": "origin"},
        {"id": "mumbai", "name": "Mumbai", "type": "city", "relationship": "associated_with"},
        {"id": "misal-pav", "name": "Misal Pav", "type": "food", "relationship": "related_food"},
        {"id": "gateway-of-india", "name": "Gateway of India", "type": "monument", "relationship": "iconic_in_same_city"},
        {"id": "lavani", "name": "Lavani", "type": "dance", "relationship": "shares_state"},
        {"id": "ganesh-chaturthi", "name": "Ganesh Chaturthi", "type": "festival", "relationship": "popular_during"},
    ],
    "misal-pav": [
        {"id": "mh", "name": "Maharashtra", "type": "state", "relationship": "origin"},
        {"id": "pune", "name": "Pune", "type": "city", "relationship": "associated_with"},
        {"id": "vada-pav", "name": "Vada Pav", "type": "food", "relationship": "related_food"},
        {"id": "puran-poli", "name": "Puran Poli", "type": "food", "relationship": "related_food"},
    ],
    "puran-poli": [
        {"id": "mh", "name": "Maharashtra", "type": "state", "relationship": "origin"},
        {"id": "gudi-padwa", "name": "Gudi Padwa", "type": "festival", "relationship": "prepared_during"},
        {"id": "diwali-mh", "name": "Diwali", "type": "festival", "relationship": "prepared_during"},
        {"id": "ganesh-chaturthi", "name": "Ganesh Chaturthi", "type": "festival", "relationship": "prepared_during"},
        {"id": "misal-pav", "name": "Misal Pav", "type": "food", "relationship": "related_food"},
    ],
    "modak": [
        {"id": "mh", "name": "Maharashtra", "type": "state", "relationship": "origin"},
        {"id": "ganesh-chaturthi", "name": "Ganesh Chaturthi", "type": "festival", "relationship": "sacred_to"},
        {"id": "puran-poli", "name": "Puran Poli", "type": "food", "relationship": "related_food"},
    ],
    "lavani": [
        {"id": "mh", "name": "Maharashtra", "type": "state", "relationship": "origin"},
        {"id": "pune", "name": "Pune", "type": "city", "relationship": "associated_with"},
        {"id": "raigad-fort", "name": "Raigad Fort", "type": "monument", "relationship": "historically_connected"},
        {"id": "ganesh-chaturthi", "name": "Ganesh Chaturthi", "type": "festival", "relationship": "performed_during"},
        {"id": "vada-pav", "name": "Vada Pav", "type": "food", "relationship": "shares_state"},
    ],
    "gateway-of-india": [
        {"id": "mh", "name": "Maharashtra", "type": "state", "relationship": "origin"},
        {"id": "mumbai", "name": "Mumbai", "type": "city", "relationship": "located_in"},
        {"id": "vada-pav", "name": "Vada Pav", "type": "food", "relationship": "iconic_in_same_city"},
        {"id": "elephanta-caves", "name": "Elephanta Caves", "type": "monument", "relationship": "associated_with"},
        {"id": "raigad-fort", "name": "Raigad Fort", "type": "monument", "relationship": "in_same_state"},
    ],
    "raigad-fort": [
        {"id": "mh", "name": "Maharashtra", "type": "state", "relationship": "origin"},
        {"id": "shivaji-maharaj", "name": "Chhatrapati Shivaji Maharaj", "type": "person", "relationship": "built_by"},
        {"id": "lavani", "name": "Lavani", "type": "dance", "relationship": "shares_state"},
        {"id": "gateway-of-india", "name": "Gateway of India", "type": "monument", "relationship": "in_same_state"},
        {"id": "ellora-caves", "name": "Ellora Caves", "type": "monument", "relationship": "in_same_state"},
    ],
}
