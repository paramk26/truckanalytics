"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ChevronRight,
} from "lucide-react";
import { menuItems } from "@/components/layout/navItems";

export default function Sidebar() {
  const pathname = usePathname();

  return (
   <aside
    className="
    hidden
    lg:block
    w-[280px]
    h-screen
    bg-white
    border-r
    border-[#ECEEF3]
    p-5
    fixed
    left-0
    top-0
    "
>

      <div className="mb-12">
        <h1 className="text-3xl font-semibold">
          SWS
        </h1>

        <p className="text-sm text-gray-500">
          Invoice System
        </p>
      </div>

      <div className="space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
              flex
              items-center
              justify-between
              px-4
              py-2.5
              rounded-2xl
              transition-all
              ${
                active
                  ? "bg-[#4F6EF7] text-white shadow-lg"
                  : "text-gray-500 hover:bg-[#F6F7FB]"
              }
              `}
            >
              <div className="flex items-center gap-4">
                <Icon size={20} />
                <span>{item.title}</span>
              </div>

              {active && (
                <ChevronRight size={18} />
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
