"""
Bharat AI Context Engine Service.

Processes and enriches UI context metadata (state_id, category, item_id, view)
to ground AI responses in the user's active exploration context.
Follows the strict priority:
USER QUERY > EXPLICIT ENTITY > CONVERSATION CONTEXT > UI PAGE CONTEXT
"""

from typing import Optional, Dict, Any, List
from app.schemas.chat import ChatContext
from app.services.cultural_data_service import backend_cultural_client

STATE_NAME_MAP = {
    "mh": "Maharashtra",
    "maharashtra": "Maharashtra",
    "rj": "Rajasthan",
    "rajasthan": "Rajasthan",
    "gj": "Gujarat",
    "gujarat": "Gujarat",
    "kl": "Kerala",
    "kerala": "Kerala",
    "as": "Assam",
    "assam": "Assam",
    "tn": "Tamil Nadu",
    "tamil-nadu": "Tamil Nadu",
    "tamil nadu": "Tamil Nadu",
    "ml": "Meghalaya",
    "meghalaya": "Meghalaya",
    "ka": "Karnataka",
    "karnataka": "Karnataka"
}

CATEGORY_NAME_MAP = {
    "food": "Regional Gastronomy & Cuisine",
    "monuments": "Monuments & 3D Fort Models",
    "forts": "Monuments & 3D Fort Models",
    "fashion": "Textiles & Costumes",
    "textiles": "Textiles & Costumes",
    "dance": "Performing Arts & Dance",
    "festivals": "Festivals & Celebrations",
    "crafts": "Handicrafts & Indigenous Art"
}

KNOWN_EXPLICIT_ENTITIES = {
    "idli": ("Idli", "food", "South India / Karnataka-Tamil heritage"),
    "dosa": ("Dosa", "food", "South India"),
    "sambar": ("Sambar", "food", "South India"),
    "vada pav": ("Vada Pav", "food", "Maharashtra"),
    "vadapav": ("Vada Pav", "food", "Maharashtra"),
    "wada pav": ("Vada Pav", "food", "Maharashtra"),
    "misal": ("Misal Pav", "food", "Maharashtra"),
    "puran poli": ("Puran Poli", "food", "Maharashtra"),
    "gateway of india": ("Gateway of India", "monument", "Maharashtra"),
    "gateway": ("Gateway of India", "monument", "Maharashtra"),
    "raigad": ("Raigad Fort", "monument", "Maharashtra"),
    "sinhagad": ("Sinhagad Fort", "monument", "Maharashtra"),
    "shaniwar wada": ("Shaniwar Wada", "monument", "Maharashtra"),
    "ellora": ("Ellora Caves / Kailasa Temple", "monument", "Maharashtra"),
    "kailasa": ("Kailasa Temple", "monument", "Maharashtra"),
    "gudi padwa": ("Gudi Padwa", "festival", "Maharashtra"),
    "bihu": ("Bihu", "festival", "Assam"),
    "onam": ("Onam", "festival", "Kerala"),
    "pushkar": ("Pushkar Fair", "festival", "Rajasthan"),
    "living root": ("Living Root Bridges", "crafts", "Meghalaya"),
    "root bridge": ("Living Root Bridges", "crafts", "Meghalaya"),
    "jingkieng": ("Living Root Bridges", "crafts", "Meghalaya"),
    "paithani": ("Paithani Saree", "fashion", "Maharashtra"),
    "muga": ("Muga Silk", "fashion", "Assam"),
    "assam silk": ("Assam Silk", "fashion", "Assam"),
    "warli": ("Warli Art", "crafts", "Maharashtra"),
    "lavani": ("Lavani Dance", "dance", "Maharashtra"),
    "kathakali": ("Kathakali", "dance", "Kerala"),
    "garba": ("Garba", "dance", "Gujarat"),
    "ghoomar": ("Ghoomar", "dance", "Rajasthan")
}

