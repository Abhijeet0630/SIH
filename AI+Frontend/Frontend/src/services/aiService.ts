import { api, ChatApiRequestPayload, ChatApiResponseEnvelope } from './api';
import { MAHARASHTRA_CULTURAL_ITEMS } from '../data/maharashtraCulturalItems';
import { NORTHEAST_CULTURAL_ITEMS } from '../data/northeastCulturalItems';

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  avatarState?: 'idle' | 'thinking' | 'speaking' | 'happy' | 'curious' | 'surprised' | 'excited';
  suggestions?: string[];
  suggestedAction?: {
    label: string;
    route: string;
  };
  isError?: boolean;
  failedQuery?: string;
}

export interface AIQueryContext {
  stateId?: string;
  stateName?: string;
  categoryId?: string;
  categoryName?: string;
  itemTitle?: string;
  itemSlug?: string;
  routePath: string;
}

/**
 * Resolves full state names or IDs into standard state codes for API context.
 */
function resolveStateCode(stateInput?: string): string | undefined {
  if (!stateInput) return undefined;
  const lower = stateInput.toLowerCase();
  if (lower === 'mh' || lower === 'maharashtra') return 'mh';
  if (lower === 'as' || lower === 'assam') return 'as';
  if (lower === 'ml' || lower === 'meghalaya') return 'ml';
  return stateInput;
}

/**
 * Cultural AI Service abstraction bridging the React Chatbot UI
 * exclusively to the dedicated AI Microservice endpoint POST /api/ai/chat (Port 8001).
 */
class AICulturalService {
  private conversationId: string | null = null;

  /**
   * Retrieves current session's conversation ID.
   */
  getConversationId(): string | null {
    return this.conversationId;
  }

  /**
   * Manually sets or resets conversation ID.
   */
  setConversationId(id: string | null): void {
    this.conversationId = id;
  }

  /**
   * Resolves a matching internal route action pill if available based on UI catalog mapping.
   */
  private matchActionRoute(responseText: string, queryText: string): { label: string; route: string } | undefined {
    const qLower = queryText.toLowerCase();
    const rLower = responseText.toLowerCase();

    // 1. Cultural items from catalog (only if explicitly mentioned in query or response)
    const allItems = [...MAHARASHTRA_CULTURAL_ITEMS, ...NORTHEAST_CULTURAL_ITEMS];
    for (const item of allItems) {
      const titleLower = item.title.toLowerCase();
      if (qLower.includes(titleLower) || rLower.includes(titleLower)) {
        return { label: `Explore ${item.title}`, route: `/item/${item.slug}` };
      }
    }

    // 2. Monuments
    if (qLower.includes('gateway of india') || (rLower.includes('gateway of india') && !qLower.includes('idli'))) {
      return { label: 'Launch Gateway of India 3D Model', route: '/monument/gateway-of-india' };
    }
    if (qLower.includes('ellora') || qLower.includes('kailasa') || rLower.includes('kailasa temple')) {
      return { label: 'Explore Kailasa Temple 3D Model', route: '/monument/ellora-caves' };
    }

    // 3. Festivals
    if (qLower.includes('gudi padwa') || qLower.includes('bihu') || qLower.includes('festival calendar')) {
      return { label: 'Open Cultural Festival Calendar', route: '/festivals' };
    }

    // 4. Explicit State Atlas Exploration (Only when query explicitly targets that state)
    if (/\bmaharashtra\b/.test(qLower) && !/\b(idli|dosa|sambar|assam|meghalaya)\b/.test(qLower)) {
      return { label: 'Open Maharashtra Spatial Atlas', route: '/state/maharashtra' };
    }
    if (/\bassam\b/.test(qLower) && !/\b(idli|dosa|sambar|maharashtra)\b/.test(qLower)) {
      return { label: 'Open Assam Spatial Atlas', route: '/state/assam' };
    }
    if (/\bmeghalaya\b/.test(qLower)) {
      return { label: 'Open Meghalaya Spatial Atlas', route: '/state/meghalaya' };
    }

    return undefined;
  }

  /**
   * Primary method to send user message to AI Service endpoint POST /api/ai/chat (Port 8001).
   */
  async sendMessage(query: string, context?: AIQueryContext): Promise<AIChatMessage> {
    const stateCode = resolveStateCode(context?.stateId || context?.stateName);
    const category = context?.categoryId && context.categoryId !== 'all' ? context.categoryId : undefined;
    const itemId = context?.itemSlug || (context?.itemTitle ? context.itemTitle.toLowerCase().replace(/\s+/g, '-') : undefined);
    const viewPath = context?.routePath || '/';

    const payload: ChatApiRequestPayload = {
      message: query,
      conversation_id: this.conversationId,
      context: {
        state_id: stateCode,
        category: category,
        item_id: itemId,
        view: viewPath,
      },
    };

    // 1. Call dedicated AI microservice endpoint (POST /api/ai/chat on Port 8001)
    const envelope: ChatApiResponseEnvelope = await api.postChat(payload);

    if (envelope.success && envelope.data) {
      // Preserve conversation_id from backend response across multi-turn sessions
      if (envelope.data.conversation_id) {
        this.conversationId = envelope.data.conversation_id;
      }

      const responseText = envelope.data.message || '';
      const suggestedAction = this.matchActionRoute(responseText, query);

      return {
        id: 'ai-msg-' + Date.now(),
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatarState: envelope.data.avatar_state || 'speaking',
        suggestions: envelope.data.suggestions || [],
        suggestedAction,
      };
    }

    // 2. If AI microservice is unreachable, return graceful error state with retry option
    return {
      id: 'ai-msg-' + Date.now(),
      sender: 'assistant',
      text: envelope.error?.message || 'Your cultural guide is temporarily unavailable.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatarState: 'idle',
      isError: true,
      failedQuery: query,
    };
  }
}

export const aiService = new AICulturalService();
