"use client";

import React, { useState } from "react";
import * as d3 from "d3";
import Sidebar from "../components/Sidebar";

interface SavingsPocket {
  id: number;
  name: string;
  color: string;
  goal: number;
  current: number;
}

interface SavingsTransaction {
  pocketName: string;
  date: string;
  amount: number;
}

const Savings: React.FC = () => {
  const [savings, setSavings] = useState<SavingsPocket[]>([
    { id: 1, name: "Emergency Fund", color: "limegreen", goal: 1000, current: 300 },
    { id: 2, name: "Vacation Fund", color: "magenta", goal: 2000, current: 800 },
    { id: 3, name: "New Car Fund", color: "orange", goal: 5000, current: 1500 },
  ]);

  const [transactions, setTransactions] = useState<SavingsTransaction[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedPocket, setSelectedPocket] = useState("");
  const [amount, setAmount] = useState<number | "">(0);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const transactionsPerPage = 3;

  const handleAddDeposit = () => {
    if (selectedPocket && amount) {
      const pocketIndex = savings.findIndex((pocket) => pocket.name === selectedPocket);

      if (pocketIndex !== -1) {
        const updatedSavings = [...savings];
        updatedSavings[pocketIndex].current += amount;

        const newTransaction: SavingsTransaction = {
          pocketName: selectedPocket,
          date: new Date().toISOString(), // Use ISO format for easy sorting
          amount,
        };

        setSavings(updatedSavings);
        setTransactions([...transactions, newTransaction]);

        setSelectedPocket("");
        setAmount("");
        setFormVisible(false);
      }
    }
  };

  const PieChart = ({ pocket }: { pocket: SavingsPocket }) => {
    const percentage = Math.min((pocket.current / pocket.goal) * 100, 100);

    const pieData = d3.pie<number>()([percentage, 100 - percentage]);

    const arc = d3
      .arc<d3.PieArcDatum<number>>()
      .innerRadius(50)
      .outerRadius(100);

    return (
      <div className="relative w-48 h-48">
        <svg viewBox="-100 -100 200 200">
          {pieData.map((slice, index) => (
            <path
              key={index}
              d={arc(slice) || ""}
              fill={index === 0 ? pocket.color : "#001a60"}
            />
          ))}
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-xl font-bold">{Math.round(percentage)}%</p>
        </div>
      </div>
    );
  };

  const sidebarItems = [
    { href: "/", imgSrc: "/images/dashboard.svg", alt: "Dashboard" },
    { href: "/transactions", imgSrc: "/images/transactions.svg", alt: "Transactions" },
    { href: "/savings", imgSrc: "/images/savings.svg", alt: "Budget" },
    { href: "/investments", imgSrc: "/images/investments.svg", alt: "Reports" },
    { href: "/setup", imgSrc: "/images/setup.svg", alt: "Settings" },
  ];

  // Calculate pagination
  const totalTransactions = transactions.length;
  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const displayedTransactions = sortedTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  return (
    <div className="w-screen flex">
      <Sidebar logoSrc={"/images/logo_icon.svg"} items={sidebarItems} />
      <div className="w-full p-4">
        <h1 className="text-2xl font-bold mb-4">Savings</h1>

        {/* Savings Pockets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savings.map((pocket) => (
            <div
              key={pocket.id}
              className="p-4 rounded-lg shadow-md text-center flex flex-col items-center"
            >
              <h2 className="font-bold text-lg mb-2">{pocket.name}</h2>
              <PieChart pocket={pocket} />
              <p className="mt-4 text-gray-700">
                <span className="font-bold">Goal:</span> R{pocket.goal}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Current:</span> R{pocket.current}
              </p>
            </div>
          ))}
        </div>

        {/* Add Savings Deposit */}
        <div className="mt-8">
          <button
            onClick={() => setFormVisible(true)}
            className="px-4 py-2 bg-maingreen text-white rounded-lg"
          >
            Add Savings Deposit
          </button>

          {formVisible && (
            <div className="mt-4 p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-4">Add Deposit</h3>
              <div className="mb-4">
                <label className="block font-bold mb-2">Savings Pocket</label>
                <select
                  value={selectedPocket}
                  onChange={(e) => setSelectedPocket(e.target.value)}
                  className="w-full p-2 rounded-lg bg-lighterblue text-white"
                >
                  <option value="">Select a pocket</option>
                  {savings.map((pocket) => (
                    <option key={pocket.id} value={pocket.name}>
                      {pocket.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-2">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || "")}
                  className="w-full p-2 rounded-lg bg-lighterblue text-white"
                />
              </div>
              <button
                onClick={handleAddDeposit}
                className="px-4 py-2 bg-maingreen text-white rounded-lg"
              >
                Add Deposit
              </button>
            </div>
          )}
        </div>

        {/* Transactions Table */}
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-4">Transactions</h3>
          <table className="w-full shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="text-left bg-darkgreen">
                <th className="p-4">Pocket</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-lighterblue">
                  <td className="p-4">{transaction.pocketName}</td>
                  <td className="p-4">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="p-4">R{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-maingreen rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-maingreen rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savings;