import ResourcePage, {
  type ColumnConfig,
  type FieldConfig,
} from "@/components/modules/ResourcePage";

const fields: FieldConfig[] = [
  { key: "customer_id", label: "Customer ID", type: "number", required: true },
  { key: "tanker_id", label: "Tanker ID", type: "number", required: true },
  { key: "driver_id", label: "Driver ID", type: "number", required: true },
  { key: "helper_id", label: "Helper ID", type: "number" },
  { key: "customer_rate_id", label: "Rate ID", type: "number", required: true },
  { key: "delivery_date", label: "Delivery Date", type: "date", required: true },
  { key: "trip_number", label: "Trip Number", type: "number", defaultValue: 1 },
  { key: "source_plant", label: "Source Plant" },
  { key: "destination", label: "Destination" },
  { key: "quantity_kl", label: "Quantity KL", type: "number", required: true },
  { key: "extra_expense", label: "Extra Expense", type: "number", defaultValue: 0 },
  { key: "remarks", label: "Remarks", type: "textarea" },
];

const columns: ColumnConfig[] = [
  { key: "delivery_date", label: "Date", kind: "date" },
  { key: "customer_id", label: "Customer ID" },
  { key: "tanker_id", label: "Tanker ID" },
  { key: "driver_id", label: "Driver ID" },
  { key: "quantity_kl", label: "Quantity KL" },
  { key: "destination", label: "Destination" },
];

export default function DeliveriesPage() {
  return (
    <ResourcePage
      title="Deliveries"
      description="Record trips, tanker allocation, driver assignment, quantity, and route details."
      endpoint="/deliveries/"
      entityName="Delivery"
      fields={fields}
      columns={columns}
      searchKeys={["id", "customer_id", "tanker_id", "driver_id", "destination", "source_plant"]}
    />
  );
}
