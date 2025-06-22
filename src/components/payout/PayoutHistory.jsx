// import { useState, useEffect } from 'react'
// import { payoutStorage } from '../../utils/payoutStorage'

// function PayoutHistory() {
//   const [history, setHistory] = useState([])

//   useEffect(() => {
//     loadHistory()
//   }, [])

//   const loadHistory = () => {
//     const payoutHistory = payoutStorage.getPayoutHistory()
//     setHistory(payoutHistory)
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow mt-6">
//       <h2 className="text-xl font-semibold mb-4">Payout History</h2>
      
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Author
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Articles
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Total Payout
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date Range
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {history.map((record, index) => (
//               <tr key={index}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {new Date(record.date).toLocaleDateString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {record.author || 'All Authors'}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {record.articleCount}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   ${record.totalPayout}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {record.dateRange.start} to {record.dateRange.end}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {history.length === 0 && (
//         <div className="text-center py-4 text-gray-500">
//           No payout history available
//         </div>
//       )}
//     </div>
//   )
// }

// export default PayoutHistory

import { useState, useEffect } from 'react';
import { getPayoutHistory } from '../../utils/payoutStorage';

export default function PayoutHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getPayoutHistory());
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Payout History</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {history.map((record, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(record.calculatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.authorName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.articleCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.blogCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${record.totalPayout}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}