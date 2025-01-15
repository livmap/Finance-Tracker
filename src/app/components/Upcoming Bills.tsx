import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

function UpcomingBills() {
  const [bills, setBills] = useState<
    { name: string; dueDate: string; amount: number }[]
  >([]);

  const today = new Date();

  const getDaysLeft = (day: string | number) => {
    const due = day
    const today = new Date()
    const timeDifference = parseInt(day.toString()) - today.getDate()
    return timeDifference;
  };

  const getTextColor = (daysLeft: number) => {
    if (daysLeft <= 1) return "text-red-500"; // Today or 1 day left
    if (daysLeft <= 3) return "text-orange-500"; // 3 days or less
    if (daysLeft <= 10) return "text-gray-300"; // 10 days or less
    return "text-gray-700"; // More than 10 days
  };

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const billsCollection = collection(db, "bills");
        const billsQuery = query(billsCollection, orderBy("day"), limit(3));
        const snapshot = await getDocs(billsQuery);

        const fetchedBills = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            name: data.name,
            dueDate: data.day,
            amount: data.amount,
          };
        });

        const newBills = fetchedBills.filter((bill) => getDaysLeft(bill.dueDate) > 0);
        setBills(newBills);
      } catch (error) {
        console.error("Error fetching bills: ", error);
      }
    };

    fetchBills();
  }, []);

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Upcoming Bills</h2>
      <ul className="space-y-2">
        {bills.map((bill, index) => {
          const daysLeft = getDaysLeft(bill.dueDate);
          const textColor = getTextColor(daysLeft);

          return (
            <li key={index} className="flex justify-between border-b">
              <span>
                {bill.name}{" "}
                <span className={`text-sm ${textColor}`}>
                  ({daysLeft} {daysLeft === 1 ? "day" : "days"} left)
                </span>
              </span>
              <span className={textColor}>R {bill.amount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UpcomingBills;