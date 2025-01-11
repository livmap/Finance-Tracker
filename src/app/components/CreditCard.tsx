"use client";

import React from "react";

const CreditCard: React.FC = () => {
  const accountBalance = "R12,345.67";
  const cardHolderName = "Prince Maphupha";
  const bankName = "NEDBANK";

  return (
    <div className="relative w-96 h-56 rounded-lg shadow-xl bg-gradient-to-br from-yellow-600 via-blue-500 to-green-600 text-white p-6 m-3">
      {/* Bank Name */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">{bankName}</h1>
          <p className="text-sm font-medium opacity-80">Debit Card</p>
        </div>
        {/* Mastercard Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
        </div>
      </div>

      {/* Account Balance */}
      <div className="mt-8">
        <p className="text-sm font-medium opacity-80">Account Balance</p>
        <h2 className="text-2xl font-bold">{accountBalance}</h2>
      </div>

      {/* Card Holder Name */}
      <div className="absolute bottom-6 left-6">
        <p className="text-sm font-medium opacity-80">Card Holder</p>
        <h3 className="text-lg font-bold">{cardHolderName}</h3>
      </div>

      {/* Decorative Chip */}
      <div className="absolute bottom-6 right-6">
        <div className="w-12 h-8 bg-yellow-400 rounded-sm"></div>
      </div>
    </div>
  );
};

export default CreditCard;