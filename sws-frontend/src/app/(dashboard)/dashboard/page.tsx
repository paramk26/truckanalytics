"use client";

import { useEffect, useState } from "react";
import { IndianRupee, Truck, UserCog, Users } from "lucide-react";
import KpiCard from "@/components/dashboard/KpiCard";
import QuickStats from "@/components/dashboard/QuickStats";
import RecentDeliveries from "@/components/dashboard/RecentDeliveries";
import RevenueChart from "@/components/dashboard/RevenueChart";
import api from "@/lib/api";

type DashboardStats = {
  customers: number;
  tankers: number;
  employees: number;
  deliveries: number;
  monthly_revenue: number;
  monthly_expenses: number;
  net_profit: number;
  pending_payments: number;
  payments_received: number;
  maintenance_cost: number;
};

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    api.get<DashboardStats>("/dashboard/")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      {stats && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              title="Customers"
              value={stats.customers}
              subtitle="Active customers"
              icon={Users}
              color="#4F6EF7"
            />
            <KpiCard
              title="Tankers"
              value={stats.tankers}
              subtitle="Registered tankers"
              icon={Truck}
              color="#0ABE52"
            />
            <KpiCard
              title="Employees"
              value={stats.employees}
              subtitle="Team members"
              icon={UserCog}
              color="#B57AF1"
            />
            <KpiCard
              title="Revenue"
              value={currency.format(stats.monthly_revenue)}
              subtitle="Current month"
              icon={IndianRupee}
              color="#EE8248"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RevenueChart />
            </div>
            <QuickStats stats={stats} />
          </div>

          <RecentDeliveries />
        </>
      )}
    </div>
  );
}
