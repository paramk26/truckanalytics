import ResourcePage, {
  type ColumnConfig,
  type FieldConfig,
} from "@/components/modules/ResourcePage";

const fields: FieldConfig[] = [
  { key: "invoice_id", label: "Invoice ID", type: "number", required: true },
  { key: "payment_date", label: "Payment Date", type: "date", required: true },
  { key: "amount_received", label: "Amount Received", type: "number", required: true },
  { key: "payment_method", label: "Payment Method", type: "select", required: true, options: ["CASH", "UPI", "NEFT", "CHEQUE", "OTHER"] },
  { key: "reference_number", label: "Reference Number" },
  { key: "remarks", label: "Remarks", type: "textarea" },
];

const columns: ColumnConfig[] = [
  { key: "payment_date", label: "Date", kind: "date" },
  { key: "invoice_id", label: "Invoice ID" },
  { key: "amount_received", label: "Received", kind: "currency" },
  { key: "payment_method", label: "Method" },
  { key: "reference_number", label: "Reference" },
];

export default function PaymentsPage() {
  return (
    <ResourcePage
      title="Payments"
      description="Record invoice collections, payment methods, references, and collection remarks."
      endpoint="/payments/"
      entityName="Payment"
      fields={fields}
      columns={columns}
      searchKeys={["id", "invoice_id", "payment_method", "reference_number", "remarks"]}
    />
  );
}
