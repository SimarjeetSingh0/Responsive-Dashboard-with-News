import axios from 'axios'

// const API_KEY = 'YOUR_NEWS_API_KEY' // Get from NewsAPI.org
// const BASE_URL = 'https://newsapi.org/v2'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;

export const newsApi = {
  // Get top headlines (e.g., for the dashboard)
  getTopNews: async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
          country: 'us',
          pageSize: 10,
          page,
          apiKey: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top news:', error.message);
      throw error;
    }
  },

  // Search everything by query with optional filters
  searchNews: async (query, filters = {}) => {
    if (!query || query.trim() === '') {
      throw new Error('Search query is required (e.g., "sports", "finance", "AI").');
    }

    try {
      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          q: query,
          from: filters.dateFrom,
          to: filters.dateTo,
          sortBy: 'publishedAt',
          pageSize: 20,
          apiKey: API_KEY,
          ...filters,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching news:', error.message);
      throw error;
    }
  },
};