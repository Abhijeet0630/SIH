"""
Server-side Intent-Aware Domain Restriction Guard for Bharat AI.

Implements a 5-step classification pipeline:
STEP 1: Detect explicit cultural entity (monuments, forts, temples, food, textiles, crafts, festivals, dynasties).
STEP 2: Detect cultural / heritage intent (history, architecture, origins, rituals, recipes, traditions).
STEP 3: Detect heritage travel intent (routes, directions, travel to cultural/heritage landmarks).
STEP 4: Detect clearly out-of-domain intent (politics, sports, programming/code, stocks, general navigation).
STEP 5: Return (is_in_scope, refusal_dict).
"""

import re
import logging
from typing import Dict, Any, List, Optional, Tuple

logger = logging.getLogger("bharat_ai.domain_guard")

class DomainGuard:
    """Intent-aware domain filter ensuring Bharat AI processes only Indian cultural-heritage topics."""

    # 1. Cultural Entities (Forts, Monuments, Temples, Caves, Heritage Destinations, Regional Traditions)
    HERITAGE_ENTITIES = [
        # Forts & Architecture
        "fort", "forts", "fortress", "bastion", "darwaja", "buruj", "hirakani",
        "raigad", "sinhagad", "pratapgad", "shaniwar wada", "janjira", "shivneri", "daulatabad", "panhala",
        "gateway of india", "gateway", "apollo bunder", "taj mahal", "red fort", "qutub minar", "hampi",
        "ellora", "ajanta", "kailasa", "elephanta", "monument", "monuments", "palace", "temple", "temples", "cave", "caves",
        "alandi", "dehu", "pandharpur", "shirdi", "trimbakeshwar", "unesco", "architecture", "architect", "hiroji", "indulkar",
        # Historical Dynasties & Figures
        "shivaji", "chhatrapati", "maratha", "ahom", "peshwa", "ashoka", "akbar", "rashtrakuta", "chalukya", "chola", "vijayanagara",
        "dnyaneshwar", "tukaram", "coronation", "shivrajyabhishek", "mahad", "sahyadri",
        # Living Heritage, Crafts & Textiles
        "living root", "root bridge", "root bridges", "jingkieng jri", "meghalaya", "khasi", "jaintia", "garo",
        "paithani", "muga silk", "muga", "assam silk", "eri silk", "warli", "madhubani", "chanderi", "banarasi",
        "handicraft", "handloom", "textile", "saree", "mekhela chador",
        # Culinary Heritage
        "vada pav", "vadapav", "wada pav", "idli", "dosa", "sambar", "misal", "misal pav", "puran poli", "pithla", "bhakri",
        "biryani", "dhokla", "rasgulla", "khichdi", "modak", "laddoo", "cuisine", "recipe", "traditional dish", "street food", "chutney",
        # Performing Arts & Festivals
        "gudi padwa", "bihu", "onam", "pongal", "diwali", "holi", "ganesh chaturthi", "pushkar", "durga puja", "navratri",
        "lavani", "koli", "wangala", "kathakali", "garba", "ghoomar", "bharatanatyam", "folk dance"
    ]

    # 2. Heritage Travel keywords
    HERITAGE_TRAVEL_TRIGGERS = [
        "how to go to", "how to reach", "how can i visit", "how do i reach", "how to visit",
        "route from", "route to", "way to", "directions to", "how far is", "where is",
        "reach from", "travel from", "distance from", "distance to", "bus to", "train to",
        "nearest station to", "nearest airport to", "ropeway to", "steps to"
    ]

    def check_scope(
        self, 
        message: str, 
        conversation_id: str, 
        context_str: str = "", 
        history: Optional[List[dict]] = None
    ) -> Tuple[bool, Optional[Dict[str, Any]]]:
        """
        Evaluates whether a message is IN_SCOPE or OUT_OF_SCOPE.
        Returns:
            (True, None) if IN_SCOPE
            (False, refusal_dict) if OUT_OF_SCOPE
        """
        text = (message or "").strip().lower()
        if not text:
            return True, None

        # ---------------------------------------------------------------------
        # 1. Prompt Injection Protection
        # ---------------------------------------------------------------------
        injection_patterns = [
            r"ignore\s+(all\s+)?(previous\s+)?instructions",
            r"act\s+as\s+a\s+(general|regular|standard)\s+ai",
            r"you\s+are\s+no\s+longer\s+bharat\s+ai",
            r"system\s+prompt:",
            r"override\s+restriction"
        ]
        for pattern in injection_patterns:
            if re.search(pattern, text):
                logger.warning("[DOMAIN_GUARD_REFUSAL] Prompt injection attempt detected in session %s.", conversation_id)
                return False, self._build_refusal(conversation_id, "prompt_injection")

        # ---------------------------------------------------------------------
        # 2. STEP 1 & 2: Explicit Cultural Entity & Heritage Intent Detection
        # ---------------------------------------------------------------------
        has_heritage_entity = any(k in text for k in self.HERITAGE_ENTITIES)
        
        # Historical warfare & martial heritage exception
        is_historical_war = has_heritage_entity and any(w in text for w in ["war", "wartime", "military", "battle", "defense", "defend", "weapon", "cannon"])

        # ---------------------------------------------------------------------
        # 3. STEP 3: Heritage Travel Intent Detection
        # ---------------------------------------------------------------------
        is_heritage_travel = has_heritage_entity and any(t in text for t in self.HERITAGE_TRAVEL_TRIGGERS)

        # ---------------------------------------------------------------------
        # 4. STEP 4: Explicit Out-of-Scope Classification
        # ---------------------------------------------------------------------
        # Politics & Current Political Figures
        politics_keywords = [
            "prime minister", "pm of india", "president of india", "chief minister", "cm of",
            "election", "who won the election", "parliament news", "narendra modi", "rahul gandhi",
            "bjp", "congress party", "mla election", "mp election", "political party", "vote for"
        ]
        if any(k in text for k in politics_keywords):
            logger.info("[DOMAIN_GUARD_REFUSAL] Political query refused in session %s.", conversation_id)
            return False, self._build_refusal(conversation_id, "politics")

        # Sports & Live Match Updates
        sports_keywords = [
            "cricket match", "cricket score", "who won today's match", "who won the match",
            "who won today's cricket match", "ipl", "virat kohli", "rohit sharma", "world cup score",
            "football match", "tennis score", "sports score", "who won the ipl", "olympics score"
        ]
        if any(k in text for k in sports_keywords):
            logger.info("[DOMAIN_GUARD_REFUSAL] Sports query refused in session %s.", conversation_id)
            return False, self._build_refusal(conversation_id, "sports")

        # News & Current Headlines
        news_keywords = [
            "today's headlines", "todays headlines", "news today", "latest news", "world news",
            "happened in india today", "headlines today"
        ]
        if any(k in text for k in news_keywords):
            logger.info("[DOMAIN_GUARD_REFUSAL] News query refused in session %s.", conversation_id)
            return False, self._build_refusal(conversation_id, "news")

        # Technical / Academic / Programming / Coding
        tech_keywords = [
            "python program", "python function", "write python code", "how does react work",
            "react code", "java application", "calculus problem", "quantum physics", "kubernetes",
            "write my resume", "stock price", "apple stock", "crypto price", "bitcoin",
            "stock market prediction", "today's weather", "weather today", "weather forecast"
        ]
        if any(k in text for k in tech_keywords):
            logger.info("[DOMAIN_GUARD_REFUSAL] Technical/General query refused in session %s.", conversation_id)
            return False, self._build_refusal(conversation_id, "technical")

        # Macro-Economics without cultural heritage
        macro_keywords = [
            "india's gdp", "gdp today", "population of india today", "richest person in india", "stock market today"
        ]
        if any(k in text for k in macro_keywords):
            logger.info("[DOMAIN_GUARD_REFUSAL] Macro-economics query refused in session %s.", conversation_id)
            return False, self._build_refusal(conversation_id, "macro_econ")

        # General non-heritage navigation (e.g. "how do I go from pune to the airport")
        general_nav_keywords = [
            "to the airport", "to airport", "route to airport", "cab to airport",
            "bus to airport", "metro station", "hospital", "shopping mall", "supermarket"
        ]
        if any(k in text for k in general_nav_keywords) and not has_heritage_entity:
            logger.info("[DOMAIN_GUARD_REFUSAL] General non-heritage navigation refused in session %s.", conversation_id)
            return False, self._build_refusal(conversation_id, "out_of_scope")

        # ---------------------------------------------------------------------
        # 5. STEP 5: In-Scope Acceptance
        # ---------------------------------------------------------------------
        if has_heritage_entity or is_historical_war or is_heritage_travel:
            return True, None

        # ---------------------------------------------------------------------
        # 6. Contextual Pronoun Follow-up Check
        # ---------------------------------------------------------------------
        pronoun_followup_keywords = [
            "where is it", "who built it", "how many gates does it have", "how do i reach it",
            "how are they grown", "where are they found", "tell me more", "what is special about it",
            "how is it prepared", "what is its history", "how to visit it", "how can i go there"
        ]
        is_pronoun = any(k in text for k in pronoun_followup_keywords) or len(text.split()) <= 4

        if is_pronoun:
            # Check if active conversation history has a cultural topic
            has_history_entity = False
            if history:
                for h in reversed(history):
                    content = h.get("content", "").lower()
                    if any(k in content for k in self.HERITAGE_ENTITIES):
                        has_history_entity = True
                        break

            # Check if active page context route has a cultural topic
            has_route_entity = any(k in (context_str or "").lower() for k in self.HERITAGE_ENTITIES)

            if has_history_entity or has_route_entity:
                return True, None

        # ---------------------------------------------------------------------
        # 7. Default Fallback Refusal for Arbitrary Non-Heritage Queries
        # ---------------------------------------------------------------------
        logger.info("[DOMAIN_GUARD_REFUSAL] Unrelated non-heritage query refused in session %s: '%s'", conversation_id, text)
        return False, self._build_refusal(conversation_id, "out_of_scope")

    def _build_refusal(self, conversation_id: str, reason: str) -> Dict[str, Any]:
        """Constructs standardized polite refusal envelope compliant with API contract."""
        if reason == "politics":
            refusal_text = (
                "I'm Bharat AI, focused on India's cultural heritage, monuments, traditions, art, crafts, and cuisine. "
                "I can't help with political or current-affairs questions.\n\n"
                "Try asking me about an Indian monument, fort, tradition, art form, craft, festival, or cuisine!"
            )
        elif reason == "sports":
            refusal_text = (
                "I'm Bharat AI, focused on India's cultural heritage, monuments, traditions, art, crafts, and cuisine. "
                "I can't help with sports scores or current match updates.\n\n"
                "Try asking me about an Indian fort, monument, tradition, artwork, festival, or regional dish!"
            )
        elif reason == "news":
            refusal_text = (
                "I'm Bharat AI, focused on India's cultural heritage, monuments, traditions, art, crafts, and cuisine. "
                "I can't help with today's news or current headlines.\n\n"
                "Try asking me about an Indian fort, monument, tradition, artwork, festival, or regional dish!"
            )
        else:
            refusal_text = (
                "I'm Bharat AI, focused on India's cultural heritage, monuments, traditions, art, crafts, festivals, and cuisine. "
                "I can't help with politics, sports, coding, or unrelated general topics.\n\n"
                "Try asking me about an Indian monument, fort, festival, traditional food, art form, craft, or heritage site!"
            )

        return {
            "message": refusal_text,
            "conversation_id": conversation_id,
            "avatar_state": "speaking",
            "suggestions": [
                "Tell me about Raigad Fort",
                "What is Paithani Saree?",
                "Where is Vada Pav famous?"
            ]
        }
