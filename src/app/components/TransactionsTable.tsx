import { useState, useEffect } from "react";
import { db } from "../../../firebase/firebaseConfig"; // Import your Firebase configuration
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"; // Import Firestore functions

interface Transaction {
  date: string;
  name: string;
  amount: number;
  type: string;
}

function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Create a query to fetch the latest 3 transactions, ordered by date descending
        const transactionsQuery = query(
          collection(db, "transactions"),
          orderBy("date", "desc"),
          limit(3)
        );

        // Fetch the transactions using the query
        const querySnapshot = await getDocs(transactionsQuery);

        const fetchedTransactions: Transaction[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            date: data.date, // Ensure the date is in a string format or correctly formatted
            name: data.name,
            amount: data.amount,
            type: data.type
          };
        });

        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
      <table className="w-full text-sm text-left text-gray-700">
        <thead>
          <tr className="border-b text-maingreen">
            <th className="py-2">Date</th>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="border-b hover:bg-lighterblue">
              <td className="py-2 text-white">{transaction.date}</td>
              <td className="text-white">{transaction.name}</td>
              <td
                className={`${
                  transaction.type === 'Expense' ? "text-red-500" : "text-green-500"
                }`}
              >
                ${Math.abs(transaction.amount).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;