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

export interface ApiResponseEnvelope<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface ChatApiResponseEnvelope {
  success: boolean;
  data?: {
    message: string;
    conversation_id: string;
    avatar_state?: 'idle' | 'thinking' | 'speaking' | 'happy' | 'curious' | 'surprised' | 'excited';
    suggestions?: string[];
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface ApiState {
  id: string;
  name: string;
  code: string;
  description: string;
  cultural_summary?: string;
  capital: string;
  region: string;
  languages: string[];
  theme: {
    primary_color: string;
    accent_color: string;
    banner_keyword?: string;
  };
  thumbnail_url?: string;
}

export interface ApiCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface ApiCultureCard {
  id: string;
  name: string;
  type: string;
  state_id: string;
  short_description: string;
  image_url?: string;
  tags?: string[];
}

export interface ApiCultureDetail {
  id: string;
  name: string;
  type: string;
  state_id: string;
  region?: string;
  short_description: string;
  description: string;
  origin?: string;
  history?: string;
  cultural_significance?: string;
  recipe?: {
    recipe_url?: string;
    ingredients?: string[];
    preparation_time?: string;
    difficulty?: string;
  };
  materials?: string[];
  techniques?: string[];
  timeline?: Array<{ year: string; event: string }>;
  image_url?: string;
  gallery_urls?: string[];
  tags?: string[];
  related_item_ids?: string[];
}

export interface ApiConnectionNode {
  id: string;
  name: string;
  type: string;
  relationship: string;
}

export interface ApiCultureConnections {
  center: ApiCultureCard;
  connections: ApiConnectionNode[];
}

export interface ApiMonumentHotspot {
  id: string;
  monument_id?: string;
  name: string;
  description: string;
  position: { x: number; y: number; z: number };
  annotation?: string;
  camera_position?: { x: number; y: number; z: number };
  camera_target?: { x: number; y: number; z: number };
}

export interface ApiMonumentSummary {
  id: string;
  name: string;
  state_id: string;
  location: string;
  built_year?: string;
  architecture?: string;
  has_3d_model: boolean;
  thumbnail_url?: string;
}

export interface ApiMonumentDetail {
  id: string;
  name: string;
  state_id: string;
  location: string;
  coordinates?: { latitude: number; longitude: number };
  built_year?: string;
  built_by?: string;
  architecture?: string;
  materials?: string[];
  history: string;
  description: string;
  has_3d_model: boolean;
  model_url?: string;
  thumbnail_url?: string;
  gallery_urls?: string[];
  hotspots?: ApiMonumentHotspot[];
  cultural_significance?: string;
  timeline?: Array<{ year: string; event: string }>;
  related_heritage_ids?: string[];
}

export interface ApiFestivalSummary {
  id: string;
  name: string;
  state_id?: string;
  states?: string[];
  month?: string;
  duration_days?: number;
  short_description: string;
  image_url?: string;
}

export interface ApiFestivalDetail {
  id: string;
  name: string;
  state_id?: string;
  states?: string[];
  month?: string;
  duration_days?: number;
  description: string;
  rituals?: string[];
  foods?: string[];
  significance?: string;
  image_url?: string;
  gallery_urls?: string[];
}

export interface ApiPassportStats {
  states_explored: number;
  foods_discovered: number;
  monuments_explored: number;
  art_forms_explored: number;
  festivals_viewed: number;
  total_discoveries: number;
}

export interface ApiDiscoveredItem {
  item_type: string;
  item_id: string;
  item_name?: string;
  state_id?: string;
  discovered_at?: string;
}

export interface ApiPassportData {
  stats: ApiPassportStats;
  discoveries: ApiDiscoveredItem[];
}

export interface ApiSurpriseData {
  state?: { id: string; name: string };
  category?: string;
  cultural_item?: {
    id: string;
    name: string;
    type: string;
    short_description: string;
    image_url?: string;
  };
}

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 
  ''
).replace(/\/$/, '');

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<ApiResponseEnvelope<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: {
          code: errorData?.error?.code || `HTTP_${response.status}`,
          message: errorData?.error?.message || errorData?.detail || `Request failed with status ${response.status}`,
        },
      };
    }

    const envelope: ApiResponseEnvelope<T> = await response.json();
    return envelope;
  } catch (err: any) {
    console.warn(`API Service failure on ${endpoint}:`, err?.message);
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: err?.message || 'Unable to connect to backend server.',
      },
    };
  }
}

