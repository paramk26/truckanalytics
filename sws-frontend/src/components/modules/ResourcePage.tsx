"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import api from "@/lib/api";

export type ResourceRecord = {
  id: number;
  [key: string]: unknown;
};

export type FieldConfig = {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  defaultValue?: string | number;
};

export type ColumnConfig = {
  key: string;
  label: string;
  kind?: "text" | "currency" | "date" | "status" | "boolean";
};

type ResourcePageProps = {
  title: string;
  description: string;
  endpoint: string;
  entityName: string;
  fields: FieldConfig[];
  columns: ColumnConfig[];
  searchKeys: string[];
  statusKey?: string;
};

const PAGE_SIZE = 8;

function emptyForm(fields: FieldConfig[]) {
  return fields.reduce<Record<string, string>>((acc, field) => {
    acc[field.key] = String(field.defaultValue ?? "");
    return acc;
  }, {});
}

function normalizeValue(field: FieldConfig, value: string) {
  if (field.type === "number") {
    if (!value && !field.required) {
      return null;
    }

    return Number(value);
  }

  if (field.type === "date" && !value) {
    return null;
  }

  return value || null;
}

function formatValue(row: ResourceRecord, column: ColumnConfig) {
  const value = row[column.key];

  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (column.kind === "currency") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(value));
  }

  if (column.kind === "date") {
    return new Date(String(value)).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  if (column.kind === "boolean") {
    return value ? "Active" : "Inactive";
  }

  return String(value);
}

function statusTone(value: unknown) {
  const normalized = String(value).toLowerCase();

  if (value === true || ["active", "paid", "completed"].includes(normalized)) {
    return "bg-emerald-50 text-emerald-700 border-emerald-100";
  }

  if (["pending", "due", "scheduled"].includes(normalized)) {
    return "bg-amber-50 text-amber-700 border-amber-100";
  }

  return "bg-slate-50 text-slate-700 border-slate-100";
}

