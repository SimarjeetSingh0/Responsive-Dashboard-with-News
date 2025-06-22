import { useState, useEffect } from 'react'
import { newsApi } from '../services/newsApi'
import SearchBar from '../components/dashboard/SearchBar'
import FilterPanel from '../components/dashboard/FilterPanel'
import NewsCard from '../components/dashboard/NewsCard'
import Loading from '../components/common/Loading'
import { useAuth } from '../contexts/AuthContext'

function Dashboard() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    author: '',
    type: 'all'
  })
  const { currentUser } = useAuth()

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await newsApi.getTopNews()
      setNews(response.articles)
      setError(null)
    } catch (err) {
      setError('Failed to fetch news. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (searchTerm) => {
    try {
      setLoading(true)
      const response = await newsApi.searchNews(searchTerm, filters)
      setNews(response.articles)
      setError(null)
    } catch (err) {
      setError('Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">News Dashboard</h1>
        
        <div className="space-y-4">
          <SearchBar onSearch={handleSearch} />
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <Loading />
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard