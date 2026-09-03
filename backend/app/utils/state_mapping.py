"""
State ID Mapping Utility.

Centralized bidirectional mapping between 2-letter authoritative backend state IDs
('mh', 'rj', 'gj', 'kl', 'as', 'tn', etc.) and Supabase database slugs
('maharashtra', 'rajasthan', 'gujarat', 'kerala', 'assam', 'tamil-nadu', etc.).
"""
from typing import Optional


BACKEND_TO_DB_MAP: dict[str, str] = {
    "mh": "maharashtra",
    "rj": "rajasthan",
    "gj": "gujarat",
    "kl": "kerala",
    "as": "assam",
    "tn": "tamil-nadu",
    "wb": "west-bengal",
    "ml": "meghalaya",
    "up": "uttar-pradesh",
    "ka": "karnataka",
    "pb": "punjab",
    "od": "odisha",
    "mp": "madhya-pradesh",
    "tg": "telangana",
    "ap": "andhra-pradesh",
    "ld": "lakshadweep",
    "an": "andaman-and-nicobar",
}

DB_TO_BACKEND_MAP: dict[str, str] = {v: k for k, v in BACKEND_TO_DB_MAP.items()}

# State Code (e.g. IN-MH, MH) to Backend ID
CODE_TO_BACKEND_MAP: dict[str, str] = {
    "IN-MH": "mh",
    "IN-RJ": "rj",
    "IN-GJ": "gj",
    "IN-KL": "kl",
    "IN-AS": "as",
    "IN-TN": "tn",
    "IN-WB": "wb",
    "IN-ML": "ml",
    "IN-UP": "up",
    "IN-KA": "ka",
    "IN-PB": "pb",
    "IN-OD": "od",
    "IN-MP": "mp",
    "IN-TG": "tg",
    "IN-AP": "ap",
    "IN-LD": "ld",
    "IN-AN": "an",
    "MH": "mh",
    "RJ": "rj",
    "GJ": "gj",
    "KL": "kl",
    "AS": "as",
    "TN": "tn",
    "WB": "wb",
    "ML": "ml",
    "UP": "up",
    "KA": "ka",
    "PB": "pb",
    "OD": "od",
    "MP": "mp",
    "TG": "tg",
    "AP": "ap",
    "LD": "ld",
    "AN": "an",
}


def to_db_state_id(backend_state_id: Optional[str]) -> Optional[str]:
    """
    Translate a backend 2-letter state ID (e.g. 'mh') into a database slug (e.g. 'maharashtra').
    If already a known DB slug, returns it as is.
    """
    if not backend_state_id:
        return None
    normalized = backend_state_id.strip().lower()
    if normalized in BACKEND_TO_DB_MAP:
        return BACKEND_TO_DB_MAP[normalized]
    if normalized in DB_TO_BACKEND_MAP:
        return normalized
    return normalized


def to_backend_state_id(db_state_id: Optional[str], code: Optional[str] = None) -> str:
    """
    Translate a database slug (e.g. 'maharashtra') or code ('IN-MH') into a backend 2-letter ID ('mh').
    """
    if not db_state_id and not code:
        return ""
    if db_state_id:
        normalized = db_state_id.strip().lower()
        if normalized in DB_TO_BACKEND_MAP:
            return DB_TO_BACKEND_MAP[normalized]
        if normalized in BACKEND_TO_DB_MAP:
            return normalized
    if code:
        code_upper = code.strip().upper()
        if code_upper in CODE_TO_BACKEND_MAP:
            return CODE_TO_BACKEND_MAP[code_upper]
    return (db_state_id or "").strip().lower()


def is_valid_backend_state_id(state_id: str) -> bool:
    """Check if the provided state ID is a recognized backend state ID."""
    if not state_id:
        return False
    return state_id.strip().lower() in BACKEND_TO_DB_MAP
