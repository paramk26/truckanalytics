import ResourcePage, {
  type ColumnConfig,
  type FieldConfig,
} from "@/components/modules/ResourcePage";

const fields: FieldConfig[] = [
  { key: "tanker_id", label: "Tanker ID", type: "number", required: true },
  { key: "maintenance_date", label: "Maintenance Date", type: "date", required: true },
  { key: "maintenance_type", label: "Maintenance Type", type: "select", required: true, options: ["SERVICE", "REPAIR", "INSPECTION", "TYRE", "OTHER"] },
  { key: "cost", label: "Cost", type: "number", required: true },
  { key: "garage_name", label: "Garage Name" },
  { key: "next_service_due", label: "Next Service Due", type: "date" },
  { key: "description", label: "Description", type: "textarea" },
];

const columns: ColumnConfig[] = [
  { key: "maintenance_date", label: "Date", kind: "date" },
  { key: "tanker_id", label: "Tanker ID" },
  { key: "maintenance_type", label: "Type" },
  { key: "garage_name", label: "Garage" },
  { key: "cost", label: "Cost", kind: "currency" },
  { key: "next_service_due", label: "Next Due", kind: "date" },
];

export default function MaintenancePage() {
  return (
    <ResourcePage
      title="Maintenance"
      description="Track tanker service, repairs, garage spend, and upcoming maintenance dates."
      endpoint="/maintenance/"
      entityName="Maintenance"
      fields={fields}
      columns={columns}
      searchKeys={["id", "tanker_id", "maintenance_type", "garage_name", "description"]}
    />
  );
}
