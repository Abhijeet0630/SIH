"""
Local Intent-Routed Knowledge Engine for Bharat AI Service.

Provides domain-grounded, context-aware responses (60-100 words, 4-5 lines)
following the strict priority:
USER QUERY > EXPLICIT CULTURAL ENTITY / INTENT > CONVERSATION CONTEXT > UI PAGE CONTEXT
"""

import logging
from typing import Dict, Any, List, Optional
from app.services.domain_guard import DomainGuard

logger = logging.getLogger("bharat_ai.fallback_engine")

class LocalFallbackEngine:
    """Local Knowledge Engine providing accurate offline cultural responses and suggestions."""

    def __init__(self):
        self.domain_guard = DomainGuard()

    def get_fallback_response(
        self, 
        message: str, 
        conversation_id: str, 
        context_str: str = "", 
        history: Optional[List[dict]] = None
    ) -> Dict[str, Any]:
        """Context-aware local response generator with defensive domain checking."""
        is_in_scope, refusal_dict = self.domain_guard.check_scope(
            message=message,
            conversation_id=conversation_id,
            context_str=context_str,
            history=history
        )
        if not is_in_scope and refusal_dict:
            logger.warning("[FALLBACK_DEFENSIVE_REFUSAL] Out-of-scope query refused: %s", message)
            return refusal_dict

        return self._fallback_response(message, conversation_id, context_str, history)

    def _derive_suggestions(
        self, 
        message: str, 
        response_text: str, 
        context_str: str = "", 
        history: Optional[List[dict]] = None
    ) -> List[str]:
        lower = (message + " " + response_text).lower()
        if "idli" in lower:
            return [
                "How is authentic Idli prepared?",
                "What chutneys are served with Idli?",
                "Tell me about South Indian culinary heritage"
            ]
        if "vada pav" in lower or "vadapav" in lower or "wada pav" in lower:
            return [
                "Where did Vada Pav originate in Mumbai?",
                "What chutneys are served with Vada Pav?",
                "Tell me about Maharashtra street food"
            ]
        if "gateway of india" in lower or "gateway" in lower:
            return [
                "Who was the architect of Gateway of India?",
                "What architectural style is Gateway of India?",
                "Explore Gateway of India 3D Model"
            ]
        if "gudi padwa" in lower:
            return [
                "What is the significance of the Gudi flag?",
                "What traditional dishes are made on Gudi Padwa?",
                "Explore Maharashtra festival traditions"
            ]
        if "bihu" in lower:
            return [
                "What are the three types of Bihu?",
                "What instruments are played during Bihu dance?",
                "Explore Assam cultural heritage"
            ]
        if "root bridge" in lower or "meghalaya" in lower:
            return [
                "Where is the double-decker Living Root Bridge located?",
                "How long do Living Root Bridges survive?",
                "Tell me about Khasi tribe traditions"
            ]
        if "paithani" in lower:
            return [
                "How is an authentic Paithani saree woven?",
                "What motifs are traditional on Paithani sarees?",
                "Explore Maharashtra textile traditions"
            ]
        if "muga" in lower:
            return [
                "What makes Muga Silk unique to Assam?",
                "How is Mekhela Chador draped?",
                "Explore Assam weaving traditions"
            ]
        if "alandi" in lower or "route" in lower or "reach" in lower or "travel" in lower:
            return [
                "How long is the Raigad Ropeway ride?",
                "What are the major gates of Raigad Fort?",
                "Tell me about the coronation of Shivaji Maharaj"
            ]
        if "gate" in lower:
            return [
                "What are the names of all gates on Raigad Fort?",
                "Tell me about the Maha Darwaja gate",
                "What other structures exist inside Raigad Fort?"
            ]
        if "hirakani" in lower or "buruj" in lower:
            return [
                "What is the legend of Hirakani Buruj?",
                "What other bastions exist on Raigad Fort?",
                "Show 3D Raigad Fort model"
            ]
        if "coronation" in lower or "crowned" in lower or "1674" in lower:
            return [
                "Who performed the coronation of Shivaji Maharaj?",
                "What was the capital of Maratha Empire before Raigad?",
                "Where is the throne room in Raigad Fort?"
            ]
        if "raigad" in lower or "fort" in lower:
            return [
                "How to reach Raigad Fort from Alandi or Pune?",
                "How many gates are there on Raigad Fort?",
                "Tell me about the coronation of Shivaji Maharaj at Raigad"
            ]
        return [
            "What are the famous forts of Maharashtra?",
            "Tell me about Paithani Saree heritage",
            "Show 3D Gateway of India model"
        ]

    def _detect_explicit_topic(self, text: str) -> Optional[str]:
        t = (text or "").lower().strip()
        if not t:
            return None

        # 1. Idli
        if "idli" in t:
            return "idli"

        # 2. Vada Pav
        if any(k in t for k in ["vada pav", "vadapav", "wada pav", "wadapav", "vada-pav", "wada-pav", "batata vada"]):
            return "vada_pav"

        # 3. Raigad Heritage Travel / Route
        if "raigad" in t and any(k in t for k in ["alandi", "pune", "mumbai", "route", "how to go", "how to reach", "directions", "way to", "distance"]):
            return "raigad_travel"

        # 4. Gateway of India
        if any(k in t for k in ["gateway of india", "gateway", "apollo bunder"]):
            return "gateway_of_india"

        # 5. Gudi Padwa
        if any(k in t for k in ["gudi padwa", "padwa"]):
            return "gudi_padwa"

        # 6. Bihu
        if "bihu" in t:
            return "bihu"

        # 7. Living Root Bridges / Meghalaya
        if any(k in t for k in ["living root bridge", "root bridge", "root bridges", "jingkieng jri", "meghalaya"]):
            return "root_bridges"

        # 8. Ellora / Kailasa
        if any(k in t for k in ["ellora", "kailasa"]):
            return "ellora"

        # 9. Hirakani Buruj
        if any(k in t for k in ["hirakani", "buruj"]):
            return "hirakani"

        # 10. Specific Raigad Fort Gates & Builders & Coronation
        if any(k in t for k in ["maha darwaja", "palkhi darwaja", "mena darwaja", "wagh darwaja"]):
            return "raigad_gates"
        if any(k in t for k in ["hiroji", "indulkar"]):
            return "raigad_builder"
        if any(k in t for k in ["coronation", "shivrajyabhishek", "1674"]):
            return "raigad_coronation"

        # 11. Maharashtra Forts Overview
        if any(k in t for k in ["forts of maharashtra", "maharashtra fort", "maharashtra forts", "famous forts", "sinhagad", "pratapgad", "janjira", "shivneri"]):
            return "maharashtra_forts"

        # 12. Raigad Fort General
        if any(k in t for k in ["raigad", "raigad fort"]):
            return "raigad"

        # 13. Textiles & Costumes
        if "paithani" in t:
            return "paithani"
        if "muga" in t:
            return "muga_silk"

        # 14. General Fort
        if "fort" in t:
            return "raigad"

        return None

    def _fallback_response(
        self, 
        message: str, 
        conversation_id: str, 
        context_str: str = "", 
        history: Optional[List[dict]] = None
    ) -> Dict[str, Any]:
        lower_q = message.lower().strip()

        # Step 1: Detect explicit topic in current user query FIRST
        topic = self._detect_explicit_topic(lower_q)

        # Step 2: If no explicit topic in query, resolve active topic from user messages in history (most recent first)
        if not topic and history:
            for h in reversed(history):
                if h.get("role") == "user":
                    prev_topic = self._detect_explicit_topic(h.get("content", ""))
                    if prev_topic:
                        topic = prev_topic
                        break

            if not topic:
                for h in reversed(history):
                    if h.get("role") != "user":
                        prev_topic = self._detect_explicit_topic(h.get("content", ""))
                        if prev_topic:
                            topic = prev_topic
                            break

        # Step 3: If still no topic, resolve from active page context string
        if not topic and context_str:
            topic = self._detect_explicit_topic(context_str)

        # =====================================================================
        # INTENT ROUTER (4-5 lines, 60-100 words)
        # =====================================================================

        # TOPIC: IDLI
        if topic == "idli":
            text = (
                "Idli is a traditional South Indian steamed cake made from a fermented batter of rice and black gram (urad dal). "
                "Its historical origins trace back centuries to southern India, with early references in ancient Kannada and Tamil culinary texts. "
                "It is celebrated as an easily digestible staple across Karnataka, Tamil Nadu, Kerala, and Andhra Pradesh, traditionally served alongside sambar and coconut chutney."
            )
            suggestions = [
                "How is authentic Idli prepared?",
                "What chutneys are served with Idli?",
                "Tell me about South Indian culinary heritage"
            ]

        # TOPIC: RAIGAD TRAVEL / ROUTE FROM ALANDI
        elif topic == "raigad_travel":
            text = (
                "To reach Raigad Fort from Alandi or Pune, travel via the Pune–Bengaluru Highway (NH 48) toward Bhor or take the scenic Tamhini Ghat route down to Mangaon and Mahad (approx. 150–160 km, 4–5 hours by road). "
                "From Mahad, proceed 25 km to the base village of Pachad. "
                "Visitors can ascend to the royal citadel either via the Raigad Ropeway in 10 minutes or by trekking the historic pathway of approximately 1,450 stone steps."
            )
            suggestions = [
                "How long is the Raigad Ropeway ride?",
                "What are the major gates of Raigad Fort?",
                "Tell me about the coronation of Shivaji Maharaj"
            ]

        # TOPIC: VADA PAV
        elif topic == "vada_pav":
            if any(k in lower_q for k in ["prepare", "make", "recipe", "ingredients", "cook"]):
                text = (
                    "Vada Pav preparation involves making a spiced Potato Filling seasoned with mustard seeds, turmeric, ginger, and garlic. "
                    "The mashed potato balls are coated in seasoned Besan Batter and deep-fried until golden. "
                    "They are served inside soft pav buns accompanied by spicy dry garlic chutney and fried green chilies."
                )
                suggestions = [
                    "Where did Vada Pav originate in Mumbai?",
                    "What chutneys are served with Vada Pav?",
                    "Tell me about Maharashtra street food"
                ]
            else:
                text = (
                    "Vada Pav is an iconic street food originating in Mumbai, Maharashtra. "
                    "Created in 1966 by street vendor Ashok Vaidya outside Dadar railway station, it became a beloved culinary symbol of Mumbai's vibrant working-class hustle. "
                    "Consisting of a golden fried spiced potato patty inside a soft pav bun with spicy garlic chutney, it remains India's favorite street burger."
                )
                suggestions = [
                    "How is authentic Vada Pav prepared?",
                    "What chutneys are served with Vada Pav?",
                    "Tell me about Maharashtra street food"
                ]

        # TOPIC: GATEWAY OF INDIA
        elif topic == "gateway_of_india":
            text = (
                "The Gateway of India is an iconic 20th-century arch monument located at Apollo Bunder in Mumbai, Maharashtra. "
                "Designed by Scottish architect George Wittet in the Indo-Saracenic architectural style using yellow basalt stone, it was erected to commemorate the 1911 landing of King George V and Queen Mary and completed in 1924. "
                "It stands as a grand waterfront landmark facing the Arabian Sea."
            )
            suggestions = [
                "Who was the architect of Gateway of India?",
                "What architectural style is Gateway of India?",
                "Explore Gateway of India 3D Model"
            ]

        # TOPIC: GUDI PADWA
        elif topic == "gudi_padwa":
            text = (
                "Gudi Padwa marks the traditional New Year for Marathi and Konkani Hindus, celebrated on the first day of the Chaitra month. "
                "Families hoist the auspicious victory Gudi flag outside their windows, create colorful floral rangolis, and prepare festive delicacies like sweet Puran Poli and bitter-sweet Neem-Jaggery prasad. "
                "It symbolizes new beginnings, agricultural prosperity, and the triumph of good."
            )
            suggestions = [
                "What is the significance of the Gudi flag?",
                "What traditional dishes are made on Gudi Padwa?",
                "Explore Maharashtra festival traditions"
            ]

        # TOPIC: BIHU
        elif topic == "bihu":
            text = (
                "Bihu represents the trio of major seasonal festivals celebrating Assamese heritage and agrarian cycles in Assam. "
                "Rongali (Bohag Bihu) in spring marks the Assamese New Year with vibrant folk dances and dhol beats, Kongali (Kati Bihu) in autumn involves lighting earthen lamps in paddy fields, and Bhogali (Magh Bihu) in winter is a joyous community harvest feast."
            )
            suggestions = [
                "What are the three types of Bihu?",
                "What instruments are played during Bihu dance?",
                "Explore Assam cultural heritage"
            ]

        # TOPIC: ELLORA / KAILASA
        elif topic == "ellora":
            text = (
                "The Kailasa Temple (Cave 16) at Ellora Caves in Maharashtra is the world's largest monolithic rock excavation. "
                "Carved top-to-bottom from a single basalt cliff in the 8th century under Rashtrakuta King Krishna I, it is an astonishing architectural and engineering triumph. "
                "The temple complex features intricate mythological carvings and grand life-sized elephant sculptures."
            )
            suggestions = [
                "How was Kailasa Temple carved from top to bottom?",
                "What deities are depicted at Ellora?",
                "Explore 3D Monument Models"
            ]

        # TOPIC: LIVING ROOT BRIDGES
        elif topic == "root_bridges":
            text = (
                "Living Root Bridges (Jingkieng Jri) are unique bio-engineered bridges grown across rivers by the indigenous Khasi and Jaintia communities of Meghalaya. "
                "Trained over 15 to 30 years from the aerial roots of Ficus elastica trees using hollowed betel nut trunks, they grow stronger with age and survive heavy monsoon floods. "
                "They represent centuries of indigenous ecological stewardship in Cherrapunji and Nongriat."
            )
            suggestions = [
                "Where is the double-decker Living Root Bridge located?",
                "How long do Living Root Bridges survive?",
                "Tell me about Khasi tribe traditions"
            ]

        # TOPIC: HIRAKANI BURUJ
        elif topic == "hirakani":
            text = (
                "Hirakani Buruj is a steep cliff bastion on the western edge of Raigad Fort in Maharashtra. "
                "According to legend, a courageous milkmaid named Hirakani climbed down the sheer precipice after the fort gates were locked at sunset to feed her infant. "
                "Impressed by her maternal bravery, Chhatrapati Shivaji Maharaj constructed and named this formidable bastion in her honor."
            )
            suggestions = [
                "What other bastions exist on Raigad Fort?",
                "Where is Hirakani Buruj located on Raigad Fort?",
                "Show 3D Raigad Fort model"
            ]

        # TOPIC: RAIGAD GATES
        elif topic == "raigad_gates" or (topic == "raigad" and any(k in lower_q for k in ["gate", "entrance", "entry", "darwaja"])):
            text = (
                "Raigad Fort features ingenious defensive gates designed by Maratha architects. "
                "The main entrance is the monumental Maha Darwaja, flanked by two towering bastions that conceal the entryway from approaching artillery. "
                "Other historic gateways include the Palkhi Darwaja for palanquins, the Mena Darwaja for royal women, and the secret Wagh Darwaja exit."
            )
            suggestions = [
                "Tell me about the Maha Darwaja gate",
                "What other structures exist inside Raigad Fort?",
                "Who designed the architecture of Raigad Fort?"
            ]

        # TOPIC: RAIGAD BUILDER / ARCHITECT
        elif topic == "raigad_builder" or (topic == "raigad" and any(k in lower_q for k in ["built", "builder", "architect", "constructed", "hiroji"])):
            text = (
                "Raigad Fort was extensively expanded and fortified under Chhatrapati Shivaji Maharaj, who acquired the Rairi hill in 1656 and declared it his capital in 1674. "
                "The chief architect and master builder was Hiroji Indulkar, who supervised the construction of over 300 structures, including royal palaces, granaries, and the Jagdishwar Temple."
            )
            suggestions = [
                "Tell me about the inscription by Hiroji Indulkar",
                "When was Chhatrapati Shivaji Maharaj crowned at Raigad?",
                "What are the main structures inside Raigad Fort?"
            ]

        # TOPIC: RAIGAD CORONATION
        elif topic == "raigad_coronation" or (topic == "raigad" and any(k in lower_q for k in ["coronation", "crowned", "shivrajyabhishek"])):
            text = (
                "Chhatrapati Shivaji Maharaj's historic coronation (Shivrajyabhishek) took place at Raigad Fort on June 6, 1674. "
                "Officiated by Pandit Gaga Bhatt of Varanasi according to ancient Vedic rites, the ceremony proclaimed the sovereign Maratha Kingdom (Hindavi Swarajya). "
                "The grand royal throne was placed in the Raj Sabha, facing east toward the rising sun."
            )
            suggestions = [
                "Where is the throne room inside Raigad Fort?",
                "Who was the chief architect of Raigad Fort?",
                "What was the capital of Maratha Empire before Raigad?"
            ]

        # TOPIC: RAIGAD FORT GENERAL / LOCATION / HISTORY
        elif topic == "raigad":
            if any(k in lower_q for k in ["where", "location", "located", "distance"]):
                text = (
                    "Raigad Fort is located in Mahad, Raigad District, Maharashtra, nestled in the Sahyadri range of the Western Ghats. "
                    "Situated at an altitude of approximately 2,700 feet above sea level, it lies about 170 km from Mumbai and 150 km from Pune, accessible via the Mahad highway and the Raigad Ropeway."
                )
            elif "history" in lower_q:
                text = (
                    "Raigad Fort was the historic capital of the Maratha Empire under Chhatrapati Shivaji Maharaj. "
                    "Originally known as Rairi, it was captured in 1656 and extensively fortified to become the royal seat in 1674, standing as an enduring symbol of Maratha sovereignty."
                )
            else:
                text = (
                    "Raigad Fort was the historic capital of the Maratha Empire under Chhatrapati Shivaji Maharaj, situated at an elevation of 2,700 feet in the Sahyadri mountains near Mahad, Maharashtra. "
                    "Known as the 'Gibraltar of the East', it features sheer natural escarpments, historic gateways, the royal throne room, and the sacred Jagdishwar Temple. "
                    "It stands as a monumental symbol of Maratha sovereignty and military architecture."
                )
            suggestions = [
                "How to reach Raigad Fort from Alandi or Pune?",
                "How many gates are there on Raigad Fort?",
                "Tell me about the coronation of Shivaji Maharaj at Raigad"
            ]

        # TOPIC: MAHARASHTRA FORTS OVERVIEW
        elif topic == "maharashtra_forts":
            text = (
                "Maharashtra is home to over 350 historic forts spanning sea, hill, and plains landscapes. "
                "Key fortresses include Raigad Fort (the Maratha capital), Sinhagad Fort (celebrated for Tanaji Malusare's battle), Pratapgad (site of the Afzal Khan encounter), Murud-Janjira (an impregnable island sea fort), and Shivneri Fort (birthplace of Shivaji Maharaj)."
            )
            suggestions = [
                "Tell me about the history of Raigad Fort",
                "Where is Murud-Janjira located?",
                "Tell me about Sinhagad Fort"
            ]

        # TOPIC: PAITHANI SAREE
        elif topic == "paithani":
            text = (
                "Paithani is a regal handwoven silk saree originating from Paithan, Maharashtra, dating back over two millennia to the Satavahana dynasty. "
                "Crafted from pure mulberry silk and gold or silver zari threads, it features a distinctive kaleidoscopic pallu and hand-embroidered peacock, parrot, and lotus motifs. "
                "It remains a cherished heirloom in traditional Maharashtrian weddings."
            )
            suggestions = [
                "How is a Paithani saree woven?",
                "What are the traditional colors of Paithani sarees?",
                "Tell me about Assam Muga Silk"
            ]

        # TOPIC: MUGA SILK
        elif topic == "muga_silk":
            text = (
                "Muga Silk is a rare, naturally golden-yellow silk produced exclusively in Assam from the wild silkworm Antheraea assamensis. "
                "Historically patronized by Ahom royalty, it is celebrated for its glossy texture, extreme durability, and the unique quality that its golden luster brightens with every wash. "
                "It is traditionally tailored into exquisite Mekhela Chador attires."
            )
            suggestions = [
                "What is Mekhela Chador?",
                "Tell me about Paithani Saree heritage",
                "Tell me about Assam cultural traditions"
            ]

        # GENERAL DEFAULT FALLBACK
        else:
            clean_q = message.strip()
            text = (
                f"Regarding **{clean_q}**: India's rich cultural heritage spans ancient monuments, regional art, textiles, festivals, and culinary traditions. "
                "Explore our interactive spatial atlases, 3D architectural models, and heritage archives to discover the diverse traditions of each region."
            )
            suggestions = [
                "Tell me about the history of Raigad Fort",
                "What are the famous forts of Maharashtra?",
                "How is Vada Pav prepared?"
            ]

        return {
            "message": text,
            "conversation_id": conversation_id,
            "avatar_state": "speaking",
            "suggestions": suggestions
        }
