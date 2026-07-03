import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#F6F7FB]">
      <Sidebar />

      <main
    className="
    lg:ml-[280px]
    flex-1
    p-4
    md:p-6
    lg:p-8
    "
>
        <Navbar />

        <ProtectedRoute>
          <div className="mt-8">
            {children}
          </div>
        </ProtectedRoute>
      </main>
    </div>
  );
}
