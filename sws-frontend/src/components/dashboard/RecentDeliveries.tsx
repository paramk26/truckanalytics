"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";

type Delivery = {
  id: number;
  customer_id: number;
  tanker_id: number;
  delivery_date: string;
  quantity_kl: number;
  destination: string | null;
};

export default function RecentDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  useEffect(() => {
    api.get<Delivery[]>("/deliveries/")
      .then((res) => {
        setDeliveries(res.data.slice(-4).reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="mt-8 rounded-[28px] border border-[#ECEEF3] bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Recent Deliveries</h2>
          <p className="mt-1 text-gray-500">Latest tanker deliveries</p>
        </div>

        <Link
          href="/deliveries"
          className="rounded-xl bg-[#F6F7FB] px-5 py-2 transition hover:bg-[#ECEEF3]"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-4">Date</th>
              <th className="py-4">Customer ID</th>
              <th className="py-4">Tanker ID</th>
              <th className="py-4">Quantity</th>
              <th className="py-4">Destination</th>
            </tr>
          </thead>

          <tbody>
            {deliveries.length ? (
              deliveries.map((delivery) => (
                <tr
                  key={delivery.id}
                  className="border-b transition last:border-0 hover:bg-[#FAFBFF]"
                >
                  <td className="py-5 font-medium">
                    {new Date(delivery.delivery_date).toLocaleDateString("en-IN")}
                  </td>
                  <td className="py-5">{delivery.customer_id}</td>
                  <td className="py-5">{delivery.tanker_id}</td>
                  <td className="py-5 font-medium">{delivery.quantity_kl} KL</td>
                  <td className="py-5">{delivery.destination ?? "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-8 text-center text-gray-500" colSpan={5}>
                  No deliveries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
