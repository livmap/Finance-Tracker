"use client";

import Sidebar from "./components/Sidebar";
import PortfolioCard from "./components/PortfolioCard";
import SavingsOverview from "./components/SavingsOverview";
import AccountBalance from "./components/AccountBalance";
import UpcomingBills from "./components/Upcoming Bills";
import TransactionsTable from "./components/TransactionsTable";
import CreditCard from "./components/CreditCard";
import { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  addDoc,
  limit,
} from "firebase/firestore";

function DashboardPage() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [savingsAmount, setSavingsAmount] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [savingsPockets, setSavingsPockets] = useState<any>([]);

  const sidebarItems = [
    { href: "/", imgSrc: "/images/dashboard.svg", alt: "Dashboard" },
    { href: "/transactions", imgSrc: "/images/transactions.svg", alt: "Transactions" },
    { href: "/savings", imgSrc: "/images/savings.svg", alt: "Budget" },
    { href: "/investments", imgSrc: "/images/investments.svg", alt: "Reports" },
    { href: "/setup", imgSrc: "/images/setup.svg", alt: "Settings" },
  ];

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const todayDay = new Date().getDate(); // Get today's day of the month

  // Function to handle the daily check
  const handleDailyCheck = async () => {
    try {
      // Check if today's date exists in the `daysLogged` collection
      const daysLoggedQuery = query(
        collection(db, "daysLogged"),
        where("date", "==", today),
        limit(1)
      );
      const daysLoggedSnapshot = await getDocs(daysLoggedQuery);

      if (!daysLoggedSnapshot.empty) {
        console.log("Today's date already logged.");
        return;
      }

      // Check if there is a bill with today's date in the `bills` collection
      const billsQuery = query(
        collection(db, "bills"),
        where("day", "==", todayDay),
        limit(1)
      );
      const billsSnapshot = await getDocs(billsQuery);

      if (!billsSnapshot.empty) {
        const bill = billsSnapshot.docs[0].data();
        const billAmount = bill.amount;

        // Fetch the first record in the `Accounts` collection
        const accountsSnapshot = await getDocs(collection(db, "Accounts"));
        const accountDoc = accountsSnapshot.docs[0]; // Assuming only one document in `Accounts`
        const accountData = accountDoc.data();
        const current = accountData.Current || 0;

        // Deduct the bill amount from the current balance
        const updatedCurrent = current - billAmount;
        await updateDoc(doc(db, "Accounts", accountDoc.id), {
          Current: updatedCurrent,
        });

        console.log(`Bill of R${billAmount} paid. New Current balance: R${updatedCurrent}`);
      } else {
        console.log("No bill due today.");
      }

      // Add today's date to the `daysLogged` collection
      await addDoc(collection(db, "daysLogged"), { date: today });
      console.log("Today's date logged successfully.");
    } catch (error) {
      console.error("Error in daily check:", error);
    }
  };

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
          setTotalAmount(current + savings + investments);
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
        setSavingsPockets(pockets);
      } catch (error) {
        console.error("Error fetching savings pockets:", error);
      }
    };

    fetchSavingsPockets();
  }, []);

  // Run the daily check when the component mounts
  useEffect(() => {
    handleDailyCheck();
  }, []);

  return (
    <div className="w-screen flex bg-background">
      <Sidebar logoSrc={"/images/logo_icon.svg"} items={sidebarItems} />
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold">January</h1>
        <div className="dash-items flex justify-between">
          <CreditCard amount={currentAmount} />
          <AccountBalance total={totalAmount} savings={savingsAmount} investments={investmentAmount} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioCard />
          <SavingsOverview savingsPockets={savingsPockets} />
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