export default function ResourcePage({
  title,
  description,
  endpoint,
  entityName,
  fields,
  columns,
  searchKeys,
  statusKey,
}: ResourcePageProps) {
  const [records, setRecords] = useState<ResourceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ResourceRecord | null>(null);
  const [form, setForm] = useState<Record<string, string>>(() =>
    emptyForm(fields)
  );

  const loadRecords = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get<ResourceRecord[]>(endpoint);
      setRecords(response.data);
    } catch (err) {
      setError("Could not load records. Check the backend server and login token.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    queueMicrotask(() => {
      void loadRecords();
    });
  }, [loadRecords]);

  const statusValues = useMemo(() => {
    if (!statusKey) {
      return [];
    }

    return Array.from(
      new Set(records.map((record) => String(record[statusKey])))
    ).filter(Boolean);
  }, [records, statusKey]);

  const filtered = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    return records.filter((record) => {
      const matchesQuery =
        !lowerQuery ||
        searchKeys.some((key) =>
          String(record[key] ?? "").toLowerCase().includes(lowerQuery)
        );

      const matchesStatus =
        statusFilter === "all" ||
        (statusKey && String(record[statusKey]) === statusFilter);

      return matchesQuery && matchesStatus;
    });
  }, [query, records, searchKeys, statusFilter, statusKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRecords = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm(fields));
    setOpen(true);
  };

  const openEdit = (record: ResourceRecord) => {
    setEditing(record);
    setForm(
      fields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = String(record[field.key] ?? field.defaultValue ?? "");
        return acc;
      }, {})
    );
    setOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = fields.reduce<Record<string, unknown>>((acc, field) => {
      acc[field.key] = normalizeValue(field, form[field.key] ?? "");
      return acc;
    }, {});

    try {
      if (editing) {
        await api.put(`${endpoint}${editing.id}`, payload);
      } else {
        await api.post(endpoint, payload);
      }

      setOpen(false);
      await loadRecords();
    } catch (err) {
      setError("Save failed. Confirm required fields and admin permissions.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (record: ResourceRecord) => {
    const label = String(
      record.company_name ??
        record.registration_number ??
        record.name ??
        record.invoice_number ??
        `${entityName} #${record.id}`
    );

    if (!window.confirm(`Delete ${label}?`)) {
      return;
    }

    setError("");

    try {
      await api.delete(`${endpoint}${record.id}`);
      await loadRecords();
    } catch (err) {
      setError("Delete failed. Confirm admin permissions and related records.");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal">{title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={loadRecords}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#ECEEF3] bg-white text-[#141414] transition hover:bg-[#F6F7FB]"
            title="Refresh"
          >
            <RefreshCw size={18} />
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-[#4F6EF7] px-5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <Plus size={18} />
            Add {entityName}
          </button>
        </div>
      </div>

      <div className="rounded-[28px] border border-[#ECEEF3] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="flex h-12 flex-1 items-center gap-3 rounded-2xl border border-[#ECEEF3] bg-[#F6F7FB] px-4">
            <Search size={18} className="text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>

          {statusKey && (
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setPage(1);
              }}
              className="h-12 rounded-2xl border border-[#ECEEF3] bg-white px-4 text-sm outline-none"
            >
              <option value="all">All status</option>
              {statusValues.map((value) => (
                <option key={value} value={value}>
                  {value === "true" ? "Active" : value === "false" ? "Inactive" : value}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle size={18} />
          {error}
        </div>
      )}

      <div className="rounded-[28px] border border-[#ECEEF3] bg-white p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#ECEEF3] text-xs uppercase text-muted-foreground">
                {columns.map((column) => (
                  <th key={column.key} className="px-3 py-4 font-semibold">
                    {column.label}
                  </th>
                ))}
                <th className="px-3 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-3 py-10 text-center" colSpan={columns.length + 1}>
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      <Loader2 size={18} className="animate-spin" />
                      Loading records
                    </span>
                  </td>
                </tr>
              ) : pageRecords.length ? (
                pageRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-[#F1F3F8] transition hover:bg-[#FAFBFF]"
                  >
                    {columns.map((column) => {
                      const value = record[column.key];

                      return (
                        <td key={column.key} className="px-3 py-4">
                          {column.kind === "status" || column.kind === "boolean" ? (
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusTone(
                                value
                              )}`}
                            >
                              {formatValue(record, column)}
                            </span>
                          ) : (
                            <span className="font-medium text-[#141414]">
                              {formatValue(record, column)}
                            </span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-3 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(record)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#ECEEF3] text-[#4F6EF7] transition hover:bg-[#EDF2FF]"
                          title="Edit"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(record)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 text-red-600 transition hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-3 py-10 text-center text-muted-foreground" colSpan={columns.length + 1}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-[#ECEEF3] pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            Showing {pageRecords.length} of {filtered.length} records
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#ECEEF3] bg-white text-[#141414] disabled:opacity-40"
              title="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="min-w-20 text-center">
              {page} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#ECEEF3] bg-white text-[#141414] disabled:opacity-40"
              title="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">
                  {editing ? `Edit ${entityName}` : `Add ${entityName}`}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {editing ? "Update the selected record." : "Create a new operational record."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#ECEEF3] text-[#141414]"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {fields.map((field) => (
                <label
                  key={field.key}
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <span className="mb-2 block text-sm font-medium text-[#141414]">
                    {field.label}
                  </span>
                  {field.type === "textarea" ? (
                    <textarea
                      value={form[field.key] ?? ""}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          [field.key]: event.target.value,
                        }))
                      }
                      required={field.required}
                      placeholder={field.placeholder}
                      className="min-h-28 w-full rounded-2xl border border-[#ECEEF3] bg-white px-4 py-3 text-sm outline-none focus:border-[#4F6EF7]"
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={form[field.key] ?? ""}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          [field.key]: event.target.value,
                        }))
                      }
                      required={field.required}
                      className="h-12 w-full rounded-2xl border border-[#ECEEF3] bg-white px-4 text-sm outline-none focus:border-[#4F6EF7]"
                    >
                      <option value="">Select</option>
                      {(field.options ?? []).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type ?? "text"}
                      value={form[field.key] ?? ""}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          [field.key]: event.target.value,
                        }))
                      }
                      required={field.required}
                      placeholder={field.placeholder}
                      className="h-12 w-full rounded-2xl border border-[#ECEEF3] bg-white px-4 text-sm outline-none focus:border-[#4F6EF7]"
                    />
                  )}
                </label>
              ))}

              <div className="flex flex-col-reverse gap-3 pt-3 md:col-span-2 md:flex-row md:justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-11 rounded-2xl border border-[#ECEEF3] px-5 text-sm font-semibold text-[#141414]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#4F6EF7] px-5 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  Save {entityName}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
