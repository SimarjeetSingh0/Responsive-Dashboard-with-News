// import { useState, useEffect } from 'react'
// import { useAuth } from '../../contexts/AuthContext'
// import { payoutStorage } from '../../utils/payoutStorage'
// import { newsApi } from '../../services/newsApi'

// function PayoutCalculator() {
//   const [payoutRates, setPayoutRates] = useState(payoutStorage.getPayoutRates())
//   const [articles, setArticles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedAuthor, setSelectedAuthor] = useState('')
//   const [dateRange, setDateRange] = useState({
//     start: '',
//     end: new Date().toISOString().split('T')[0]
//   })
//   const [error, setError] = useState(null)
//   const { currentUser } = useAuth()

//   useEffect(() => {
//     fetchArticles()
//   }, [selectedAuthor, dateRange])

//   const fetchArticles = async () => {
//     try {
//       setLoading(true)
//       const response = await newsApi.searchNews('', {
//         author: selectedAuthor,
//         dateFrom: dateRange.start,
//         dateTo: dateRange.end
//       })
//       setArticles(response.articles)
//       setError(null)
//     } catch (err) {
//       setError('Failed to fetch articles')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleRateChange = (type, value) => {
//     const newRates = { ...payoutRates, [type]: Number(value) }
//     setPayoutRates(newRates)
//     payoutStorage.setPayoutRates(newRates)
//   }

//   const calculatePayout = (articles) => {
//     return articles.reduce((total, article) => {
//       const rate = article.type === 'blog' ? payoutRates.blog : payoutRates.news
//       return total + rate
//     }, 0)
//   }

//   const handleSavePayout = () => {
//     const record = {
//       author: selectedAuthor,
//       articleCount: articles.length,
//       totalPayout: calculatePayout(articles),
//       dateRange: {
//         start: dateRange.start,
//         end: dateRange.end
//       }
//     }
//     payoutStorage.addPayoutRecord(record)
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-6">Payout Calculator</h2>

//       {/* Rate Settings */}
//       <div className="mb-8">
//         <h3 className="text-lg font-semibold mb-4">Payout Rates</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               News Article Rate ($)
//             </label>
//             <input
//               type="number"
//               value={payoutRates.news}
//               onChange={(e) => handleRateChange('news', e.target.value)}
//               className="w-full px-3 py-2 border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Blog Post Rate ($)
//             </label>
//             <input
//               type="number"
//               value={payoutRates.blog}
//               onChange={(e) => handleRateChange('blog', e.target.value)}
//               className="w-full px-3 py-2 border rounded-md"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="mb-8">
//         <h3 className="text-lg font-semibold mb-4">Calculate Payout</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Author
//             </label>
//             <input
//               type="text"
//               value={selectedAuthor}
//               onChange={(e) => setSelectedAuthor(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md"
//               placeholder="Enter author name"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Start Date
//             </label>
//             <input
//               type="date"
//               value={dateRange.start}
//               onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
//               className="w-full px-3 py-2 border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               End Date
//             </label>
//             <input
//               type="date"
//               value={dateRange.end}
//               onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
//               className="w-full px-3 py-2 border rounded-md"
//             />
//           </div>
//         </div>
//       </div>

//       {error && (
//         <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       )}

//       {/* Results */}
//       <div className="mb-8">
//         {loading ? (
//           <div className="text-center py-4">Loading...</div>
//         ) : (
//           <>
//             <h3 className="text-lg font-semibold mb-4">Results</h3>
//             <div className="bg-gray-50 p-4 rounded">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Articles</p>
//                   <p className="text-xl font-bold">{articles.length}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Total Payout</p>
//                   <p className="text-xl font-bold">${calculatePayout(articles)}</p>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Actions */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleSavePayout}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Save Payout Record
//         </button>
//       </div>
//     </div>
//   )
// }

// export default PayoutCalculator

import { useState, useEffect } from 'react';
import { getPayoutRates, savePayoutRates, savePayoutCalculation } from '../../utils/payoutStorage';

export default function PayoutCalculator() {
  // State for rates and form inputs
  const [rates, setRates] = useState(getPayoutRates());
  const [isEditingRates, setIsEditingRates] = useState(false);
  const [calculation, setCalculation] = useState({
    authorName: '',
    articleCount: 0,
    blogCount: 0
  });

  // State for results
  const [result, setResult] = useState(null);

  // Handle rate changes
  const handleRateChange = (type, value) => {
    const newRates = { ...rates, [type]: Number(value) };
    setRates(newRates);
  };

  // Save rate changes
  const handleSaveRates = () => {
    savePayoutRates(rates);
    setIsEditingRates(false);
  };

  // Handle calculation input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCalculation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate payout
  const calculatePayout = (e) => {
    e.preventDefault();
    
    const totalArticlePayout = calculation.articleCount * rates.article;
    const totalBlogPayout = calculation.blogCount * rates.blog;
    const totalPayout = totalArticlePayout + totalBlogPayout;

    const payoutResult = {
      ...calculation,
      articleRate: rates.article,
      blogRate: rates.blog,
      totalArticlePayout,
      totalBlogPayout,
      totalPayout,
      calculatedAt: new Date().toISOString()
    };

    setResult(payoutResult);
    savePayoutCalculation(payoutResult);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Rates Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Payout Rates</h2>
          <button
            onClick={() => setIsEditingRates(!isEditingRates)}
            className="text-blue-600 hover:text-blue-700"
          >
            {isEditingRates ? 'Cancel' : 'Edit Rates'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Article Rate ($)
            </label>
            <input
              type="number"
              value={rates.article}
              onChange={(e) => handleRateChange('article', e.target.value)}
              disabled={!isEditingRates}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blog Rate ($)
            </label>
            <input
              type="number"
              value={rates.blog}
              onChange={(e) => handleRateChange('blog', e.target.value)}
              disabled={!isEditingRates}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {isEditingRates && (
          <button
            onClick={handleSaveRates}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Rates
          </button>
        )}
      </div>

      {/* Calculator Form */}
      <form onSubmit={calculatePayout} className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Calculate Payout</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author Name
            </label>
            <input
              type="text"
              name="authorName"
              value={calculation.authorName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Articles
              </label>
              <input
                type="number"
                name="articleCount"
                value={calculation.articleCount}
                onChange={handleInputChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Blogs
              </label>
              <input
                type="number"
                name="blogCount"
                value={calculation.blogCount}
                onChange={handleInputChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Calculate Payout
          </button>
        </div>
      </form>

      {/* Results Section */}
      {result && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Payout Summary</h2>
          
          <div className="space-y-2">
            <p><strong>Author:</strong> {result.authorName}</p>
            <p><strong>Articles:</strong> {result.articleCount} × ${result.articleRate} = ${result.totalArticlePayout}</p>
            <p><strong>Blogs:</strong> {result.blogCount} × ${result.blogRate} = ${result.totalBlogPayout}</p>
            <div className="mt-4 pt-4 border-t">
              <p className="text-lg font-semibold">
                Total Payout: ${result.totalPayout}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}