import {
  CreditCard,
  FileText,
  Gauge,
  IndianRupee,
  LayoutDashboard,
  Package,
  Settings,
  Truck,
  UserCog,
  Users,
  Wrench,
} from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Rates",
    href: "/customer-rates",
    icon: Gauge,
  },
  {
    title: "Tankers",
    href: "/tankers",
    icon: Truck,
  },
  {
    title: "Employees",
    href: "/employees",
    icon: UserCog,
  },
  {
    title: "Deliveries",
    href: "/deliveries",
    icon: Package,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: IndianRupee,
  },
  {
    title: "Invoices",
    href: "/invoices",
    icon: FileText,
  },
  {
    title: "Payments",
    href: "/payments",
    icon: CreditCard,
  },
  {
    title: "Maintenance",
    href: "/maintenance",
    icon: Wrench,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
