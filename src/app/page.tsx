import Image from "next/image";
import Sidebar from "./components/Sidebar";

export default function Home() {

  const sidebarItems = [
    { href: "/", imgSrc: "/images/dashboard.svg", alt: "Dashboard" },
    { href: "/transactions", imgSrc: "/images/transactions.svg", alt: "Transactions" },
    { href: "/savings", imgSrc: "/images/savings.svg", alt: "Budget" },
    { href: "/investments", imgSrc: "/images/investments.svg", alt: "Reports" },
    { href: "/setup", imgSrc: "/images/setup.svg", alt: "Settings" },
  ];

  return (
    <div className="w-screen h-screen flex flex-col">
      <Sidebar logoSrc={"/images/logo_icon.svg"} items={sidebarItems} />
    </div>
  );
}
