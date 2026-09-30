import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Seed sample transactions for smooth initial view if server DB is fresh or offline
export const INITIAL_SAMPLE_TRANSACTIONS = [
  {
    _id: 'sample-1',
    title: 'Monthly Tech Salary',
    amount: 85000.0,
    type: 'income',
    category: 'Salary',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: 'sample-2',
    title: 'Apartment Rent',
    amount: 22000.0,
    type: 'expense',
    category: 'Rent',
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    _id: 'sample-3',
    title: 'Supermarket Grocery Shopping',
    amount: 4500.0,
    type: 'expense',
    category: 'Food',
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    _id: 'sample-4',
    title: 'Electricity & Wi-Fi Bill',
    amount: 2100.0,
    type: 'expense',
    category: 'Utilities',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    _id: 'sample-5',
    title: 'Freelance Design Project',
    amount: 15000.0,
    type: 'income',
    category: 'Other',
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    _id: 'sample-6',
    title: 'Movie & Dinner Outing',
    amount: 1850.0,
    type: 'expense',
    category: 'Entertainment',
    date: new Date().toISOString(),
  },
];

export const getTransactions = async () => {
  try {
    const response = await api.get('/transactions');
    if (response.data && response.data.success) {
      return { data: response.data.data, isMock: false };
    }
    throw new Error('API returned invalid structure');
  } catch (error) {
    console.warn('Backend API connection failed, using local storage fallback:', error.message);
    const local = localStorage.getItem('spendwise_transactions');
    if (local) {
      return { data: JSON.parse(local), isMock: true };
    }
    localStorage.setItem('spendwise_transactions', JSON.stringify(INITIAL_SAMPLE_TRANSACTIONS));
    return { data: INITIAL_SAMPLE_TRANSACTIONS, isMock: true };
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const response = await api.post('/transactions', transactionData);
    if (response.data && response.data.success) {
      return { data: response.data.data, isMock: false };
    }
    throw new Error('API creation failed');
  } catch (error) {
    console.warn('Backend API unavailable. Saving to local storage fallback.');
    const local = localStorage.getItem('spendwise_transactions');
    const existing = local ? JSON.parse(local) : INITIAL_SAMPLE_TRANSACTIONS;
    const newTx = {
      _id: 'local-' + Date.now(),
      ...transactionData,
      date: transactionData.date || new Date().toISOString(),
    };
    const updated = [newTx, ...existing];
    localStorage.setItem('spendwise_transactions', JSON.stringify(updated));
    return { data: newTx, isMock: true };
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await api.delete(`/transactions/${id}`);
    if (response.data && response.data.success) {
      return { success: true, isMock: false };
    }
    throw new Error('API delete failed');
  } catch (error) {
    console.warn('Backend API unavailable. Deleting from local storage fallback.');
    const local = localStorage.getItem('spendwise_transactions');
    const existing = local ? JSON.parse(local) : INITIAL_SAMPLE_TRANSACTIONS;
    const updated = existing.filter((item) => item._id !== id);
    localStorage.setItem('spendwise_transactions', JSON.stringify(updated));
    return { success: true, isMock: true };
  }
};

export default api;
