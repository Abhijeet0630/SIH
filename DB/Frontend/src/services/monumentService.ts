import { MonumentData } from '../types/monument';
import { MONUMENTS_DATA } from '../data/monuments';

/**
 * Monument Service Layer
 * 
 * Decoupled data-access layer for 3D Monument exploration.
 * Structured to seamlessly switch between local archival fallback data
 * and live backend REST/GraphQL endpoints when available.
 */
class MonumentService {
  private static instance: MonumentService;
  private baseUrl: string = (import.meta.env.VITE_API_URL as string) || '';

  private constructor() {}

  public static getInstance(): MonumentService {
    if (!MonumentService.instance) {
      MonumentService.instance = new MonumentService();
    }
    return MonumentService.instance;
  }

  /**
   * Fetch all registered cultural monuments
   */
  public async getMonuments(): Promise<MonumentData[]> {
    try {
      if (this.baseUrl) {
        const res = await fetch(`${this.baseUrl}/api/monuments`);
        if (res.ok) {
          const json = await res.json();
          return json.data || json;
        }
      }
    } catch {
      // Gracefully fall back to local archival dataset
    }

    return Object.values(MONUMENTS_DATA);
  }

  /**
   * Fetch a single monument by its unique identifier or slug
   */
  public async getMonumentById(idOrSlug: string): Promise<MonumentData | null> {
    const normalized = idOrSlug.toLowerCase().trim();

    try {
      if (this.baseUrl) {
        const res = await fetch(`${this.baseUrl}/api/monuments/${normalized}`);
        if (res.ok) {
          const json = await res.json();
          return json.data || json;
        }
      }
    } catch {
      // Gracefully fall back to local archival dataset
    }

    // Lookup in local data
    if (MONUMENTS_DATA[normalized]) {
      return MONUMENTS_DATA[normalized];
    }

    const found = Object.values(MONUMENTS_DATA).find(
      (m) => m.slug === normalized || m.id === normalized
    );

    return found || null;
  }

  /**
   * Alias for getMonumentById
   */
  public async getMonumentBySlug(slug: string): Promise<MonumentData | null> {
    return this.getMonumentById(slug);
  }

  /**
   * Fetch 3D model status and URL for a specific monument
   */
  public async getMonument3DModel(
    id: string
  ): Promise<{ modelUrl: string | null; modelAvailable: boolean }> {
    const monument = await this.getMonumentById(id);
    if (!monument) {
      return { modelUrl: null, modelAvailable: false };
    }

    const hasValidUrl = typeof monument.modelUrl === 'string' && monument.modelUrl.trim().length > 0;
    return {
      modelUrl: hasValidUrl ? monument.modelUrl : null,
      modelAvailable: Boolean(monument.modelAvailable && hasValidUrl)
    };
  }

  /**
   * Fetch monuments located within a specific state
   */
  public async getMonumentsByState(stateId: string): Promise<MonumentData[]> {
    const all = await this.getMonuments();
    return all.filter((m) => m.stateId.toLowerCase() === stateId.toLowerCase());
  }

  /**
   * Helper to check if a 3D model is genuinely ready to load
   */
  public isModelAvailable(monument: MonumentData | null | undefined): boolean {
    if (!monument) return false;
    return Boolean(
      monument.modelAvailable &&
      typeof monument.modelUrl === 'string' &&
      monument.modelUrl.trim().length > 0
    );
  }
}

export const monumentService = MonumentService.getInstance();
