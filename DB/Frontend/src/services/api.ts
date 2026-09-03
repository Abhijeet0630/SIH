export interface ChatApiContextPayload {
  state_id?: string;
  category?: string;
  item_id?: string;
  view: string;
}

export interface ChatApiRequestPayload {
  message: string;
  conversation_id?: string | null;
  context: ChatApiContextPayload;
}

export interface ChatApiResponseEnvelope {
  success: boolean;
  data?: {
    message: string;
    conversation_id: string;
    avatar_state?: 'idle' | 'thinking' | 'speaking';
    suggestions?: string[];
  };
  error?: {
    code: string;
    message: string;
  };
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

/**
 * Centralized API Service for communicating with backend FastAPI endpoints.
 */
export const api = {
  /**
   * Calls POST /api/ai/chat
   */
  async postChat(payload: ChatApiRequestPayload): Promise<ChatApiResponseEnvelope> {
    const endpoint = `${API_BASE_URL}/api/ai/chat`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: {
            code: `HTTP_${response.status}`,
            message: errorData?.error?.message || errorData?.detail || 'Your cultural guide is temporarily unavailable.',
          },
        };
      }

      const envelope: ChatApiResponseEnvelope = await response.json();
      return envelope;
    } catch (err: any) {
      console.warn('API Service: Connection failure on POST /api/ai/chat:', err?.message);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Your cultural guide is temporarily unavailable.',
        },
      };
    }
  },
};
