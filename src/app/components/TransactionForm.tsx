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

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction(formData);
    setFormData({ date: "", name: "", type: "Income", amount: 0, payMethod: "", notes: "" });
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
      <button type="submit" className="bg-maingreen text-white py-2 px-4 rounded">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;