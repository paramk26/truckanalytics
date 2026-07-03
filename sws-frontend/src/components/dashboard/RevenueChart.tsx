"use client";

import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 24000 },
    { month: "May", revenue: 28000 },
    { month: "Jun", revenue: 32000 },
];

export default function RevenueChart() {
    return (
        <div
            className="
            bg-white
            rounded-[28px]
            p-8
            border
            border-[#ECEEF3]
            shadow-sm
            "
        >
            <div className="mb-8">
                <h2 className="text-xl font-semibold">
                    Revenue Overview
                </h2>

                <p className="text-gray-500">
                    Monthly revenue trend
                </p>
            </div>

            <div className="h-[350px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <AreaChart data={data}>
                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#4F6EF7"
                            fill="#4F6EF720"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}