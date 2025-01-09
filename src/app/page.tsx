"use client"

import Image from "next/image";
import Sidebar from "./components/Sidebar";
import PortfolioCard from "./components/PortfolioCard";
import SavingsOverview from "./components/SavingsOverview";
import AccountBalance from "./components/AccountBalance";
import UpcomingBills from "./components/Upcoming Bills";
import TransactionsTable from "./components/TransactionsTable";

function DashboardPage() {
  const sidebarItems = [
    { href: "/", imgSrc: "/images/dashboard.svg", alt: "Dashboard" },
    { href: "/transactions", imgSrc: "/images/transactions.svg", alt: "Transactions" },
    { href: "/savings", imgSrc: "/images/savings.svg", alt: "Budget" },
    { href: "/investments", imgSrc: "/images/investments.svg", alt: "Reports" },
    { href: "/setup", imgSrc: "/images/setup.svg", alt: "Settings" },
  ];

  return (
    <div className="w-screen flex bg-background">
      <Sidebar logoSrc={"/images/logo_icon.svg"} items={sidebarItems} />
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold">January</h1>
        <AccountBalance />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioCard />
          <SavingsOverview />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionsTable />
          <UpcomingBills />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

/*

      <div className="flex-1 p-6 space-y-6 bg-gray-50">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioCard />
          <SavingsOverview />
        </div>
        <AccountBalance />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionsTable />
          <UpcomingBills />
        </div>
      </div>

*/