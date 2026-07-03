import ResourcePage, {
  type ColumnConfig,
  type FieldConfig,
} from "@/components/modules/ResourcePage";

const fields: FieldConfig[] = [
  { key: "customer_id", label: "Customer ID", type: "number", required: true },
  { key: "tanker_capacity", label: "Tanker Capacity", type: "number", required: true },
  { key: "plant_name", label: "Plant Name", required: true },
  { key: "rate", label: "Rate", type: "number", required: true },
];

const columns: ColumnConfig[] = [
  { key: "id", label: "Rate ID" },
  { key: "customer_id", label: "Customer ID" },
  { key: "tanker_capacity", label: "Capacity" },
  { key: "plant_name", label: "Plant" },
  { key: "rate", label: "Rate", kind: "currency" },
];

export default function CustomerRatesPage() {
  return (
    <ResourcePage
      title="Rates"
      description="Maintain customer-specific tanker rates used by delivery and invoice workflows."
      endpoint="/customer-rates/"
      entityName="Rate"
      fields={fields}
      columns={columns}
      searchKeys={["id", "customer_id", "plant_name", "tanker_capacity"]}
    />
  );
}
