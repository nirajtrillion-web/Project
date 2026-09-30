import React from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, Scale, TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCards = ({ transactions = [] }) => {
  // Calculate running totals dynamically
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const totalBalance = totalIncome - totalExpense;

  // Format currency utility for Indian Rupee (INR)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Savings rate calculation
  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round(((totalIncome - totalExpense) / totalIncome) * 100)) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      
      {/* 1. Total Balance Card */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-6 border border-slate-700/60 shadow-card hover:border-indigo-500/40 transition-all duration-300 group">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Total Balance
          </span>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <Scale className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h2
            id="total-balance-value"
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              totalBalance >= 0 ? 'text-white' : 'text-rose-400'
            }`}
          >
            {formatCurrency(totalBalance)}
          </h2>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Net Financial Position</span>
          <span className="inline-flex items-center font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
            {savingsRate}% Savings Rate
          </span>
        </div>
      </div>

      {/* 2. Total Income Card (Green Highlight) */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-6 border border-emerald-500/20 shadow-card hover:border-emerald-500/40 transition-all duration-300 group glow-emerald">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-emerald-400/90 uppercase tracking-wider">
            Total Income
          </span>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h2
            id="total-income-value"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-emerald-400"
          >
            +{formatCurrency(totalIncome)}
          </h2>
        </div>
        <div className="mt-4 pt-3 border-t border-emerald-500/10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center text-emerald-400/80">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> Total Received
          </span>
          <span className="text-slate-400">
            {transactions.filter((t) => t.type === 'income').length} Entries
          </span>
        </div>
      </div>

      {/* 3. Total Expense Card (Red Highlight) */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-6 border border-rose-500/20 shadow-card hover:border-rose-500/40 transition-all duration-300 group glow-rose">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all duration-500"></div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-rose-400/90 uppercase tracking-wider">
            Total Expense
          </span>
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
            <ArrowDownRight className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h2
            id="total-expense-value"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-rose-400"
          >
            -{formatCurrency(totalExpense)}
          </h2>
        </div>
        <div className="mt-4 pt-3 border-t border-rose-500/10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center text-rose-400/80">
            <TrendingDown className="w-3.5 h-3.5 mr-1" /> Total Spent
          </span>
          <span className="text-slate-400">
            {transactions.filter((t) => t.type === 'expense').length} Entries
          </span>
        </div>
      </div>

    </div>
  );
};

export default SummaryCards;
