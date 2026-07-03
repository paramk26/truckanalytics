import ResourcePage, {
  type ColumnConfig,
  type FieldConfig,
} from "@/components/modules/ResourcePage";

const fields: FieldConfig[] = [
  { key: "company_name", label: "Company Name", required: true },
  { key: "contact_person", label: "Contact Person" },
  { key: "phone", label: "Phone" },
  { key: "gst_number", label: "GST Number" },
  { key: "address", label: "Address", type: "textarea" },
];

const columns: ColumnConfig[] = [
  { key: "company_name", label: "Customer" },
  { key: "contact_person", label: "Contact Person" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address" },
  { key: "is_active", label: "Status", kind: "boolean" },
];

export default function CustomersPage() {
  return (
    <ResourcePage
      title="Customers"
      description="Manage customer accounts, billing details, and contact information."
      endpoint="/customers/"
      entityName="Customer"
      fields={fields}
      columns={columns}
      searchKeys={["company_name", "contact_person", "phone", "gst_number", "address"]}
      statusKey="is_active"
    />
  );
}
