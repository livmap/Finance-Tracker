const savingsData = [
  { name: "Emergency Fund", balance: 5000 },
  { name: "Vacation Fund", balance: 2500 },
  { name: "Education Fund", balance: 3000 },
];

function SavingsOverview() {
  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Savings Pockets</h2>
      <ul className="space-y-2">
        {savingsData.map((pocket, index) => (
          <li key={index} className="flex justify-between text-gray-700">
            <span>{pocket.name}</span>
            <span>${pocket.balance.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavingsOverview;