"""
Category Service — business logic for cultural categories.
"""
from app.repositories.category_repository import CategoryRepository
from app.repositories.state_repository import StateRepository
from app.schemas.category import Category
from app.core.exceptions import NotFoundException


class CategoryService:
    def __init__(self):
        self._category_repo = CategoryRepository()
        self._state_repo = StateRepository()

    def get_all_categories(self) -> list[Category]:
        raw_categories = self._category_repo.get_all()
        return [Category(**cat) for cat in raw_categories]

    def get_categories_for_state(self, state_id: str) -> list[Category]:
        if not self._state_repo.exists(state_id):
            raise NotFoundException("State", state_id)
        all_categories = self._category_repo.get_all()
        category_map = {cat["id"]: cat for cat in all_categories}
        state_category_ids = self._category_repo.get_category_ids_for_state(state_id)
        return [Category(**category_map[cid]) for cid in state_category_ids if cid in category_map]
