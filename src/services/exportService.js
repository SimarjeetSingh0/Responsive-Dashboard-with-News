// import { jsPDF } from 'jspdf'
// import * as XLSX from 'xlsx'
// import { googleSheetsService } from './googleSheetsService'

// export const exportService = {
//   toPDF: async (data) => {
//     const doc = new jsPDF()
    
//     // Add title
//     doc.setFontSize(16)
//     doc.text('News Analytics Report', 20, 20)
    
//     // Add date
//     doc.setFontSize(12)
//     doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30)
    
//     // Add summary
//     doc.setFontSize(14)
//     doc.text('Summary', 20, 45)
//     doc.setFontSize(12)
//     doc.text(`Total Articles: ${data.articles.length}`, 25, 55)
//     doc.text(`Total Payouts: $${data.summary.totalPayouts}`, 25, 65)
//     doc.text(`Date Range: ${data.summary.dateRange.start} to ${data.summary.dateRange.end}`, 25, 75)

//     // Save the PDF
//     doc.save('news-analytics-report.pdf')
    
//     return { success: true }
//   },

//   toCSV: async (data) => {
//     // Prepare data for export
//     const exportData = [
//       ['Date', 'Author', 'Title', 'Type', 'Payout'],
//       ...data.articles.map(article => [
//         new Date(article.publishedAt).toLocaleDateString(),
//         article.author,
//         article.title,
//         article.type,
//         article.payout
//       ])
//     ]

//     // Create worksheet
//     const ws = XLSX.utils.aoa_to_sheet(exportData)
//     const wb = XLSX.utils.book_new()
//     XLSX.utils.book_append_sheet(wb, ws, 'News Data')

//     // Generate and download file
//     XLSX.writeFile(wb, 'news-analytics-export.xlsx')
    
//     return { success: true }
//   },

//   toGoogleSheets: async (data) => {
//     try {
//       const spreadsheetUrl = await googleSheetsService.createSpreadsheet(data)
//       return { success: true, url: spreadsheetUrl }
//     } catch (error) {
//       console.error('Export to Google Sheets failed:', error)
//       throw error
//     }
//   }
// }

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Export to PDF
const exportToPDF = (data, filename = 'payout-report') => {
  const doc = new jsPDF();
  
  doc.autoTable({
    head: [['Author', 'Article Count', 'Total Payout', 'Date']],
    body: data.map(item => [
      item.author,
      item.articleCount,
      `$${item.totalPayout.toFixed(2)}`,
      new Date(item.date).toLocaleDateString()
    ])
  });

  doc.save(`${filename}.pdf`);
};

// Export to CSV
const exportToCSV = (data, filename = 'payout-report') => {
  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Payouts');
  
  // Generate and download file
  XLSX.writeFile(wb, `${filename}.csv`);
};

// Export service object
const exportService = {
  exportToPDF,
  exportToCSV
};

export default exportService;