"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  LogOut,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { menuItems } from "@/components/layout/navItems";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeItem =
    menuItems.find((item) => item.href === pathname) ?? menuItems[0];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <header
        className="
        min-h-20
        bg-white
        rounded-3xl
        px-4
        md:px-8
        py-4
        flex
        items-center
        justify-between
        shadow-sm
        "
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#ECEEF3] lg:hidden"
            title="Open menu"
          >
            <Menu size={20} />
          </button>

          <div>
            <h1 className="text-xl font-semibold md:text-2xl">
              {activeItem.title}
            </h1>

            <p className="text-sm text-gray-500">
              Welcome back.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div
            className="
            hidden
            md:flex
            bg-[#F6F7FB]
            rounded-2xl
            px-4
            py-3
            items-center
            gap-3
            "
          >
            <Search size={18} />
            <input
              placeholder="Search..."
              className="
              bg-transparent
              outline-none
              "
            />
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#ECEEF3]"
            title="Notifications"
          >
            <Bell size={18} />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4F6EF7] text-white"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 lg:hidden">
          <aside className="h-full w-[300px] max-w-[86vw] bg-white p-5 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">SWS</h2>
                <p className="text-sm text-gray-500">Invoice System</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#ECEEF3]"
                title="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 transition ${
                      active
                        ? "bg-[#4F6EF7] text-white"
                        : "text-gray-600 hover:bg-[#F6F7FB]"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
