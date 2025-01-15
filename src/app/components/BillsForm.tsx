import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

interface BillsFormProps {
  onClose: () => void;
}

const BillsForm: React.FC<BillsFormProps> = ({ onClose }) => {
  const [day, setDay] = useState<number | "">("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesCollection = collection(db, "categories");
        const snapshot = await getDocs(categoriesCollection);
        const categoriesList = snapshot.docs.map((doc) => doc.data().category);
        setCategories(categoriesList);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddBill = async () => {
    if (!day || !name || !category || amount === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      const billsCollection = collection(db, "bills");
      await addDoc(billsCollection, {
        day,
        name,
        category,
        amount: parseFloat(amount.toString()), // Ensure it's stored as a number
      });

      alert("Bill added successfully");
      onClose(); // Close the form
    } catch (error) {
      console.error("Error adding bill: ", error);
      alert("Failed to add bill");
    }
  };

  return (
    <div className="fixed inset-0 bg-darkgreen bg-opacity-50 flex items-center justify-center">
      <div className="bg-darkgreen p-6 rounded-md shadow-lg w-1/3">
        <h3 className="text-lg font-bold mb-4">Add New Bill</h3>
        <div className="mb-4">
          <label className="block font-medium mb-1">Day</label>
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className="px-4 py-2 rounded-md w-full bg-lighterblue"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 rounded-md w-full bg-lighterblue"
            placeholder="Enter bill name"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-md w-full bg-lighterblue"
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="px-4 py-2 rounded-md w-full bg-lighterblue"
            placeholder="Enter amount"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleAddBill}
            className="bg-maingreen text-white px-4 py-2 rounded-md hover:bg-lighterblue"
          >
            Add Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillsForm;