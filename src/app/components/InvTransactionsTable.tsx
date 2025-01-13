import React from "react";

interface Transaction {
  ticker: string;
  date: string;
  securityName: string;
  securityType: string;
  purchasePrice: number;
  amount: number;
  shares: number;
}

interface InvTransactionsTableProps {
  data: Transaction[];
}

const InvTransactionsTable: React.FC<InvTransactionsTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Transactions</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-darkgreen text-white">
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Security Name</th>
            <th className="px-4 py-2 text-left">Ticker</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-right">Amount</th>
            <th className="px-4 py-2 text-right">Shares</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={`bg-background border-t`}>
              <td className="px-4 py-2 text-left">{item.date}</td>
              <td className="px-4 py-2 text-left">{item.securityName}</td>
              <td className="px-4 py-2 text-left">{item.ticker}</td>
              <td className="px-4 py-2 text-left">{item.securityType}</td>
              <td className="px-4 py-2 text-right">R {item.amount.toFixed(2)}</td>
              <td className="px-4 py-2 text-right">{item.shares}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvTransactionsTable;