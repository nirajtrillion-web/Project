import React from 'react';
import { Wallet, PlusCircle, Calendar, Sparkles, Database, WifiOff } from 'lucide-react';

const Navbar = ({ onOpenModal, isMock, transactionCount }) => {
  const currentMonthYear = new Date().toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-slate-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white shadow-md glow-indigo">
              <Wallet className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  Spend<span className="text-indigo-400">Wise</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  <Sparkles className="w-3 h-3 mr-1" /> MERN Stack
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Smart Personal Finance & Expense Tracker
              </p>
            </div>
          </div>

          {/* Right Section: Month Badge, Sync Status & Action Button */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Sync / Database Badge */}
            <div
              className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                isMock
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
              }`}
              title={isMock ? 'Connected via Local Fallback' : 'Connected to Live MongoDB'}
            >
              {isMock ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span>Offline Sync</span>
                </>
              ) : (
                <>
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>MongoDB Live</span>
                </>
              )}
            </div>

            {/* Current Month Badge */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 text-xs sm:text-sm font-semibold shadow-inner">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>{currentMonthYear}</span>
            </div>

            {/* Add Transaction Button */}
            <button
              onClick={onOpenModal}
              id="add-transaction-btn"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <PlusCircle className="w-5 h-5 text-indigo-100" />
              <span className="hidden sm:inline">+ Add Transaction</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
