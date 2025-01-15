"use client"

import React from 'react'
import CategoryTable from '../components/CategoryTable'
import Sidebar from '../components/Sidebar'
import BillsTable from '../components/BillsTable'

const Setup = () => {

    const sidebarItems = [
        { href: "/", imgSrc: "/images/dashboard.svg", alt: "Dashboard" },
        { href: "/transactions", imgSrc: "/images/transactions.svg", alt: "Transactions" },
        { href: "/savings", imgSrc: "/images/savings.svg", alt: "Budget" },
        { href: "/investments", imgSrc: "/images/investments.svg", alt: "Reports" },
        { href: "/setup", imgSrc: "/images/setup.svg", alt: "Settings" },
      ];

  return (
    <div className='flex'>
        <Sidebar logoSrc={"/images/logo_icon.svg"} items={sidebarItems} />
        <BillsTable />
        <CategoryTable />
        
    </div>
  )
}

export default Setup