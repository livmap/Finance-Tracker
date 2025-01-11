function AccountBalance() {
  return (
    <div className="bg-background p-6 rounded-lg shadow-md shadow-maingreen border border-maingreen grid grid-cols-3 w-256 m-3">
      <div className="acc-balance">
        <h2 className="text-lg text-darkgreen font-bold mb-2">Liquid Balance</h2>
        <p className="text-2xl font-semibold text-maingreen">R77,500.00</p>
      </div>
      <div className="acc-balance">
        <h2 className="text-lg text-darkgreen font-bold mb-2">Savings</h2>
        <p className="text-2xl font-semibold text-maingreen">R50,000.00</p>
      </div>
      <div className="acc-balance">
        <h2 className="text-lg text-darkgreen font-bold mb-2">Investments</h2>
        <p className="text-2xl font-semibold text-maingreen">R50,000.00</p>
      </div>
    </div>
  );
};

export default AccountBalance;