import React from "react";

function UpcomingBills() {
  const bills = [
    { name: "Electricity Bill", dueDate: "2025-01-15", amount: 100 },
    { name: "Internet Bill", dueDate: "2025-01-20", amount: 50 },
  ];

  const today = new Date();

  const getDaysLeft = (dueDate: string) => {
    const due = new Date(dueDate);
    const timeDifference = due.getTime() - today.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  };

  const getTextColor = (daysLeft: number) => {
    if (daysLeft <= 1) return "text-red-500"; // Today or 1 day left
    if (daysLeft <= 3) return "text-orange-500"; // 3 days or less
    if (daysLeft <= 10) return "text-gray-500"; // 10 days or less
    return "text-gray-700"; // More than 10 days
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Upcoming Bills</h2>
      <ul className="space-y-2">
        {bills.map((bill, index) => {
          const daysLeft = getDaysLeft(bill.dueDate);
          const textColor = getTextColor(daysLeft);

          return (
            <li key={index} className="flex justify-between">
              <span>
                {bill.name}{" "}
                <span className={`text-sm ${textColor}`}>
                  ({daysLeft} {daysLeft === 1 ? "day" : "days"} left)
                </span>
              </span>
              <span className={textColor}>R{bill.amount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UpcomingBills;