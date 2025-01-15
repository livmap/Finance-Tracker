import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import BillsForm from "./BillsForm";

interface Bill {
  day: number;
  name: string;
  category: string;
  amount: number;
}

const BillsTable: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // Controls form visibility

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bills"), (snapshot) => {
      const billsList: Bill[] = snapshot.docs.map((doc) => ({
        day: doc.data().day,
        name: doc.data().name,
        category: doc.data().category,
        amount: doc.data().amount,
      }));
      setBills(billsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading bills...</div>;
  }

  return (
    <div className="p-4 w-1/2">
      <h2 className="text-xl font-bold mb-4">Bills Table</h2>
      <button
        onClick={() => setShowForm(true)}
        className="bg-maingreen text-white px-4 py-2 rounded-md hover:bg-darkgreen mb-4"
      >
        Add Bill
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-darkgreen">
              <th className="px-4 py-2 text-left">Day</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={index} className="border-b bg-background hover:bg-lighterblue">
                <td className="px-4 py-2">{bill.day}</td>
                <td className="px-4 py-2">{bill.name}</td>
                <td className="px-4 py-2">{bill.category}</td>
                <td className="px-4 py-2 text-right">R {bill.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <BillsForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default BillsTable;