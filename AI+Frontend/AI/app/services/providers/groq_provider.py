import logging
import requests
from typing import Dict, Any, List, Optional
from app.core.config import settings
from app.services.providers.base import AIServiceInterface
from app.prompts.cultural_guide import CULTURAL_GUIDE_SYSTEM_PROMPT

logger = logging.getLogger("bharat_ai.provider.groq")

class GroqProvider(AIServiceInterface):
    """
    Groq LLM provider implementation supporting dynamic Groq API key injection,
    configurable model selection (default qwen/qwen3.8-27b), multi-turn history propagation,
    and secret-safe diagnostics.
    """

    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None):
        self.api_key = (api_key or "").strip()
        self.model = model or settings.GROQ_MODEL or "qwen/qwen3.8-27b"

    async def generate_chat_response(
        self, 
        message: str, 
        conversation_id: str, 
        context_str: str,
        history: Optional[List[dict]] = None,
        api_key: Optional[str] = None,
        slot_id: Optional[int] = None
    ) -> Optional[Dict[str, Any]]:
        effective_key = (api_key if api_key is not None else self.api_key).strip()
        slot_label = slot_id if slot_id is not None else 1

        if not effective_key or effective_key.startswith("your_"):
            logger.info("[PROVIDER_SKIPPED] Groq key slot %s", slot_label)
            return None

        # Build messages array propagating system prompt and multi-turn history
        messages = [{"role": "system", "content": CULTURAL_GUIDE_SYSTEM_PROMPT}]

        if history:
            for h in history:
                role = "user" if h.get("role") == "user" else "assistant"
                content_text = h.get("content", "").strip()
                if content_text:
                    messages.append({"role": role, "content": content_text})

        full_prompt = f"{message}{context_str}"
        messages.append({"role": "user", "content": full_prompt})

        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": 0.7,
            "max_tokens": 2048
        }

        headers = {
            "Authorization": f"Bearer {effective_key}",
            "Content-Type": "application/json"
        }

        endpoint = "https://api.groq.com/openai/v1/chat/completions"

        try:
            resp = requests.post(endpoint, json=payload, headers=headers, timeout=settings.PROVIDER_TIMEOUT_SECONDS)
            if resp.status_code == 200:
                data = resp.json()
                choices = data.get("choices", [])
                if choices:
                    msg_obj = choices[0].get("message", {})
                    text = msg_obj.get("content", "")
                    if text:
                        logger.info("[PROVIDER_SUCCESS] Groq key slot %s", slot_label)
                        return {
                            "message": text.strip(),
                            "conversation_id": conversation_id,
                            "avatar_state": "speaking",
                            "suggestions": self._derive_suggestions(message, text)
                        }
            elif resp.status_code == 404:
                # Sanitize error message from response body
                err_msg = "Model or endpoint not found"
                try:
                    err_data = resp.json().get("error", {})
                    if isinstance(err_data, dict) and err_data.get("message"):
                        err_msg = err_data["message"]
                except Exception:
                    pass
                logger.error("[PROVIDER_HTTP_ERROR] Groq key slot %s | Status: 404 | Error: %s | Endpoint: chat/completions", slot_label, err_msg)
                return {"error_type": "config_404", "status_code": 404, "message": err_msg}
            elif resp.status_code in (401, 403):
                logger.warning("[PROVIDER_HTTP_ERROR] Groq key slot %s | Status: %s | Auth Failure", slot_label, resp.status_code)
                return {"error_type": "auth_error", "status_code": resp.status_code}
            elif resp.status_code == 429:
                logger.warning("[PROVIDER_RATE_LIMITED] Groq key slot %s", slot_label)
                return {"error_type": "rate_limit", "status_code": 429}
            else:
                logger.warning("[PROVIDER_FAILURE] Groq key slot %s | Status: %s", slot_label, resp.status_code)
                return {"error_type": "http_error", "status_code": resp.status_code}
        except requests.exceptions.Timeout:
            logger.error("[PROVIDER_FAILURE] Groq key slot %s | Timeout", slot_label)
            return {"error_type": "timeout"}
        except requests.exceptions.RequestException as exc:
            logger.error("[PROVIDER_FAILURE] Groq key slot %s | Exception: %s", slot_label, type(exc).__name__)
            return {"error_type": "network_error"}
        except Exception as exc:
            logger.error("[PROVIDER_FAILURE] Groq key slot %s | Error: %s", slot_label, type(exc).__name__)
            return {"error_type": "unknown_error"}

        return None

    def _derive_suggestions(self, message: str, response_text: str) -> List[str]:
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
                "Where is the double-decker root bridge?",
                "How long do root bridges survive?",
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
                "Where is Raigad Fort located?",
                "How many gates are there on Raigad Fort?",
                "Tell me about the coronation of Shivaji Maharaj at Raigad"
            ]
        if "food" in lower or "dish" in lower or "recipe" in lower:
            return [
                "What are famous regional dishes of India?",
                "Tell me about traditional festive recipes",
                "What street foods are popular here?"
            ]
        return [
            "What are the famous forts of Maharashtra?",
            "Tell me about Paithani Saree heritage",
            "Show 3D Gateway of India model"
        ]
