# 💰 SpendWise — Personal Expense & Budget Tracker

SpendWise is a full-stack MERN (MongoDB, Express.js, React, Node.js) web application designed for personal finance tracking, budget calculations, and real-time expense monitoring formatted in Indian Rupees (₹).

![SpendWise Banner](https://img.shields.io/badge/Stack-MERN-indigo?style=for-the-badge)
![Currency](https://img.shields.io/badge/Currency-INR%20(%E2%82%B9)-emerald?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## ✨ Features

- 📊 **Dynamic Summary Dashboard**: Real-time calculation of **Total Balance**, **Total Income**, and **Total Expense**.
- 🇮🇳 **Indian Currency Formatting**: Complete support for `₹` (INR) digit formatting (Lakhs & Thousands).
- 🏷️ **Categorized Tracking**: Organize transactions by *Salary*, *Food*, *Rent*, *Entertainment*, *Utilities*, and *Other*.
- 🔍 **Smart Filtering & Search**: Instant filter by transaction type (Income/Expense/All), category, or title keyword search.
- ⚡ **Interactive Add/Delete**: Quick transaction entry modal and one-click deletion with auto-recalculated balances.
- 📈 **Category Analytics Chart**: Visual breakdown of spending percentages across categories.
- 🔌 **Dual Sync Architecture**: Seamless sync with live MongoDB database with offline browser fallback.

---

## 📁 Directory Structure

```text
SpendWise/
├── client/                 # React (Vite) + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/     # Navbar, SummaryCards, TransactionList, FormModal, Analytics
│   │   ├── services/       # Axios API client & fallback engine
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── server/                 # Express.js + Mongoose REST API Backend
    ├── models/             # Transaction Mongoose Schema
    ├── routes/             # REST Endpoints (GET, POST, DELETE)
    ├── server.js           # Server Entry Point
    └── package.json
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB running locally or MongoDB Atlas URI (optional)

### 1. Backend Setup (`/server`)
```bash
cd server
npm install
npm run dev
```
Backend server starts on `http://localhost:5000`.

### 2. Frontend Setup (`/client`)
```bash
cd client
npm install
npm run dev
```
Frontend application opens on `http://localhost:3000`.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide-React Icons, Axios.
- **Backend**: Node.js, Express.js, Mongoose, Cors, Dotenv.
- **Database**: MongoDB / Mongoose ODM.

---

## 📄 License
Licensed under the [MIT License](LICENSE).
