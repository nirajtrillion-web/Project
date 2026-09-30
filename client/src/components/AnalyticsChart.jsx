import React from 'react';
import { PieChart, TrendingUp, DollarSign, Activity } from 'lucide-react';

const CATEGORIES = ['Salary', 'Food', 'Rent', 'Entertainment', 'Utilities', 'Other'];

const CATEGORY_COLORS = {
  Salary: 'from-emerald-500 to-teal-400',
  Food: 'from-amber-500 to-orange-400',
  Rent: 'from-indigo-500 to-purple-500',
  Entertainment: 'from-pink-500 to-rose-400',
  Utilities: 'from-cyan-500 to-blue-400',
  Other: 'from-slate-400 to-slate-500',
};

const AnalyticsChart = ({ transactions = [] }) => {
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  // Expense by category breakdown
  const categoryExpenses = CATEGORIES.map((cat) => {
    const amount = transactions
      .filter((t) => t.type === 'expense' && t.category === cat)
      .reduce((acc, t) => acc + Number(t.amount || 0), 0);

    const percentage = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;
    return { category: cat, amount, percentage };
  }).filter((item) => item.amount > 0);

  return (
    <div className="rounded-2xl glass-panel p-6 border border-slate-800/80 shadow-xl mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <span>Category Spending Breakdown</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Visual distribution of expenses across categories
          </p>
        </div>
        <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700/60 text-slate-300 text-xs font-semibold">
          Total Spent: ₹{totalExpense.toLocaleString('en-IN')}
        </div>
      </div>

      {categoryExpenses.length === 0 ? (
        <div className="py-8 text-center text-slate-400 text-sm">
          No expenses recorded yet to show breakdown.
        </div>
      ) : (
        <div className="space-y-4">
          {categoryExpenses.map((item) => (
            <div key={item.category} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-200">{item.category}</span>
                <div className="space-x-2">
                  <span className="text-indigo-300">₹{item.amount.toLocaleString('en-IN')}</span>
                  <span className="text-slate-400">({item.percentage}%)</span>
                </div>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${
                    CATEGORY_COLORS[item.category] || 'from-indigo-500 to-purple-500'
                  } transition-all duration-500 ease-out`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalyticsChart;
