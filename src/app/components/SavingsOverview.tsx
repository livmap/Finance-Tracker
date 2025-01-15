interface SavingsPocket {
  name: string;
  saved: number;
}

interface SavingsOverviewProps {
  savingsPockets: SavingsPocket[];
}


function SavingsOverview({ savingsPockets } : SavingsOverviewProps) {
  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Savings Pockets</h2>
      <ul className="space-y-2">
        {savingsPockets.map((pocket, index) => (
          <li key={index} className="flex justify-between text-white border-b border-gray-500">
            <span>{pocket.name}</span>
            <span>R {pocket.saved.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavingsOverview;