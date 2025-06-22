// import { useState, useEffect } from 'react'
// import { payoutStorage } from '../utils/payoutStorage'
// import { newsApi } from '../services/newsApi'
// import ExportOptions from '../components/export/ExportOptions'
// import Loading from '../components/common/Loading'

// function ExportData() {
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [dateRange, setDateRange] = useState({
//     start: '',
//     end: new Date().toISOString().split('T')[0]
//   })

//   useEffect(() => {
//     loadData()
//   }, [dateRange])

//   const loadData = async () => {
//     try {
//       setLoading(true)
      
//       // Load payout history
//       const payoutHistory = payoutStorage.getPayoutHistory()
      
//       // Load news articles
//       const newsResponse = await newsApi.searchNews('', {
//         dateFrom: dateRange.start,
//         dateTo: dateRange.end
//       })

//       // Combine data
//       const combinedData = {
//         payouts: payoutHistory,
//         articles: newsResponse.articles,
//         summary: {
//           totalPayouts: payoutHistory.reduce((sum, record) => sum + record.totalPayout, 0),
//           totalArticles: newsResponse.articles.length,
//           dateRange: dateRange
//         }
//       }

//       setData(combinedData)
//       setError(null)
//     } catch (err) {
//       setError('Failed to load export data')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h1 className="text-2xl font-bold mb-6">Export Data</h1>

//         {/* Date Range Filters */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

//         {error && (
//           <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//             {error}
//           </div>
//         )}

//         {loading ? (
//           <Loading />
//         ) : (
//           <>
//             {/* Data Preview */}
//             <div className="mb-6">
//               <h2 className="text-lg font-semibold mb-4">Data Preview</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="bg-gray-50 p-4 rounded">
//                   <p className="text-sm text-gray-600">Total Articles</p>
//                   <p className="text-2xl font-bold">{data.articles.length}</p>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded">
//                   <p className="text-sm text-gray-600">Total Payouts</p>
//                   <p className="text-2xl font-bold">${data.summary.totalPayouts}</p>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded">
//                   <p className="text-sm text-gray-600">Date Range</p>
//                   <p className="text-sm font-bold">
//                     {dateRange.start || 'All time'} to {dateRange.end}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Export Options */}
//             <ExportOptions data={data} />
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ExportData

import { useState, useEffect } from 'react';
import { getPayoutHistory } from '../utils/payoutStorage';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function ExportData() {
  const [payoutData, setPayoutData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPayoutData();
  }, []);

  const loadPayoutData = () => {
    try {
      const history = getPayoutHistory();
      setPayoutData(history);
    } catch (err) {
      setError('Failed to load payout data');
      console.error('Error loading payout data:', err);
    }
  };

  const exportToPDF = () => {
    try {
      setLoading(true);
      const doc = new jsPDF();

      doc.autoTable({
        head: [['Author', 'Articles', 'Blogs', 'Total Payout', 'Date']],
        body: payoutData.map(item => [
          item.authorName,
          item.articleCount,
          item.blogCount,
          `$${item.totalPayout}`,
          new Date(item.date).toLocaleDateString()
        ])
      });

      doc.save('payout-report.pdf');
    } catch (err) {
      setError('Failed to export PDF');
      console.error('PDF export error:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    try {
      setLoading(true);
      const ws = XLSX.utils.json_to_sheet(payoutData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Payouts');
      XLSX.writeFile(wb, 'payout-report.csv');
    } catch (err) {
      setError('Failed to export CSV');
      console.error('CSV export error:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportToGoogleSheets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // This is a placeholder - implement Google Sheets integration
      alert('Google Sheets integration coming soon!');
      
    } catch (err) {
      setError('Failed to export to Google Sheets');
      console.error('Google Sheets export error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Export Payout Data</h1>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {payoutData.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No payout data available to export
        </div>
      ) : (
        <div className="space-y-6">
          {/* Export Options */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Export Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={exportToPDF}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Exporting...' : 'Export as PDF'}
              </button>

              <button
                onClick={exportToCSV}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Exporting...' : 'Export as CSV'}
              </button>

              <button
                onClick={exportToGoogleSheets}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? 'Exporting...' : 'Export to Google Sheets'}
              </button>
            </div>
          </div>

          {/* Data Preview */}
          <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Data Preview</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Articles
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blogs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Payout
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payoutData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.authorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.articleCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.blogCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${item.totalPayout}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}