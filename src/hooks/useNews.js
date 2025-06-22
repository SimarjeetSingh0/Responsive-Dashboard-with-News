import { useState, useEffect } from 'react';
import { getTopHeadlines, searchNews } from '../services/newsApi';

export const useNews = (initialQuery = '') => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data;
        if (query) {
          data = await searchNews(query);
        } else {
          data = await getTopHeadlines();
        }

        if (data.status === 'error') {
          throw new Error(data.message);
        }

        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query]);

  const searchArticles = (newQuery) => {
    setQuery(newQuery);
  };

  const refreshNews = () => {
    setQuery(query); // This will trigger the useEffect
  };

  return {
    articles,
    loading,
    error,
    searchArticles,
    refreshNews,
    query
  };
};