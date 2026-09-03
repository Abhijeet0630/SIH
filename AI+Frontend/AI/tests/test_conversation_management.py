import pytest
from app.schemas.chat import ChatContext
from app.services.conversation_service import (
    ConversationService,
    InMemoryConversationStorage,
    ConversationStorageInterface
)

def test_conversation_creation():
    """Tests session creation auto-generates ID when None or empty."""
    service = ConversationService()
    conv_id1 = service.get_or_create_conversation_id()
    assert conv_id1.startswith("conv_")
    
    conv_id2 = service.get_or_create_conversation_id("custom_id_123")
    assert conv_id2 == "custom_id_123"

def test_conversation_continuation_and_history():
    """Tests message history tracking across multiple turns."""
    service = ConversationService()
    conv_id = service.get_or_create_conversation_id("conv_turn_test")

    # Turn 1
    service.add_message(conv_id, "user", "Tell me about Vada Pav")
    service.add_message(conv_id, "assistant", "Vada Pav is an iconic Maharashtrian snack.")
    
    history1 = service.get_history(conv_id)
    assert len(history1) == 2
    assert history1[0] == {"role": "user", "content": "Tell me about Vada Pav"}
    assert history1[1] == {"role": "assistant", "content": "Vada Pav is an iconic Maharashtrian snack."}

    # Turn 2
    service.add_message(conv_id, "user", "Where did it originate?")
    service.add_message(conv_id, "assistant", "It originated in Dadar, Mumbai in the 1960s.")

    history2 = service.get_history(conv_id)
    assert len(history2) == 4
    assert history2[2]["content"] == "Where did it originate?"
    assert history2[3]["content"] == "It originated in Dadar, Mumbai in the 1960s."

def test_context_persistence_across_turns():
    """Tests that ChatContext persists across session turns."""
    service = ConversationService()
    conv_id = service.get_or_create_conversation_id("conv_context_persist")

    ctx = ChatContext(state_id="mh", category="food", item_id="vada-pav", view="/item/vada-pav")
    service.set_context(conv_id, ctx)

    retrieved = service.get_context(conv_id)
    assert retrieved is not None
    assert retrieved.state_id == "mh"
    assert retrieved.item_id == "vada-pav"

def test_conversation_isolation():
    """Verifies strict memory isolation between different conversations."""
    service = ConversationService()
    conv_a = service.get_or_create_conversation_id("conv_A")
    conv_b = service.get_or_create_conversation_id("conv_B")

    service.add_message(conv_a, "user", "Message for A")
    service.add_message(conv_b, "user", "Message for B")

    history_a = service.get_history(conv_a)
    history_b = service.get_history(conv_b)

    assert len(history_a) == 1
    assert history_a[0]["content"] == "Message for A"
    
    assert len(history_b) == 1
    assert history_b[0]["content"] == "Message for B"
    
    assert history_a != history_b

def test_clear_session():
    """Tests clearing/deleting a conversation session."""
    service = ConversationService()
    conv_id = service.get_or_create_conversation_id("conv_delete")
    service.add_message(conv_id, "user", "Sample message")
    
    assert len(service.get_history(conv_id)) == 1
    cleared = service.clear_session(conv_id)
    assert cleared is True
    assert len(service.get_history(conv_id)) == 0

def test_storage_interface_abstraction():
    """Verifies InMemoryConversationStorage implements ConversationStorageInterface."""
    storage = InMemoryConversationStorage()
    assert isinstance(storage, ConversationStorageInterface)