class ContextService:
    """Processes UI route context, normalizes entities, and formats LLM prompts."""

    def normalize_state(self, state_id: Optional[str]) -> Optional[str]:
        if not state_id or not state_id.strip():
            return None
        clean = state_id.strip().lower()
        return STATE_NAME_MAP.get(clean, state_id.strip())

    def normalize_category(self, category: Optional[str]) -> Optional[str]:
        if not category or not category.strip():
            return None
        clean = category.strip().lower()
        return CATEGORY_NAME_MAP.get(clean, category.strip().capitalize())

    def normalize_item(self, item_id: Optional[str]) -> Optional[str]:
        if not item_id or not item_id.strip():
            return None
        clean = item_id.strip().replace("_", "-")
        words = clean.split("-")
        return " ".join(w.capitalize() for w in words)

    def detect_explicit_entity(self, message: str) -> Optional[Dict[str, str]]:
        """Detects if user query contains an explicit cultural entity."""
        if not message:
            return None
        lower_q = message.lower().strip()
        for key, (name, cat, region) in KNOWN_EXPLICIT_ENTITIES.items():
            if key in lower_q:
                return {
                    "entity_name": name,
                    "category": cat,
                    "associated_region": region
                }
        return None

    def process_context(self, context: Optional[ChatContext]) -> Dict[str, Any]:
        """
        Parses and normalizes ChatContext object.
        Returns a structured dictionary of resolved context metadata.
        """
        if not context:
            return {
                "has_context": False,
                "state": None,
                "category": None,
                "item": None,
                "view": None,
                "raw_state_id": None
            }

        resolved_state = self.normalize_state(context.state_id)
        resolved_category = self.normalize_category(context.category)
        resolved_item = self.normalize_item(context.item_id)
        view_path = context.view or "/"

        has_any = bool(resolved_state or resolved_category or resolved_item or (view_path and view_path != "/"))

        return {
            "has_context": has_any,
            "state": resolved_state,
            "category": resolved_category,
            "item": resolved_item,
            "view": view_path,
            "raw_state_id": context.state_id
        }

    def fetch_backend_cultural_context(self, entity_type: str, entity_id: str) -> Optional[Dict[str, Any]]:
        """
        Retrieves authoritative entity metadata from Main Backend on demand.
        Types supported: 'state', 'cultural_item', 'monument', 'festival'.
        """
        if not entity_type or not entity_id:
            return None

        clean_type = entity_type.lower().strip()
        if clean_type == "state":
            return backend_cultural_client.fetch_state_details(entity_id)
        elif clean_type in ("cultural_item", "item", "food", "fashion"):
            return backend_cultural_client.fetch_item_details(entity_id)
        elif clean_type in ("monument", "fort"):
            return backend_cultural_client.fetch_monument_details(entity_id)
        elif clean_type == "festival":
            return backend_cultural_client.fetch_festival_details(entity_id)
        
        return None

    def format_context_prompt(self, context: Optional[ChatContext], message: str = "") -> str:
        """
        Builds a clean contextual injection prompt string for the LLM system prompt.
        Enforces: USER QUERY > EXPLICIT ENTITY > CONVERSATION CONTEXT > UI PAGE CONTEXT.
        """
        ctx_data = self.process_context(context)
        explicit_entity = self.detect_explicit_entity(message)

        if not ctx_data["has_context"] and not explicit_entity:
            return ""

        directives = []
        details = []

        # If user query contains an explicit entity:
        if explicit_entity:
            entity_name = explicit_entity["entity_name"]
            region = explicit_entity["associated_region"]
            details.append(f"Detected Query Entity: {entity_name} ({region})")
            directives.append(
                f"- The user is specifically asking about '{entity_name}'. "
                f"You MUST answer about '{entity_name}' directly and NOT substitute or force the active UI state or page route."
            )
            # Only mention UI state if it directly relates to the entity
            if ctx_data["state"] and ctx_data["state"].lower() not in region.lower():
                directives.append(
                    f"- The user's active page state is '{ctx_data['state']}', but '{entity_name}' is not specific to '{ctx_data['state']}'. "
                    f"Do NOT force '{ctx_data['state']}' into your answer or prepend 'In the context of {ctx_data['state']}:'."
                )
        else:
            # When NO explicit entity is in query, UI context may provide spatial context
            if ctx_data["view"] and ctx_data["view"] != "/":
                details.append(f"Active Page Route: {ctx_data['view']}")

            if ctx_data["state"]:
                details.append(f"Active State/Region: {ctx_data['state']}")
                directives.append(
                    f"- If the user uses spatial pronouns like 'here', 'this region', or 'local' without naming another state, "
                    f"they are referring to {ctx_data['state']}."
                )

            if ctx_data["category"]:
                details.append(f"Active Category: {ctx_data['category']}")

            if ctx_data["item"]:
                details.append(f"Active Heritage Item: {ctx_data['item']}")
                directives.append(
                    f"- If the user's question DOES NOT specify a new explicit topic and uses implicit pronouns like 'this', 'it', or 'why is this famous?', "
                    f"they are referring to '{ctx_data['item']}'."
                )

        # Enrich with Main Backend metadata if available and item_id is specified
        if context and context.item_id and ctx_data.get("item"):
            backend_info = self.fetch_backend_cultural_context("cultural_item", context.item_id)
            if backend_info and isinstance(backend_info, dict):
                desc = backend_info.get("description") or backend_info.get("summary")
                if desc:
                    details.append(f"Verified Backend Details for {ctx_data['item']}: {desc}")

        directives.append(
            "- DO NOT prepend 'In the context of [State]:' to your response."
        )

        if not details and not directives:
            return ""

        prompt_block = ""
        if details:
            prompt_block += (
                f"\n\nCURRENT USER EXPLORATION CONTEXT:\n"
                + "\n".join(f"• {d}" for d in details)
            )

        if directives:
            prompt_block += "\n\nCONTEXT INTERPRETATION GUIDANCE:\n" + "\n".join(directives)

        return prompt_block


context_service = ContextService()
