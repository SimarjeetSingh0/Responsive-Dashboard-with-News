// import { GOOGLE_CONFIG } from '../config/googleConfig'

// class GoogleSheetsService {
//   constructor() {
//     this.isInitialized = false
//   }

//   async init() {
//     if (this.isInitialized) return

//     await new Promise((resolve, reject) => {
//       const script = document.createElement('script')
//       script.src = 'https://apis.google.com/js/api.js'
//       script.onload = () => {
//         window.gapi.load('client:auth2', async () => {
//           try {
//             await window.gapi.client.init({
//               apiKey: GOOGLE_CONFIG.API_KEY,
//               clientId: GOOGLE_CONFIG.CLIENT_ID,
//               discoveryDocs: GOOGLE_CONFIG.DISCOVERY_DOCS,
//               scope: GOOGLE_CONFIG.SCOPES
//             })
//             this.isInitialized = true
//             resolve()
//           } catch (error) {
//             reject(error)
//           }
//         })
//       }
//       document.body.appendChild(script)
//     })
//   }

//   async createSpreadsheet(data) {
//     await this.init()
    
//     if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
//       await window.gapi.auth2.getAuthInstance().signIn()
//     }

//     // Create new spreadsheet
//     const response = await window.gapi.client.sheets.spreadsheets.create({
//       properties: {
//         title: `Payout Report - ${new Date().toLocaleDateString()}`
//       }
//     })

//     const spreadsheetId = response.result.spreadsheetId

//     // Prepare the data
//     const values = [
//       ['Date', 'Author', 'Article Count', 'Total Payout', 'Date Range'],
//       ...data.map(row => [
//         new Date(row.date).toLocaleDateString(),
//         row.author || 'All Authors',
//         row.articleCount,
//         row.totalPayout,
//         `${row.dateRange.start} to ${row.dateRange.end}`
//       ])
//     ]

//     // Update the spreadsheet with data
//     await window.gapi.client.sheets.spreadsheets.values.update({
//       spreadsheetId,
//       range: 'A1',
//       valueInputOption: 'USER_ENTERED',
//       resource: { values }
//     })

//     return `https://docs.google.com/spreadsheets/d/${spreadsheetId}`
//   }
// }

// export const googleSheetsService = new GoogleSheetsService()

import { google } from 'googleapis';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
const SCOPE = import.meta.env.VITE_GOOGLE_SHEETS_API_SCOPE;

// Initialize the Google Auth client
const auth = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'http://localhost:5173' // Must match your authorized redirect URI
);

export const initGoogleSheets = async () => {
  try {
    // Create the sheets client
    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
    throw error;
  }
};

export const exportToGoogleSheets = async (data) => {
  try {
    const sheets = await initGoogleSheets();
    const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;

    // Prepare the data
    const values = data.map(item => [
      item.author,
      item.articleCount,
      item.totalPayout,
      new Date(item.date).toLocaleDateString()
    ]);

    // Add headers
    values.unshift(['Author', 'Article Count', 'Total Payout', 'Date']);

    // Update the spreadsheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });

    return response.data;
  } catch (error) {
    console.error('Error exporting to Google Sheets:', error);
    throw error;
  }
};