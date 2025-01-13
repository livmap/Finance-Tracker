import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface Portfolio {
  securityName: string;
  type: string;
  ticker:string
  totalInvested: number;
  shares: number;
}

const PortfolioTable: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const portfolioCollection = collection(db, "portfolio");
        const snapshot = await getDocs(portfolioCollection);

        const portfolioList: Portfolio[] = snapshot.docs.map((doc) => {
          const data = doc.data();

          // Map Firestore data to Portfolio structure
          return {
            securityName: data.securityName,
            type: data.securityType, // Adjust if your field is named differently
            totalInvested: data.totalInvested,
            shares: data.shares,
            ticker: data.ticker
          };
        });

        setPortfolioData(portfolioList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching portfolio data: ", error);
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return <div>Loading portfolio data...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-2">Portfolio</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-darkgreen">
            <th className="px-4 py-2 text-left">Security Name</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-right">Total Invested</th>
            <th className="px-4 py-2 text-right">Share Price</th>
            <th className="px-4 py-2 text-right">Shares</th>
            <th className="px-4 py-2 text-right">Performance</th>
          </tr>
        </thead>
        <tbody>
          {portfolioData.map((item, index) => (
            <tr key={index} className="border-t bg-background">
              <td className="px-4 py-2">{item.securityName}</td>
              <td className="px-4 py-2">{item.type}</td>
              <td className="px-4 py-2 text-right">${item.totalInvested.toFixed(2)}</td>
              <td className="px-4 py-2 text-right">${0}</td>
              <td className="px-4 py-2 text-right">{item.shares}</td>
              <td className="px-4 py-2 text-right">{0}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;