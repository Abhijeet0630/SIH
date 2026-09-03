"""
Bharat AI Suggestion Engine Service.

Generates contextually relevant follow-up questions based on the user query,
active UI context (state, category, item, view), and conversation history.
Follows the priority: USER QUERY > EXPLICIT ENTITY > CONVERSATION CONTEXT > UI PAGE CONTEXT.
"""

from typing import List, Optional
from app.schemas.chat import ChatContext
from app.services.context_service import context_service

class SuggestionService:
    """Generates contextually grounded follow-up question suggestions."""

    def generate_suggestions(
        self, 
        message: str, 
        context: Optional[ChatContext] = None, 
        llm_suggestions: Optional[List[str]] = None
    ) -> List[str]:
        """
        Main entry point for retrieving suggestions.
        If LLM returns non-empty, clean suggestions, validate and return them.
        Otherwise, compute context-aware deterministic suggestions.
        """
        if llm_suggestions and len(llm_suggestions) >= 2:
            cleaned = [s.strip() for s in llm_suggestions if isinstance(s, str) and len(s.strip()) > 5]
            if len(cleaned) >= 2:
                return cleaned[:3]

        return self.compute_contextual_suggestions(message, context)

    def compute_contextual_suggestions(self, message: str, context: Optional[ChatContext] = None) -> List[str]:
        lower_q = (message or "").lower()

        # 1. EXPLICIT QUERY ENTITIES (Strict highest priority)
        if "idli" in lower_q:
            return [
                "How is authentic Idli prepared?",
                "What chutneys are served with Idli?",
                "Tell me about South Indian culinary heritage"
            ]

        if any(k in lower_q for k in ["vada pav", "vadapav", "wada pav"]):
            return [
                "Where did Vada Pav originate in Mumbai?",
                "What chutneys are served with Vada Pav?",
                "Tell me about Maharashtra street food"
            ]

        if "gateway" in lower_q:
            return [
                "Who was the architect of Gateway of India?",
                "What architectural style is Gateway of India?",
                "Explore Gateway of India 3D Model"
            ]

        if "gudi padwa" in lower_q:
            return [
                "What is the significance of the Gudi flag?",
                "What traditional dishes are made on Gudi Padwa?",
                "Explore Maharashtra festival traditions"
            ]

        if "bihu" in lower_q:
            return [
                "What are the three types of Bihu?",
                "What instruments are played during Bihu dance?",
                "Explore Assam cultural heritage"
            ]

        if any(k in lower_q for k in ["living root", "root bridge", "jingkieng"]):
            return [
                "Where is the double-decker Living Root Bridge located?",
                "How long do Living Root Bridges survive?",
                "Tell me about Khasi tribe traditions"
            ]

        if "paithani" in lower_q:
            return [
                "How is authentic Paithani woven?",
                "What motifs are traditional on Paithani sarees?",
                "Explore Maharashtra textile traditions"
            ]

        if any(k in lower_q for k in ["muga", "assam silk"]):
            return [
                "What makes Muga Silk unique to Assam?",
                "How is Mekhela Chador draped?",
                "Explore Assam weaving traditions"
            ]

        if any(k in lower_q for k in ["ellora", "kailasa"]):
            return [
                "How was Kailasa Temple carved from top to bottom?",
                "What deities are depicted at Ellora?",
                "Explore 3D Monument Models"
            ]

        if "raigad" in lower_q or ("fort" in lower_q and not any(f in lower_q for f in ["sinhagad", "pratapgad", "janjira"])):
            return [
                "Where is Raigad Fort located?",
                "How many gates are there on Raigad Fort?",
                "Tell me about the coronation of Shivaji Maharaj at Raigad"
            ]

        # 2. UI CONTEXT FALLBACK (Only when query has no explicit entity)
        ctx_data = context_service.process_context(context)
        state = ctx_data.get("state")
        category = (ctx_data.get("category") or "").lower()
        item = ctx_data.get("item")

        if item:
            return [
                f"What is the history behind {item}?",
                f"How is {item} connected to regional culture?",
                "What other traditions are found here?"
            ]

        if "food" in category or "gastronomy" in category:
            return [
                "What are the most famous traditional dishes?",
                "What indigenous spices are used in this cuisine?",
                "Tell me about local festive recipes"
            ]

        if "monuments" in category or "forts" in category:
            return [
                "What are the major historical forts in this region?",
                "Tell me about ancient temple architecture",
                "Show available 3D monument models"
            ]

        if "festivals" in category:
            return [
                "Which seasonal festivals are celebrated here?",
                "What rituals are performed during major festivals?",
                "What festive sweets are prepared for celebrations?"
            ]

        if state:
            return [
                f"What are the famous monuments of {state}?",
                f"Tell me about traditional recipes of {state}",
                f"Which major festivals are celebrated in {state}?"
            ]

        # 3. DEFAULT HERITAGE SUGGESTIONS
        return [
            "What are the famous forts of Maharashtra?",
            "Tell me about Living Root Bridges of Meghalaya",
            "What is special about Assam Muga Silk?"
        ]

suggestion_service = SuggestionService()
