// import { useState, useEffect } from 'react'
// import { Line, Pie, Bar } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js'
// import { newsApi } from '../services/newsApi'

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// )

// function NewsAnalytics() {
//   const [articles, setArticles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [timeframe, setTimeframe] = useState('week') // week, month, year

//   useEffect(() => {
//     fetchArticles()
//   }, [timeframe])

//   const fetchArticles = async () => {
//     try {
//       setLoading(true)
//       const response = await newsApi.searchNews('', {
//         from: getStartDate(),
//         to: new Date().toISOString()
//       })
//       setArticles(response.articles)
//       setError(null)
//     } catch (err) {
//       setError('Failed to fetch analytics data')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getStartDate = () => {
//     const date = new Date()
//     switch (timeframe) {
//       case 'week':
//         date.setDate(date.getDate() - 7)
//         break
//       case 'month':
//         date.setMonth(date.getMonth() - 1)
//         break
//       case 'year':
//         date.setFullYear(date.getFullYear() - 1)
//         break
//     }
//     return date.toISOString()
//   }

//   const prepareArticlesByDateData = () => {
//     const grouped = articles.reduce((acc, article) => {
//       const date = new Date(article.publishedAt).toLocaleDateString()
//       acc[date] = (acc[date] || 0) + 1
//       return acc
//     }, {})

//     return {
//       labels: Object.keys(grouped),
//       datasets: [{
//         label: 'Articles Published',
//         data: Object.values(grouped),
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1
//       }]
//     }
//   }

//   const prepareArticlesByAuthorData = () => {
//     const grouped = articles.reduce((acc, article) => {
//       const author = article.author || 'Unknown'
//       acc[author] = (acc[author] || 0) + 1
//       return acc
//     }, {})

//     return {
//       labels: Object.keys(grouped),
//       datasets: [{
//         data: Object.values(grouped),
//         backgroundColor: [
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56',
//           '#4BC0C0',
//           '#9966FF'
//         ]
//       }]
//     }
//   }

//   const prepareArticlesByTypeData = () => {
//     const grouped = articles.reduce((acc, article) => {
//       const type = article.type || 'news'
//       acc[type] = (acc[type] || 0) + 1
//       return acc
//     }, {})

//     return {
//       labels: Object.keys(grouped),
//       datasets: [{
//         label: 'Articles by Type',
//         data: Object.values(grouped),
//         backgroundColor: ['#36A2EB', '#FF6384']
//       }]
//     }
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">News Analytics</h1>

//       {/* Timeframe Selection */}
//       <div className="mb-6">
//         <select
//           value={timeframe}
//           onChange={(e) => setTimeframe(e.target.value)}
//           className="px-4 py-2 border rounded-md"
//         >
//           <option value="week">Last Week</option>
//           <option value="month">Last Month</option>
//           <option value="year">Last Year</option>
//         </select>
//       </div>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Articles Over Time */}
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h2 className="text-lg font-semibold mb-4">Articles Over Time</h2>
//             <Line data={prepareArticlesByDateData()} />
//           </div>

//           {/* Articles by Author */}
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h2 className="text-lg font-semibold mb-4">Articles by Author</h2>
//             <Pie data={prepareArticlesByAuthorData()} />
//           </div>

//           {/* Articles by Type */}
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h2 className="text-lg font-semibold mb-4">Articles by Type</h2>
//             <Bar data={prepareArticlesByTypeData()} />
//           </div>

//           {/* Summary Statistics */}
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h2 className="text-lg font-semibold mb-4">Summary Statistics</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-gray-600">Total Articles</p>
//                 <p className="text-2xl font-bold">{articles.length}</p>
//               </div>
//               <div>
//                 <p className="text-gray-600">Unique Authors</p>
//                 <p className="text-2xl font-bold">
//                   {new Set(articles.map(a => a.author)).size}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-600">Average Articles/Day</p>
//                 <p className="text-2xl font-bold">
//                   {(articles.length / (timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 365)).toFixed(1)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default NewsAnalytics


import { useState, useEffect } from 'react'
import { newsApi } from '../services/newsApi'
import ArticleChart from '../components/charts/ArticleChart'
import AuthorChart from '../components/charts/AuthorChart'
import Loading from '../components/common/Loading'

function NewsAnalytics() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeframe, setTimeframe] = useState('week')
  const [articleData, setArticleData] = useState({ labels: [], values: [] })
  const [authorData, setAuthorData] = useState({ labels: [], values: [] })

  useEffect(() => {
    fetchAnalyticsData()
  }, [timeframe])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      const response = await newsApi.searchNews('', {
        from: getStartDate(),
        to: new Date().toISOString()
      })

      processArticleData(response.articles)
      processAuthorData(response.articles)
      setError(null)
    } catch (err) {
      setError('Failed to fetch analytics data')
    } finally {
      setLoading(false)
    }
  }

  const getStartDate = () => {
    const date = new Date()
    switch (timeframe) {
      case 'week':
        date.setDate(date.getDate() - 7)
        break
      case 'month':
        date.setMonth(date.getMonth() - 1)
        break
      case 'year':
        date.setFullYear(date.getFullYear() - 1)
        break
      default:
        date.setDate(date.getDate() - 7)
    }
    return date.toISOString()
  }

  const processArticleData = (articles) => {
    const dateGroups = {}
    articles.forEach(article => {
      const date = new Date(article.publishedAt).toLocaleDateString()
      dateGroups[date] = (dateGroups[date] || 0) + 1
    })

    setArticleData({
      labels: Object.keys(dateGroups),
      values: Object.values(dateGroups)
    })
  }

  const processAuthorData = (articles) => {
    const authorGroups = {}
    articles.forEach(article => {
      const author = article.author || 'Unknown'
      authorGroups[author] = (authorGroups[author] || 0) + 1
    })

    setAuthorData({
      labels: Object.keys(authorGroups),
      values: Object.values(authorGroups)
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">News Analytics</h1>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArticleChart data={articleData} />
            <AuthorChart data={authorData} />
            
            {/* Summary Statistics */}
            <div className="bg-white p-6 rounded-lg shadow col-span-2">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Total Articles</p>
                  <p className="text-2xl font-bold">
                    {articleData.values.reduce((a, b) => a + b, 0)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Unique Authors</p>
                  <p className="text-2xl font-bold">
                    {authorData.labels.length}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Average Articles/Day</p>
                  <p className="text-2xl font-bold">
                    {(articleData.values.reduce((a, b) => a + b, 0) / articleData.labels.length).toFixed(1)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Most Active Author</p>
                  <p className="text-2xl font-bold">
                    {authorData.labels[authorData.values.indexOf(Math.max(...authorData.values))]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsAnalytics