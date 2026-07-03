import ResourcePage, {
  type ColumnConfig,
  type FieldConfig,
} from "@/components/modules/ResourcePage";

const fields: FieldConfig[] = [
  { key: "customer_id", label: "Customer ID", type: "number", required: true },
  { key: "invoice_number", label: "Invoice Number", required: true },
  { key: "invoice_type", label: "Invoice Type", type: "select", required: true, options: ["MONTHLY", "TRIP", "CUSTOM"] },
  { key: "start_date", label: "Start Date", type: "date", required: true },
  { key: "end_date", label: "End Date", type: "date", required: true },
  { key: "subtotal", label: "Subtotal", type: "number", defaultValue: 0 },
  { key: "expense_total", label: "Expense Total", type: "number", defaultValue: 0 },
  { key: "gst_amount", label: "GST Amount", type: "number", defaultValue: 0 },
  { key: "grand_total", label: "Grand Total", type: "number", defaultValue: 0 },
  { key: "payment_status", label: "Payment Status", type: "select", defaultValue: "PENDING", options: ["PENDING", "PARTIAL", "PAID", "OVERDUE"] },
  { key: "generated_date", label: "Generated Date", type: "date", required: true },
  { key: "remarks", label: "Remarks", type: "textarea" },
];

const columns: ColumnConfig[] = [
  { key: "invoice_number", label: "Invoice" },
  { key: "customer_id", label: "Customer ID" },
  { key: "invoice_type", label: "Type" },
  { key: "generated_date", label: "Generated", kind: "date" },
  { key: "grand_total", label: "Total", kind: "currency" },
  { key: "payment_status", label: "Status", kind: "status" },
];

export default function InvoicesPage() {
  return (
    <ResourcePage
      title="Invoices"
      description="Generate and track billing records, GST totals, remarks, and payment status."
      endpoint="/invoices/"
      entityName="Invoice"
      fields={fields}
      columns={columns}
      searchKeys={["invoice_number", "customer_id", "invoice_type", "payment_status", "remarks"]}
      statusKey="payment_status"
    />
  );
}
