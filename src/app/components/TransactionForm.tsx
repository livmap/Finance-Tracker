"use client";

import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../../firebase/firebaseConfig"

interface Transaction {
  date: string;
  name: string;
  type: "Income" | "Expense";
  amount: number;
  payMethod: string;
  notes: string;
}

interface TransactionFormProps {
  onAddTransaction?: (transaction: Transaction) => void; // Optional callback for additional functionality
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState<Transaction>({
    date: "",
    name: "",
    type: "Income",
    amount: 0,
    payMethod: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false); // To manage loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add the transaction to the Firestore database
      const docRef = await addDoc(collection(db, "transactions"), formData);
      console.log("Transaction added with ID:", docRef.id);

      // Optionally call the parent callback
      if (onAddTransaction) {
        onAddTransaction(formData);
      }

      // Reset form
      setFormData({ date: "", name: "", type: "Income", amount: 0, payMethod: "", notes: "" });
    } catch (error) {
      console.error("Error adding transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-darkgreen p-6 rounded shadow">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="bg-lighterblue p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Transaction Name"
          className="bg-lighterblue p-2 rounded w-full"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="bg-lighterblue p-2 rounded w-full"
          required
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="bg-lighterblue p-2 rounded w-full"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="payMethod"
          value={formData.payMethod}
          onChange={handleChange}
          placeholder="Payment Method"
          className="bg-lighterblue p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="bg-lighterblue p-2 rounded w-full"
        />
      </div>
      <button
        type="submit"
        className={`bg-maingreen text-white py-2 px-4 rounded ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;