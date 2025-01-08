"use client"

import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import Sidebar from "../components/Sidebar";

type Transaction = {
    date: string;
    name: string;
    type: "Income" | "Expense";
    amount: number;
    payMethod: string;
    notes: string;
  };

const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [showModal, setShowModal] = useState(false);
  
    const handleAddTransaction = (transaction: Transaction) => {
        setTransactions([transaction, ...transactions]); // Add new transaction at the beginning
        setShowModal(false); // Close the modal
      };

    const sidebarItems = [
        { href: "/", imgSrc: "/images/dashboard.svg", alt: "Dashboard" },
        { href: "/transactions", imgSrc: "/images/transactions.svg", alt: "Transactions" },
        { href: "/savings", imgSrc: "/images/savings.svg", alt: "Budget" },
        { href: "/investments", imgSrc: "/images/investments.svg", alt: "Reports" },
        { href: "/setup", imgSrc: "/images/setup.svg", alt: "Settings" },
      ];
  
    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar logoSrc={"/images/logo_icon.svg"} items={sidebarItems} />
  
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Transactions</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-maingreen text-white px-4 py-2 rounded"
            >
              Add Transaction
            </button>
          </div>
  
          {/* Transactions Table */}
          <TransactionTable transactions={transactions} />
  
          {/* Modal */}
          {showModal && (
  <div className="fixed inset-0 bg-darkgreen bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-darkgreen p-8 rounded-lg shadow-lg w-[600px]">
      {/* Updated Background Color and Width */}
      <h2 className="text-lg font-bold mb-4">Add Transaction</h2>
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <button
        onClick={() => setShowModal(false)}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}
        </div>
      </div>
    );
  };
  
  export default TransactionsPage;