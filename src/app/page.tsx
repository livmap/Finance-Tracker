"use client";

import Sidebar from "./components/Sidebar";
import PortfolioCard from "./components/PortfolioCard";
import SavingsOverview from "./components/SavingsOverview";
import AccountBalance from "./components/AccountBalance";
import UpcomingBills from "./components/Upcoming Bills";
import TransactionsTable from "./components/TransactionsTable";
import CreditCard from "./components/CreditCard";
import { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig"; // Import your Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions

function DashboardPage() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [savingsAmount, setSavingsAmount] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [savingsPockets, setSavingsPockets] = useState<any>([]); // State to store savings pockets

  const sidebarItems = [
    { href: "/", imgSrc: "/images/dashboard.svg", alt: "Dashboard" },
    { href: "/transactions", imgSrc: "/images/transactions.svg", alt: "Transactions" },
    { href: "/savings", imgSrc: "/images/savings.svg", alt: "Budget" },
    { href: "/investments", imgSrc: "/images/investments.svg", alt: "Reports" },
    { href: "/setup", imgSrc: "/images/setup.svg", alt: "Settings" },
  ];

  // Fetch account data from Firestore
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Accounts"));
        
        // Assuming only one document in the collection
        const accountData = querySnapshot.docs[0]?.data();

        if (accountData) {
          const current = accountData.Current || 0;
          const savings = accountData.Savings || 0;
          const investments = accountData.Investments || 0;

          setCurrentAmount(current);
          setSavingsAmount(savings);
          setInvestmentAmount(investments);
          setTotalAmount(current + savings + investments); // Total amount calculation
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchAccountData();
  }, []);

  // Fetch savings pockets data from Firestore
  useEffect(() => {
    const fetchSavingsPockets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Pockets"));
        const pockets = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSavingsPockets(pockets); // Set savings pockets data
      } catch (error) {
        console.error("Error fetching savings pockets:", error);
      }
    };

    fetchSavingsPockets();
  }, []);

  return (
    <div className="w-screen flex bg-background">
      <Sidebar logoSrc={"/images/logo_icon.svg"} items={sidebarItems} />
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold">January</h1>
        <div className="dash-items flex justify-between">
          { /* Where the "Current" must go */ }
          <CreditCard amount={currentAmount} />
          { /* Where the "savings", "investments" must go */ }
          <AccountBalance total={totalAmount} savings={savingsAmount} investments={investmentAmount} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioCard />
          <SavingsOverview savingsPockets={savingsPockets} /> {/* Pass savings data to SavingsOverview */}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionsTable />
          <UpcomingBills />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;