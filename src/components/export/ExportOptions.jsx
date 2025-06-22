// import { useState } from 'react'
// import { exportService } from '../../services/exportService'

// function ExportOptions({ data }) {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)

//   const handleExport = async (format) => {
//     try {
//       setLoading(true)
//       setError(null)
//       setSuccess(null)

//       let result
//       switch (format) {
//         case 'pdf':
//           result = await exportService.toPDF(data)
//           setSuccess('PDF exported successfully')
//           break
//         case 'csv':
//           result = await exportService.toCSV(data)
//           setSuccess('CSV exported successfully')
//           break
//         case 'sheets':
//           result = await exportService.toGoogleSheets(data)
//           setSuccess('Data exported to Google Sheets successfully')
//           break
//         default:
//           throw new Error('Unsupported export format')
//       }

//       if (result && result.url) {
//         window.open(result.url, '_blank')
//       }
//     } catch (err) {
//       setError(`Export failed: ${err.message}`)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <h2 className="text-xl font-semibold mb-4">Export Options</h2>

//       {error && (
//         <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       )}

//       {success && (
//         <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
//           {success}
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <button
//           onClick={() => handleExport('pdf')}
//           disabled={loading}
//           className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
//         >
//           {loading ? 'Exporting...' : 'Export as PDF'}
//         </button>

//         <button
//           onClick={() => handleExport('csv')}
//           disabled={loading}
//           className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
//         >
//           {loading ? 'Exporting...' : 'Export as CSV'}
//         </button>

//         <button
//           onClick={() => handleExport('sheets')}
//           disabled={loading}
//           className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//         >
//           {loading ? 'Exporting...' : 'Export to Google Sheets'}
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ExportOptions

import { useState } from 'react';
import exportService from '../../services/exportService';

export default function ExportOptions({ data }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExport = async (type) => {
    try {
      setLoading(true);
      setError(null);

      switch (type) {
        case 'pdf':
          exportService.exportToPDF(data);
          break;
        
        case 'csv':
          exportService.exportToCSV(data);
          break;
        
        default:
          throw new Error('Invalid export type');
      }
    } catch (err) {
      setError(err.message);
      console.error('Export error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Export Options</h2>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PDF Export */}
        <button
          onClick={() => handleExport('pdf')}
          disabled={loading}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Exporting...' : 'Export as PDF'}
        </button>

        {/* CSV Export */}
        <button
          onClick={() => handleExport('csv')}
          disabled={loading}
          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Exporting...' : 'Export as CSV'}
        </button>
      </div>
    </div>
  );
}