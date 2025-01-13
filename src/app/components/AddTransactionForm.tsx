import React, { useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, getDocs, query, where, updateDoc, doc, setDoc } from "firebase/firestore";

interface AddTransactionFormProps {
  onClose: () => void; // Closes the modal
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onClose }) => {
  const [date, setDate] = useState("");
  const [securityName, setSecurityName] = useState("");
  const [ticker, setTicker] = useState("");
  const [securityType, setSecurityType] = useState("Buy");
  const [amount, setAmount] = useState<number | "">("");
  const [shares, setShares] = useState<number | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !securityName || ticker === "" || amount === "" || shares === "") {
      alert("Please fill out all fields");
      return;
    }

    try {
      const transaction = {
        date,
        securityName,
        ticker,
        securityType,
        amount: Number(amount),
        shares: Number(shares),
      };

      // Add transaction to the "investment_transactions" collection
      const transactionsCollection = collection(db, "investment_transactions");
      await addDoc(transactionsCollection, transaction);

      // Check and update the "portfolio" collection
      const portfolioCollection = collection(db, "portfolio");
      const portfolioQuery = query(portfolioCollection, where("ticker", "==", ticker));
      const querySnapshot = await getDocs(portfolioQuery);

      if (!querySnapshot.empty) {
        // Record exists, update it
        const portfolioDoc = querySnapshot.docs[0];
        const portfolioData = portfolioDoc.data();
        const newShares =
          securityType === "Buy"
            ? portfolioData.shares + Number(shares)
            : portfolioData.shares - Number(shares);
        const newTotalInvested =
          securityType === "Buy"
            ? portfolioData.totalInvested + Number(amount)
            : portfolioData.totalInvested - Number(amount);

        await updateDoc(doc(db, "portfolio", portfolioDoc.id), {
          shares: newShares,
          totalInvested: newTotalInvested,
        });
      } else {
        // Record does not exist, create it
        const newPortfolioRecord = {
          securityName,
          ticker,
          shares: Number(shares),
          totalInvested: Number(amount),
          securityType,
        };

        await setDoc(doc(portfolioCollection, ticker), newPortfolioRecord);
      }

      alert("Transaction added successfully!");
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding transaction or updating portfolio: ", error);
      alert("Failed to add transaction. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-darkgreen p-6 rounded shadow w-1/3">
      <h2 className="text-lg font-bold mb-4">Add Transaction</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-lighterblue rounded-md p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Security Name</label>
        <input
          type="text"
          value={securityName}
          onChange={(e) => setSecurityName(e.target.value)}
          className="w-full bg-lighterblue rounded-md p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Ticker</label>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="w-full bg-lighterblue rounded-md p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Security Type</label>
        <input
          type="text"
          value={securityType}
          onChange={(e) => setSecurityType(e.target.value)}
          className="w-full bg-lighterblue rounded-md p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Shares</label>
        <input
          type="number"
          value={shares}
          onChange={(e) => setShares(Number(e.target.value))}
          className="w-full bg-lighterblue rounded-md p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full bg-lighterblue rounded-md p-2"
          required
        />
      </div>
      <div className="flex justify-between space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-black rounded-lg"
        >
          Cancel
        </button>
        <div>
          <button
            type="submit"
            className="px-4 py-2 mr-1 bg-red-500 text-white rounded-lg"
          >
            Withdraw
          </button>
          <button
            type="submit"
            className="px-4 py-2 ml-1 bg-maingreen text-white rounded-lg"
          >
            Invest
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTransactionForm;