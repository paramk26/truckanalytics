"use client";

import { useEffect } from "react";
import api from "@/lib/api";

export default function DashboardPage() {

    useEffect(() => {
        api.get("/dashboard/")
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="p-10">
            Dashboard Page
        </div>
    );
}