/**
 * Centralized API Service for communicating with FastAPI Main Backend (:8000) & AI Gateway (:8001).
 */
export const api = {
  // Health
  async getHealth() {
    return fetchJson<{ status: string; service: string }>('/api/health');
  },

  // States
  async getStates() {
    return fetchJson<ApiState[]>('/api/states');
  },

  async getState(stateId: string) {
    return fetchJson<ApiState>(`/api/states/${encodeURIComponent(stateId)}`);
  },

  async getStateCategories(stateId: string) {
    return fetchJson<ApiCategory[]>(`/api/states/${encodeURIComponent(stateId)}/categories`);
  },

  async getStateCulture(stateId: string, categoryId?: string) {
    const query = categoryId && categoryId !== 'all' ? `?category=${encodeURIComponent(categoryId)}` : '';
    return fetchJson<ApiCultureCard[]>(`/api/states/${encodeURIComponent(stateId)}/culture${query}`);
  },

  // Categories
  async getCategories() {
    return fetchJson<ApiCategory[]>('/api/categories');
  },

  // Cultural Items
  async getCulturalItem(itemId: string) {
    return fetchJson<ApiCultureDetail>(`/api/culture/${encodeURIComponent(itemId)}`);
  },

  async getCulturalConnections(itemId: string) {
    return fetchJson<ApiCultureConnections>(`/api/culture/${encodeURIComponent(itemId)}/connections`);
  },

  // Monuments
  async getMonuments(stateId?: string) {
    const query = stateId ? `?state_id=${encodeURIComponent(stateId)}` : '';
    return fetchJson<ApiMonumentSummary[]>(`/api/monuments${query}`);
  },

  async getMonument(monumentId: string) {
    return fetchJson<ApiMonumentDetail>(`/api/monuments/${encodeURIComponent(monumentId)}`);
  },

  async getMonumentHotspots(monumentId: string) {
    return fetchJson<ApiMonumentHotspot[]>(`/api/monuments/${encodeURIComponent(monumentId)}/hotspots`);
  },

  // Festivals
  async getFestivals(stateId?: string) {
    const query = stateId && stateId !== 'all' ? `?state_id=${encodeURIComponent(stateId)}` : '';
    return fetchJson<ApiFestivalSummary[]>(`/api/festivals${query}`);
  },

  async getFestival(festivalId: string) {
    return fetchJson<ApiFestivalDetail>(`/api/festivals/${encodeURIComponent(festivalId)}`);
  },

  // Discovery / Surprise
  async getSurprise() {
    return fetchJson<ApiSurpriseData>('/api/discover/surprise');
  },

  // Passport
  async getPassport() {
    return fetchJson<ApiPassportData>('/api/passport');
  },

  async recordDiscovery(itemType: string, itemId: string) {
    return fetchJson<ApiPassportData>('/api/passport/discover', {
      method: 'POST',
      body: JSON.stringify({ item_type: itemType, item_id: itemId }),
    });
  },

  // AI Chat Gateway (routed to Port 8001 via Vite proxy)
  async postChat(payload: ChatApiRequestPayload): Promise<ChatApiResponseEnvelope> {
    const endpoint = `/api/ai/chat`;
    const res = await fetchJson<ChatApiResponseEnvelope['data']>(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!res.success) {
      return {
        success: false,
        error: res.error || {
          code: 'AI_UNAVAILABLE',
          message: 'Your cultural guide is temporarily unavailable.',
        },
      };
    }

    return {
      success: true,
      data: res.data,
    };
  },
};
