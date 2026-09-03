"""
Discovery Service — handles the 'Surprise Me' feature.
Currently uses random selection from mock data.
Designed so this can later be replaced with AI-based personalised recommendations.
"""
import random
from app.repositories.culture_repository import CultureRepository
from app.repositories.state_repository import StateRepository
from app.repositories.monument_repository import MonumentRepository


class DiscoveryService:
    def __init__(self):
        self._culture_repo = CultureRepository()
        self._state_repo = StateRepository()
        self._monument_repo = MonumentRepository()

    def get_surprise(self) -> dict:
        """
        Return a random cultural item for the 'Surprise Me' experience.
        Design note: Replace the random selection logic here with an AI/personalised
        recommendation engine without changing the API contract.
        """
        all_items = self._culture_repo.get_all()
        if not all_items:
            return {}

        item = random.choice(all_items)
        state = self._state_repo.get_by_id(item["state_id"])

        return {
            "state": {
                "id": state["id"],
                "name": state["name"],
            } if state else None,
            "category": item["type"],
            "cultural_item": {
                "id": item["id"],
                "name": item["name"],
                "type": item["type"],
                "short_description": item["short_description"],
                "image_url": item.get("image_url"),
            },
        }
