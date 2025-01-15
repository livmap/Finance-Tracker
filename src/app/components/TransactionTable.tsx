"use client";

import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebaseConfig"; // Import your Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions

interface Transaction {
  date: string; // Expected in "YYYY-MM-DD" format
  name: string;
  type: "Income" | "Expense";
  amount: number;
  payMethod: string;
  notes: string;
}

const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const currentTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "transactions"));
        let fetchedTransactions = querySnapshot.docs.map((doc) => doc.data() as Transaction);

        // Sort transactions by date (latest to oldest)
        fetchedTransactions = fetchedTransactions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return <p className="text-white">Loading transactions...</p>;
  }

  return (
    <div className="overflow-x-auto shadow rounded">
      <table className="w-full text-left border-collapse">
        <thead className="bg-darkgreen">
          <tr>
            <th className="p-2 text-white">Date</th>
            <th className="p-2 text-white">Name</th>
            <th className="p-2 text-white">Type</th>
            <th className="p-2 text-white">Amount</th>
            <th className="p-2 text-white">Pay Method</th>
            <th className="p-2 text-white">Notes</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-white py-4">
                No transactions found.
              </td>
            </tr>
          ) : (
            currentTransactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-lighterblue">
                <td className="p-2 text-white">{transaction.date}</td>
                <td className="p-2 text-white">{transaction.name}</td>
                <td className="p-2 text-white">{transaction.type}</td>
                <td className="p-2 text-white">R {transaction.amount.toFixed(2)}</td>
                <td className="p-2 text-white">{transaction.payMethod}</td>
                <td className="p-2 text-white">{transaction.notes}</td>
              </tr>
            ))
          )}
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