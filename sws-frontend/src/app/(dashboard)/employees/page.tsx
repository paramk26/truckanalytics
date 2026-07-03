import ResourcePage, {
  type ColumnConfig,
  type FieldConfig,
} from "@/components/modules/ResourcePage";

const fields: FieldConfig[] = [
  { key: "name", label: "Name", required: true },
  { key: "role", label: "Role", type: "select", required: true, options: ["DRIVER", "HELPER", "ADMIN", "STAFF"] },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address" },
  { key: "license_number", label: "License Number" },
  { key: "license_expiry", label: "License Expiry", type: "date" },
  { key: "joining_date", label: "Joining Date", type: "date" },
  { key: "salary", label: "Salary", type: "number" },
  { key: "emergency_contact_name", label: "Emergency Contact" },
  { key: "emergency_contact_phone", label: "Emergency Phone" },
];

const columns: ColumnConfig[] = [
  { key: "name", label: "Employee" },
  { key: "role", label: "Role" },
  { key: "phone", label: "Phone" },
  { key: "license_expiry", label: "License Expiry", kind: "date" },
  { key: "status", label: "Status", kind: "status" },
];

export default function EmployeesPage() {
  return (
    <ResourcePage
      title="Employees"
      description="Manage drivers, helpers, office staff, license dates, and payroll basics."
      endpoint="/employees/"
      entityName="Employee"
      fields={fields}
      columns={columns}
      searchKeys={["name", "role", "phone", "license_number", "status"]}
      statusKey="status"
    />
  );
}
