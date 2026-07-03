import { ShieldCheck, Server, Users } from "lucide-react";

const settings = [
  {
    title: "API",
    value: "http://127.0.0.1:8002",
    icon: Server,
  },
  {
    title: "Admin",
    value: "Full create, edit, and delete access",
    icon: ShieldCheck,
  },
  {
    title: "Viewer",
    value: "Read-only operational access",
    icon: Users,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          System configuration and role access overview.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {settings.map((item) => {
          const Icon = item.icon;

          return (
            <section
              key={item.title}
              className="rounded-[28px] border border-[#ECEEF3] bg-white p-6 shadow-sm"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDF2FF] text-[#4F6EF7]">
                <Icon size={22} />
              </div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.value}</p>
            </section>
          );
        })}
      </div>
    </div>
  );
}
