import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import TransactionFormModal from './components/TransactionFormModal';
import TransactionList from './components/TransactionList';
import AnalyticsChart from './components/AnalyticsChart';
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  INITIAL_SAMPLE_TRANSACTIONS,
} from './services/api';
import { Sparkles, CheckCircle2, AlertTriangle, RefreshCw, Github } from 'lucide-react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMock, setIsMock] = useState(false);
  const [notification, setNotification] = useState(null);

  // Auto-dismiss toast notification
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch transactions on mount
  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      const res = await getTransactions();
      setTransactions(res.data || []);
      setIsMock(res.isMock);
    } catch (err) {
      console.error('Error loading transactions:', err);
      showToast('Failed to load transactions', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  // Handle Add Transaction
  const handleAddTransaction = async (newTxData) => {
    try {
      const res = await createTransaction(newTxData);
      setTransactions((prev) => [res.data, ...prev]);
      if (res.isMock) setIsMock(true);
      showToast('Transaction added successfully!');
    } catch (err) {
      console.error('Error adding transaction:', err);
      showToast('Failed to add transaction', 'error');
      throw err;
    }
  };

  // Handle Delete Transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
      showToast('Transaction removed successfully!');
    } catch (err) {
      console.error('Error deleting transaction:', err);
      showToast('Failed to delete transaction', 'error');
    }
  };

  // Restore Seed Data helper
  const handleRestoreSeedData = () => {
    localStorage.setItem('spendwise_transactions', JSON.stringify(INITIAL_SAMPLE_TRANSACTIONS));
    setTransactions(INITIAL_SAMPLE_TRANSACTIONS);
    setIsMock(true);
    showToast('Demo dataset restored!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white relative">
      
      {/* Dynamic Background Effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Navbar */}
      <Navbar
        onOpenModal={() => setIsModalOpen(true)}
        isMock={isMock}
        transactionCount={transactions.length}
      />

      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl glass-panel shadow-2xl border ${
              notification.type === 'error'
                ? 'border-rose-500/40 text-rose-300'
                : 'border-emerald-500/40 text-emerald-300'
            }`}
          >
            {notification.type === 'error' ? (
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            )}
            <span className="text-sm font-semibold">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Banner Alert if Running in Local Offline Mode */}
        {isMock && (
          <div className="mb-6 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-indigo-200 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white">Full-Stack Offline Preview Mode:</span>
                <span className="ml-1 text-slate-300">
                  Express server is offline or MongoDB is not running locally. Operations are saved to browser local storage. Start server at port 5000 for MongoDB live sync!
                </span>
              </div>
            </div>
            <button
              onClick={handleRestoreSeedData}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/30 text-indigo-200 font-semibold flex items-center space-x-1.5 transition-all flex-shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        )}

        {/* 3 Summary Cards */}
        <SummaryCards transactions={transactions} />

        {/* Visual Analytics Chart */}
        <AnalyticsChart transactions={transactions} />

        {/* Main Transaction List & Filters */}
        <TransactionList
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
          isLoading={isLoading}
        />

      </main>

      {/* Add Transaction Modal */}
      <TransactionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-400">SpendWise</span>
            <span>•</span>
            <span>MERN Stack Personal Finance Tracker</span>
          </div>
          <div className="text-slate-500">
            Node.js • Express.js • MongoDB • React • Tailwind CSS
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
