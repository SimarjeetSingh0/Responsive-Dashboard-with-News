// export const payoutStorage = {
//     getPayoutRates: () => {
//       const rates = localStorage.getItem('payoutRates')
//       return rates ? JSON.parse(rates) : {
//         news: 50,    // Default $50 per news article
//         blog: 100    // Default $100 per blog post
//       }
//     },
  
//     setPayoutRates: (rates) => {
//       localStorage.setItem('payoutRates', JSON.stringify(rates))
//     },
  
//     getPayoutHistory: () => {
//       const history = localStorage.getItem('payoutHistory')
//       return history ? JSON.parse(history) : []
//     },
  
//     addPayoutRecord: (record) => {
//       const history = payoutStorage.getPayoutHistory()
//       history.push({ ...record, date: new Date().toISOString() })
//       localStorage.setItem('payoutHistory', JSON.stringify(history))
//     }
//   }

// Constants
const PAYOUT_RATES_KEY = 'payoutRates';
const PAYOUT_HISTORY_KEY = 'payoutHistory';

// Get payout rates from localStorage
export const getPayoutRates = () => {
  const rates = localStorage.getItem(PAYOUT_RATES_KEY);
  return rates ? JSON.parse(rates) : {
    article: 50, // default rate for articles
    blog: 75,    // default rate for blogs
  };
};

// Save payout rates to localStorage
export const savePayoutRates = (rates) => {
  localStorage.setItem(PAYOUT_RATES_KEY, JSON.stringify(rates));
};

// Get payout history from localStorage
export const getPayoutHistory = () => {
  const history = localStorage.getItem(PAYOUT_HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

// Save payout calculation to history
export const savePayoutCalculation = (calculation) => {
  const history = getPayoutHistory();
  history.push({
    ...calculation,
    date: new Date().toISOString(),
  });
  localStorage.setItem(PAYOUT_HISTORY_KEY, JSON.stringify(history));
};