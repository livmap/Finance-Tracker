const transactions = [
  { date: "2025-01-01", name: "Grocery Store", amount: -50 },
  { date: "2025-01-02", name: "Salary", amount: 2000 },
  { date: "2025-01-03", name: "Netflix", amount: -15 },
];

function TransactionsTable (){
  return (
    <div className=" p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
      <table className="w-full text-sm text-left text-gray-700">
        <thead>
          <tr className="border-b">
            <th className="py-2">Date</th>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{transaction.date}</td>
              <td>{transaction.name}</td>
              <td
                className={`${
                  transaction.amount < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                ${Math.abs(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;