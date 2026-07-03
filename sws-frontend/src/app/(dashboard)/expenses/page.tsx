import ResourcePage, {
  type ColumnConfig,
  type FieldConfig,
} from "@/components/modules/ResourcePage";

const fields: FieldConfig[] = [
  { key: "customer_id", label: "Customer ID", type: "number", required: true },
  { key: "delivery_id", label: "Delivery ID", type: "number" },
  { key: "amount", label: "Amount", type: "number", required: true },
  { key: "expense_type", label: "Expense Type", type: "select", required: true, options: ["FUEL", "TOLL", "REPAIR", "ALLOWANCE", "OTHER"] },
  { key: "expense_date", label: "Expense Date", type: "date", required: true },
  { key: "description", label: "Description", type: "textarea" },
];

const columns: ColumnConfig[] = [
  { key: "expense_date", label: "Date", kind: "date" },
  { key: "customer_id", label: "Customer ID" },
  { key: "delivery_id", label: "Delivery ID" },
  { key: "expense_type", label: "Type" },
  { key: "amount", label: "Amount", kind: "currency" },
];

export default function ExpensesPage() {
  return (
    <ResourcePage
      title="Expenses"
      description="Capture trip and customer expenses for monthly billing and profitability checks."
      endpoint="/expenses/"
      entityName="Expense"
      fields={fields}
      columns={columns}
      searchKeys={["id", "customer_id", "delivery_id", "expense_type", "description"]}
    />
  );
}
