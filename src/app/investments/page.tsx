"use client";

import { useState, useEffect } from "react";
import PortfolioTable from "../components/PortfolioTable";
import AddTransactionForm from "../components/AddTransactionForm";
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Sidebar from "../components/Sidebar";
import InvTransactionsTable from "../components/InvTransactionsTable";

interface Portfolio {
  securityName: string;
  type: string;
  totalInvested: number;
  sharePrice: number;
  shares: number;
  performance: number;
}

interface Transaction {
  date: string;
  securityName: string;
  ticker: string;
  securityType: string;
  purchasePrice: number;
  amount: number;
  shares: number;
}

const InvestmentsPage = () => {
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>([]);
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const querySnapshot = await getDocs(collection(db, "investment_transactions"));
    const data = querySnapshot.docs.map((doc) => doc.data() as Transaction);
    setTransactionData(data);
  };

  const handleAddTransaction = async (transaction: Transaction) => {
    await addDoc(collection(db, "investment_transactions"), transaction);
    fetchTransactions();
  };

  const sidebarItems = [
    { href: "/", imgSrc: "/images/dashboard.svg", alt: "Dashboard" },
    { href: "/transactions", imgSrc: "/images/transactions.svg", alt: "Transactions" },
    { href: "/savings", imgSrc: "/images/savings.svg", alt: "Budget" },
    { href: "/investments", imgSrc: "/images/investments.svg", alt: "Reports" },
    { href: "/setup", imgSrc: "/images/setup.svg", alt: "Settings" },
  ];

  return (
    <div className="flex w-screen bg-background">
      <Sidebar logoSrc={"/images/logo_icon.svg"} items={sidebarItems} />
      <div className="w-full p-4">
        <h1 className="text-2xl font-bold mb-4">Investments</h1>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-maingreen text-white px-4 py-2 rounded-lg"
          >
            Add Transaction
          </button>
        </div>

        {/* Add Transaction Modal */}
        {isAddModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-darkgreen bg-opacity-50">
            <AddTransactionForm onClose={() => setIsAddModalOpen(false)} />
          </div>
        )}

        {/* Portfolio and Transactions Tables */}
        <div className="mt-6">
          <PortfolioTable />
        </div>
        <div className="mt-6">
          <InvTransactionsTable data={transactionData} />
        </div>
      </div>
    </div>
  );
};

export default InvestmentsPage;