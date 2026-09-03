"""
AI Service — gateway/abstraction layer for the AI cultural guide.

Follows strict priority:
USER QUERY > EXPLICIT CULTURAL ENTITY / INTENT > CONVERSATION CONTEXT > UI PAGE CONTEXT

Integrates with dedicated AI Microservice (Port 8001) via RemoteAIService,
with a robust entity-grounded fallback service.
"""
import uuid
import logging
from typing import Protocol, Optional, List, Dict, Any
import httpx
from app.schemas.ai import AIChatRequest, AIChatResponse
from app.core.config import get_settings

logger = logging.getLogger("heritage.ai_service")


# ── Interface / Protocol ─────────────────────────────────────────────────────

class AIServiceInterface(Protocol):
    """Protocol (interface) that any AI implementation must satisfy."""

    def chat(self, request: AIChatRequest) -> AIChatResponse:
        """Process a chat message and return an AI response."""
        ...


# ── Entity-First Grounded Mock Service ───────────────────────────────────────

class MockAIService:
    """
    Entity-first AI service that grounds answers on detected cultural entities
    without blindly prepending state context or forcing unrelated regional data.
    """

    def chat(self, request: AIChatRequest) -> AIChatResponse:
        conversation_id = request.conversation_id or str(uuid.uuid4())
        msg = (request.message or "").strip()
        lower_q = msg.lower()

        # 1. Detect explicit entity in user query
        # IDLI
        if "idli" in lower_q:
            message = (
                "Idli is a traditional South Indian steamed cake made from a fermented batter of rice and black gram (urad dal). "
                "Its historical origins trace back centuries to southern India, with early references in ancient Kannada and Tamil culinary texts. "
                "It is celebrated as an easily digestible staple across Karnataka, Tamil Nadu, Kerala, and Andhra Pradesh, traditionally served alongside sambar and coconut chutney."
            )
            suggestions = [
                "How is authentic Idli prepared?",
                "What chutneys are served with Idli?",
                "Tell me about South Indian culinary heritage"
            ]

        # RAIGAD HERITAGE TRAVEL / ROUTE FROM ALANDI
        elif "raigad" in lower_q and any(k in lower_q for k in ["alandi", "pune", "mumbai", "route", "how to go", "how to reach", "directions", "way to", "distance"]):
            message = (
                "To reach Raigad Fort from Alandi or Pune, travel via the Pune–Bengaluru Highway (NH 48) toward Bhor or take the scenic Tamhini Ghat route down to Mangaon and Mahad (approx. 150–160 km, 4–5 hours by road). "
                "From Mahad, proceed 25 km to the base village of Pachad. "
                "Visitors can ascend to the royal citadel either via the Raigad Ropeway in 10 minutes or by trekking the historic pathway of approximately 1,450 stone steps."
            )
            suggestions = [
                "How long is the Raigad Ropeway ride?",
                "What are the major gates of Raigad Fort?",
                "Tell me about the coronation of Shivaji Maharaj"
            ]

        # VADA PAV
        elif any(k in lower_q for k in ["vada pav", "vadapav", "wada pav"]):
            if any(k in lower_q for k in ["ingredient", "recipe", "prepare", "make", "cook"]):
                message = (
                    "Vada Pav is made by preparing a spiced potato filling seasoned with mustard seeds, turmeric, ginger, and garlic. "
                    "The patty is dipped in chickpea flour (besan) batter and deep-fried until crisp and golden. "
                    "It is served hot inside a soft pav accompanied by fiery dry garlic chutney and fried green chilies."
                )
                suggestions = [
                    "Where did Vada Pav originate in Mumbai?",
                    "What chutneys are served with Vada Pav?",
                    "Tell me about Maharashtra street food"
                ]
            else:
                message = (
                    "Vada Pav is an iconic street food originating in Mumbai, Maharashtra, created in 1966 by street vendor Ashok Vaidya outside Dadar railway station. "
                    "It features a spiced, batter-fried potato fritter tucked inside a soft bread bun with spicy garlic chutney. "
                    "It became a beloved culinary symbol of Mumbai's working-class vitality and street food culture."
                )
                suggestions = [
                    "How is authentic Vada Pav prepared?",
                    "What chutneys are served with Vada Pav?",
                    "Tell me about Maharashtra street food"
                ]

        # GATEWAY OF INDIA
        elif "gateway of india" in lower_q or "gateway" in lower_q:
            message = (
                "The Gateway of India is an iconic 20th-century arch monument located at Apollo Bunder in Mumbai, Maharashtra. "
                "Designed by Scottish architect George Wittet in the Indo-Saracenic architectural style using yellow basalt stone, it was erected to commemorate the 1911 landing of King George V and Queen Mary and completed in 1924. "
                "It stands as a grand waterfront landmark facing the Arabian Sea."
            )
            suggestions = [
                "Who was the architect of Gateway of India?",
                "What architectural style is Gateway of India?",
                "Explore Gateway of India 3D Model"
            ]

        # GUDI PADWA
        elif "gudi padwa" in lower_q or "padwa" in lower_q:
            message = (
                "Gudi Padwa marks the traditional New Year for Marathi and Konkani Hindus, celebrated on the first day of the Chaitra month. "
                "Families hoist the auspicious victory Gudi flag outside their homes, create vibrant floral rangolis, and prepare festive delicacies like Puran Poli and bitter-sweet Neem-Jaggery prasad. "
                "It symbolizes new beginnings, agricultural prosperity, and the triumph of good."
            )
            suggestions = [
                "What is the significance of the Gudi flag?",
                "What traditional dishes are made on Gudi Padwa?",
                "Explore Maharashtra festival traditions"
            ]

        # BIHU
        elif "bihu" in lower_q:
            message = (
                "Bihu represents the trio of major seasonal festivals celebrating Assamese heritage and agrarian cycles in Assam. "
                "Rongali (Bohag Bihu) in spring marks the Assamese New Year with vibrant folk dances and dhol beats, Kongali (Kati Bihu) in autumn involves lighting lamps in paddy fields, and Bhogali (Magh Bihu) in winter is a joyous community harvest feast."
            )
            suggestions = [
                "What are the three types of Bihu?",
                "What instruments are played during Bihu dance?",
                "Explore Assam cultural heritage"
            ]

        # LIVING ROOT BRIDGES
        elif any(k in lower_q for k in ["living root", "root bridge", "jingkieng"]):
            message = (
                "Living Root Bridges (Jingkieng Jri) are unique bio-engineered bridges grown across rivers by the indigenous Khasi and Jaintia communities of Meghalaya. "
                "Trained over 15 to 30 years from the aerial roots of Ficus elastica trees using hollowed betel nut trunks, they grow stronger with age and survive heavy monsoon floods. "
                "They represent centuries of indigenous ecological stewardship in Cherrapunji and Nongriat."
            )
            suggestions = [
                "Where is the double-decker Living Root Bridge located?",
                "How long do Living Root Bridges survive?",
                "Tell me about Khasi tribe traditions"
            ]

        # PAITHANI SAREE
        elif "paithani" in lower_q:
            message = (
                "Paithani is a regal handwoven silk saree originating from Paithan, Maharashtra, dating back over two millennia to the Satavahana dynasty. "
                "Crafted from pure mulberry silk and gold or silver zari threads, it features a distinctive kaleidoscopic pallu and hand-embroidered peacock, parrot, and lotus motifs. "
                "It remains a cherished heirloom in traditional Maharashtrian weddings."
            )
            suggestions = [
                "How is an authentic Paithani saree woven?",
                "What motifs are traditional on Paithani sarees?",
                "Explore Maharashtra textile traditions"
            ]

        # ASSAM SILK / MUGA SILK
        elif any(k in lower_q for k in ["muga", "assam silk", "eri silk"]):
            message = (
                "Muga Silk is a rare, naturally golden-yellow silk produced exclusively in Assam from the wild silkworm Antheraea assamensis. "
                "Historically patronized by Ahom royalty, it is celebrated for its glossy texture, extreme durability, and the unique quality that its golden luster brightens with every wash. "
                "It is traditionally tailored into exquisite Mekhela Chador attires."
            )
            suggestions = [
                "What makes Muga Silk unique to Assam?",
                "How is Mekhela Chador draped?",
                "Explore Assam weaving traditions"
            ]

        # ELLORA / KAILASA
        elif any(k in lower_q for k in ["ellora", "kailasa"]):
            message = (
                "The Kailasa Temple (Cave 16) at Ellora Caves in Maharashtra is the world's largest monolithic rock excavation. "
                "Carved top-to-bottom from a single basalt cliff in the 8th century under Rashtrakuta King Krishna I, it is an astonishing architectural and engineering triumph. "
                "The temple complex features intricate mythological carvings and grand life-sized elephant sculptures."
            )
            suggestions = [
                "How was Kailasa Temple carved from top to bottom?",
                "What deities are depicted at Ellora?",
                "Explore 3D Monument Models"
            ]

        # RAIGAD GENERAL
        elif "raigad" in lower_q:
            message = (
                "Raigad Fort was the historic capital of the Maratha Empire under Chhatrapati Shivaji Maharaj, situated at an elevation of 2,700 feet in the Sahyadri mountains near Mahad, Maharashtra. "
                "Known as the 'Gibraltar of the East', it features sheer natural escarpments, historic gateways, the royal throne room, and the sacred Jagdishwar Temple. "
                "It stands as a monumental symbol of Maratha sovereignty and military architecture."
            )
            suggestions = [
                "How to reach Raigad Fort from Alandi or Pune?",
                "How many gates are there on Raigad Fort?",
                "Tell me about the coronation of Shivaji Maharaj at Raigad"
            ]

        # MAHARASHTRA STATE OVERVIEW (Explicit state query)
        elif "maharashtra" in lower_q:
            message = (
                "Maharashtra has a deeply layered cultural heritage spanning the Western Ghats (Sahyadris) to the Deccan Plateau — "
                "from Shivaji Maharaj's historic hill forts and Ajanta-Ellora rock-cut cave art to iconic street foods like Vada Pav and celebrations like Gudi Padwa."
            )
            suggestions = [
                "Tell me about Maharashtra hill forts",
                "What are famous dishes of Maharashtra?",
                "Which festivals are celebrated in Maharashtra?"
            ]

        # GENERAL HERITAGE
        else:
            message = (
                "Regarding India's cultural heritage: our traditions, monuments, crafts, and cuisines "
                "reflect millennia of diverse regional histories and indigenous artistry across every state."
            )
            suggestions = [
                "Tell me about historic Indian hill forts",
                "What are famous regional dishes of India?",
                "Which traditional festivals are celebrated across India?"
            ]

        return AIChatResponse(
            message=message,
            conversation_id=conversation_id,
            avatar_state="speaking",
            suggestions=suggestions,
        )


