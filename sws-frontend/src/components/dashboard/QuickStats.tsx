type QuickStatsProps = {
  stats: {
    deliveries: number;
    net_profit: number;
    pending_payments: number;
    maintenance_cost: number;
  };
};

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function QuickStats({ stats }: QuickStatsProps) {
  const items = [
    {
      title: "Pending Amount",
      value: currency.format(stats.pending_payments),
    },
    {
      title: "Total Deliveries",
      value: stats.deliveries,
    },
    {
      title: "Maintenance Spend",
      value: currency.format(stats.maintenance_cost),
    },
    {
      title: "Net Profit",
      value: currency.format(stats.net_profit),
    },
  ];

  return (
    <div className="rounded-[28px] border border-[#ECEEF3] bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-xl font-semibold">Quick Stats</h2>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.title} className="flex items-center justify-between gap-4">
            <p className="text-gray-500">{item.title}</p>
            <span className="text-2xl font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
