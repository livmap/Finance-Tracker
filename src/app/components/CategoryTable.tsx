import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";

const CategoryTable: React.FC = () => {
  const [category, setCategory] = useState<string>(""); // State for the input field
  const [categories, setCategories] = useState<string[]>([]); // State for the list of categories
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch categories from Firestore on component mount
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
      const categoryList: string[] = snapshot.docs.map((doc) => doc.data().category);
      setCategories(categoryList);
      setLoading(false);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to add a category to Firestore
  const addCategory = async () => {
    if (category.trim() === "") {
      alert("Category cannot be empty");
      return;
    }

    try {
      const categoriesCollection = collection(db, "categories");
      await addDoc(categoriesCollection, { category: category.trim() });
      setCategory(""); // Clear the input field after adding
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="p-4 w-1/3">
      <h2 className="text-xl font-bold mb-4">Category Table</h2>
      <div className="mb-4">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          className="px-4 py-2 rounded-md mr-2 bg-darkgreen"
        />
        <button
          onClick={addCategory}
          className="bg-maingreen text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Category
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-darkgreen">
              <th className="px-4 py-2 text-left">Categories</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={index} className="border-b bg-background hover:bg-lighterblue">
                <td className="px-4 py-2">{cat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;