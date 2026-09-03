"""
Cultural Passport routes.
GET  /api/passport
POST /api/passport/discover
"""
from fastapi import APIRouter
from app.services.passport_service import PassportService
from app.schemas.passport import DiscoverRequest
from app.schemas.common import success

router = APIRouter(prefix="/passport", tags=["Cultural Passport"])
_service = PassportService()


@router.get(
    "",
    summary="Get Cultural Passport",
    description=(
        "Returns the user's Cultural Passport — a record of all states, foods, monuments, "
        "and art forms they have discovered, along with aggregate statistics."
    ),
)
def get_passport():
    passport = _service.get_passport()
    return success(passport.model_dump())


@router.post(
    "/discover",
    summary="Record a Discovery",
    description=(
        "Record that the user has discovered a cultural item. "
        "This updates their Cultural Passport stats. "
        "Request body: {\"item_type\": \"food\", \"item_id\": \"vada-pav\"}"
    ),
)
def record_discovery(request: DiscoverRequest):
    passport = _service.record_discovery(request)
    return success(passport.model_dump())
