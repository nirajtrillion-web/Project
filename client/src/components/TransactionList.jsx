import React, { useState } from 'react';
import {
  Trash2,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Tag,
  Calendar,
  Layers,
  Inbox,
  AlertCircle,
} from 'lucide-react';

const CATEGORIES = ['All Categories', 'Salary', 'Food', 'Rent', 'Entertainment', 'Utilities', 'Other'];

const TransactionList = ({ transactions = [], onDeleteTransaction, isLoading }) => {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'income' | 'expense'
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    // Filter by type
    if (filterType !== 'all' && tx.type !== filterType) return false;
    // Filter by category
    if (selectedCategory !== 'All Categories' && tx.category !== selectedCategory) return false;
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const titleMatch = tx.title?.toLowerCase().includes(query);
      const categoryMatch = tx.category?.toLowerCase().includes(query);
      return titleMatch || categoryMatch;
    }
    return true;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDelete = (id) => {
    onDeleteTransaction(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="rounded-2xl glass-panel border border-slate-800/80 shadow-xl overflow-hidden mb-12">
      
      {/* Header & Controls Toolbar */}
      <div className="p-6 border-b border-slate-800/80 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Transaction History</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {filteredTransactions.length} {filteredTransactions.length === 1 ? 'item' : 'items'}
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              View, search, filter and manage all your income & expenses
            </p>
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center space-x-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setFilterType('income')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
                filterType === 'income'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Income</span>
            </button>
            <button
              onClick={() => setFilterType('expense')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
                filterType === 'expense'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
              }`}
            >
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>Expense</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700/70 text-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <Tag className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-8 py-2 rounded-xl bg-slate-900/90 border border-slate-700/70 text-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900 text-slate-200">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters button if filters are active */}
          {(filterType !== 'all' || selectedCategory !== 'All Categories' || searchQuery) && (
            <button
              onClick={() => {
                setFilterType('all');
                setSelectedCategory('All Categories');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl border border-slate-700/60 bg-slate-800/50 hover:bg-slate-800 text-indigo-300 text-xs font-semibold transition-all flex items-center justify-center space-x-1.5"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}

        </div>
      </div>

      {/* Transactions Table / List */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-slate-400">Loading transactions...</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="py-16 text-center space-y-4 px-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center mx-auto text-slate-500">
              <Inbox className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-300">No transactions found</h4>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
                {searchQuery || filterType !== 'all' || selectedCategory !== 'All Categories'
                  ? 'Try adjusting your search filters or category selections.'
                  : 'Start by clicking "+ Add Transaction" to log your income or expense.'}
              </p>
            </div>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/60 bg-slate-900/40 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                <th className="py-4 px-6">Transaction</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-6 text-right">Amount</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-sm">
              {filteredTransactions.map((tx) => {
                const isIncome = tx.type === 'income';

                return (
                  <tr
                    key={tx._id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Title & Type Icon */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold ${
                            isIncome
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                              : 'bg-rose-500/15 text-rose-400 border border-rose-500/25'
                          }`}
                        >
                          {isIncome ? (
                            <ArrowUpRight className="w-5 h-5" />
                          ) : (
                            <ArrowDownRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                            {tx.title}
                          </div>
                          <div className="text-xs text-slate-400 sm:hidden capitalize">
                            {tx.category} • {formatDate(tx.date)}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category Badge */}
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700/80 text-slate-300">
                        {tx.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 hidden sm:table-cell text-slate-400 text-xs font-medium">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{formatDate(tx.date)}</span>
                      </div>
                    </td>

                    {/* Amount Badge */}
                    <td className="py-4 px-6 text-right font-bold tracking-tight">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-xl text-sm font-extrabold ${
                          isIncome
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {isIncome ? `+${formatCurrency(tx.amount)}` : `-${formatCurrency(tx.amount)}`}
                      </span>
                    </td>

                    {/* Delete Action */}
                    <td className="py-4 px-6 text-center">
                      {deleteConfirmId === tx._id ? (
                        <div className="flex items-center justify-center space-x-2 animate-fadeIn">
                          <button
                            onClick={() => handleDelete(tx._id)}
                            className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                            title="Confirm delete"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(tx._id)}
                          className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all duration-150 focus:outline-none"
                          title="Delete transaction"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default TransactionList;
