"use client"

import React, { useState } from "react";

interface Transaction {
  date: string;
  name: string;
  type: "Income" | "Expense";
  amount: number;
  payMethod: string;
  notes: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const currentTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="overflow-x-auto shadow rounded">
      <table className="w-full text-left border-collapse">
        <thead className="bg-darkgreen">
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Name</th>
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Pay Method</th>
            <th className="p-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction, index) => (
            <tr key={index} className="hover:bg-lighterblue">
              <td className="p-2">{transaction.date}</td>
              <td className="p-2">{transaction.name}</td>
              <td className="p-2">{transaction.type}</td>
              <td className="p-2">R {transaction.amount.toFixed(2)}</td>
              <td className="p-2">{transaction.payMethod}</td>
              <td className="p-2">{transaction.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between p-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-maingreen cursor-pointer text-white py-1 px-3 rounded disabled:bg-gray-800"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-maingreen cursor-pointer text-white py-1 px-3 rounded disabled:bg-gray-800"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;