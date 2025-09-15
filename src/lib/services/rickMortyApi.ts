import { ApiResponse, Character, CharacterFilters } from '@/lib/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_RICK_MORTY_API_URL;

class RickMortyApiService {
  private buildUrl(endpoint: string, params: Record<string, string | number> = {}): string {
    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value.toString());
      }
    });
    
    return url.toString();
  }

  async getCharacters(page: number = 1, filters: CharacterFilters = {}): Promise<ApiResponse> {
    try {
      const params: Record<string, string | number> = { page };
      
      if (filters.name) params.name = filters.name;

      const url = this.buildUrl('character', params);
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            info: {
              count: 0,
              pages: 0,
              next: null,
              prev: null
            },
            results: []
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
  }

  getPageFromUrl(url: string | null): number | null {
    if (!url) return null;
    
    try {
      const urlObj = new URL(url);
      const page = urlObj.searchParams.get('page');
      return page ? parseInt(page, 10) : null;
    } catch {
      return null;
    }
  }
}

export const rickMortyApi = new RickMortyApiService();
