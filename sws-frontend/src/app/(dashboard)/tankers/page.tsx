import ResourcePage, {
  type ColumnConfig,
  type FieldConfig,
} from "@/components/modules/ResourcePage";

const fields: FieldConfig[] = [
  { key: "registration_number", label: "Registration Number", required: true },
  { key: "capacity_kl", label: "Capacity KL", type: "number", required: true },
  { key: "make", label: "Make" },
  { key: "model", label: "Model" },
  { key: "manufacturing_year", label: "Manufacturing Year", type: "number" },
  { key: "chassis_number", label: "Chassis Number" },
  { key: "engine_number", label: "Engine Number" },
  { key: "assigned_plant", label: "Assigned Plant" },
  { key: "insurance_expiry", label: "Insurance Expiry", type: "date" },
  { key: "pollution_expiry", label: "Pollution Expiry", type: "date" },
  { key: "road_tax_expiry", label: "Road Tax Expiry", type: "date" },
  { key: "fitness_expiry", label: "Fitness Expiry", type: "date" },
  { key: "permit_expiry", label: "Permit Expiry", type: "date" },
  { key: "purchase_date", label: "Purchase Date", type: "date" },
  { key: "purchase_price", label: "Purchase Price", type: "number" },
];

const columns: ColumnConfig[] = [
  { key: "registration_number", label: "Registration" },
  { key: "capacity_kl", label: "Capacity" },
  { key: "assigned_plant", label: "Plant" },
  { key: "insurance_expiry", label: "Insurance", kind: "date" },
  { key: "status", label: "Status", kind: "status" },
];

export default function TankersPage() {
  return (
    <ResourcePage
      title="Tankers"
      description="Track tanker registration, capacity, compliance dates, and plant assignment."
      endpoint="/tankers/"
      entityName="Tanker"
      fields={fields}
      columns={columns}
      searchKeys={["registration_number", "make", "model", "assigned_plant", "status"]}
      statusKey="status"
    />
  );
}