# ── Remote AI Service (Delegating to AI Microservice) ────────────────────────

class RemoteAIService:
    """Delegates AI chat requests to the dedicated Bharat AI Microservice (Port 8001)."""

    def __init__(self, url: str):
        self.url = url.rstrip("/")

    def chat(self, request: AIChatRequest) -> AIChatResponse:
        endpoint = f"{self.url}/api/ai/chat"
        payload: Dict[str, Any] = {
            "message": request.message,
            "conversation_id": request.conversation_id,
        }
        if request.context:
            payload["context"] = {
                "state_id": request.context.state_id,
                "category": getattr(request.context, "category", None),
                "item_id": request.context.item_id,
                "view": getattr(request.context, "view", "/") or "/",
            }

        try:
            with httpx.Client(timeout=10.0) as client:
                res = client.post(endpoint, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    chat_data = data.get("data", {})
                    return AIChatResponse(
                        message=chat_data.get("message", ""),
                        conversation_id=chat_data.get("conversation_id", request.conversation_id or str(uuid.uuid4())),
                        avatar_state=chat_data.get("avatar_state", "speaking"),
                        suggestions=chat_data.get("suggestions", []),
                    )
        except Exception as exc:
            logger.warning("Failed to reach remote AI service at %s: %s; falling back to local engine", endpoint, exc)

        # Fallback to smart local mock service on remote failure
        return MockAIService().chat(request)


# ── Service Factory ──────────────────────────────────────────────────────────

def get_ai_service() -> AIServiceInterface:
    """Return the appropriate AI service implementation."""
    settings = get_settings()
    ai_url = getattr(settings, "AI_SERVICE_URL", None) or "http://127.0.0.1:8001"
    return RemoteAIService(url=ai_url)
