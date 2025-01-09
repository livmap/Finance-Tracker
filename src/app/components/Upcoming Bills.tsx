function UpcomingBills (){

  const bills = [
    { name: "Electricity Bill", dueDate: "2025-01-15", amount: 100 },
    { name: "Internet Bill", dueDate: "2025-01-20", amount: 50 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Upcoming Bills</h2>
      <ul className="space-y-2">
        {bills.map((bill, index) => (
          <li key={index} className="flex justify-between text-gray-700">
            <span>
              {bill.name} <span className="text-sm text-gray-500">({bill.dueDate})</span>
            </span>
            <span>R{bill.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingBills;