"use client";
import { useState } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const SUBCATEGORIES_DATA = [
  { id: "#101", subCategory: "AC jet + foam", category: "AC Technician", totalBookings: 2345, activePartners: 23, status: "Active" },
  { id: "#101", subCategory: "AC jet + foam", category: "AC Technician", totalBookings: 2345, activePartners: 23, status: "Active" },
  { id: "#101", subCategory: "AC jet + foam", category: "AC Technician", totalBookings: 2345, activePartners: 23, status: "Inactive" },
  { id: "#101", subCategory: "AC jet + foam", category: "AC Technician", totalBookings: 2345, activePartners: 23, status: "Active" },
  { id: "#101", subCategory: "AC jet + foam", category: "AC Technician", totalBookings: 2345, activePartners: 23, status: "Active" },
  { id: "#101", subCategory: "AC jet + foam", category: "AC Technician", totalBookings: 2345, activePartners: 23, status: "Active" },
];

const SUBCATEGORY_DETAIL = {
  name: "AC jet + foam",
  category: "AC Technician",
  subCategory: "AC jet + foam",
  totalPartners: 303,
  status: "Active",
  createdOn: "12 Aug 2025",
  totalBookings: 20,
  avgRating: 4.6,
  totalEarned: "₹33,450",
  pricing: {
    totalBookings: 456,
    conversionRate: "82%",
    cancelRate: "4.3%",
    revenue: "₹2.2 L",
  },
};

const CATEGORY_OPTIONS = ["AC Technician", "Plumber", "Electrician", "Carpenter", "Painter"];

// ── HELPERS ───────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const active = status === "Active";
  return (
    <span style={{
      display: "inline-block", padding: "3px 14px", borderRadius: 5,
      fontSize: 12, fontWeight: 600,
      background: active ? "#22c55e" : "#e5e7eb",
      color: active ? "#fff" : "#6b7280",
    }}>
      {status}
    </span>
  );
}

function Breadcrumb({ items }) {
  return (
    <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 20, display: "flex", gap: 4, flexWrap: "wrap" }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {i > 0 && <span style={{ color: "#d1d5db" }}>/</span>}
          <span style={{ color: i === items.length - 1 ? "#9ca3af" : "#2563eb", cursor: i < items.length - 1 ? "pointer" : "default" }}>
            {item}
          </span>
        </span>
      ))}
    </div>
  );
}

function Modal({ title, message, onCancel, onConfirm, confirmLabel, confirmDanger }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: 10, padding: "24px 28px", width: 340, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", position: "relative" }}>
        <button onClick={onCancel} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", fontSize: 18, color: "#9ca3af", cursor: "pointer" }}>×</button>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 22 }}>{message}</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={onCancel} style={{ background: "#fff", border: "1px solid #000000", borderRadius: 7, padding: "8px 52px", fontSize: 13, cursor: "pointer", color: "#374151", fontWeight: 500 }}>Cancel</button>
          <button onClick={onConfirm} style={{ background: confirmDanger ? "#ef4444" : "#111", color: "#fff", border: "none", borderRadius: 7, padding: "8px 52px", cursor: "pointer" }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 1: SUB-CATEGORY LIST ───────────────────────────────────────────────
function SubCategoryList({ onView, onAdd }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const filtered = SUBCATEGORIES_DATA.filter(c =>
    c.subCategory.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f9fafb", padding: "26px 28px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0, color: "#111" }}>Sub-Categories</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e5e7eb", borderRadius: 7, background: "#fff", padding: "6px 12px", fontSize: 13, color: "#374151", cursor: "pointer" }}>
            All
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
          <button onClick={onAdd} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "7px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            Add Sub-Category
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 16 }}>
        {[
          { label: "Total Categories", value: "33" },
          { label: "Total Profession", value: "453" },
          { label: "Total Services", value: "3230" },
        ].map(c => (
          <div key={c.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px 22px" }}>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>{c.label}</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
        <div style={{ color: "#374151", marginBottom: 14 }}>Filters</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[
            { label: "State", val: "Karnataka" },
            { label: "City", val: "Bengaluru" },
            { label: "Category", val: "All" },
            { label: "Sub-Category", val: "All" },
            { label: "Partner Status", val: "All" },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 5 }}>{f.label}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e5e7eb", borderRadius: 7, background: "#fafafa", padding: "7px 12px", fontSize: 13, color: "#374151", cursor: "pointer", minWidth: 110 }}>
                <span style={{ flex: 1 }}>{f.val}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 12 }}>Sub-Category list</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, border: "1px solid #e5e7eb", borderRadius: 7, background: "#fafafa", padding: "6px 12px", flex: 1 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search"
                style={{ border: "none", outline: "none", fontSize: 12, color: "#374151", background: "transparent", flex: 1 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e5e7eb", borderRadius: 7, background: "#fff", padding: "6px 12px", fontSize: 12, color: "#374151", cursor: "pointer", whiteSpace: "nowrap" }}>
              Status (All)
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
            <button style={{ background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "7px 22px", cursor: "pointer" }}>Filter</button>
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
              {["ID", "Sub-Category", "Category", "Total Bookings", "Active Partners", "Status", "Action"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr key={i}
                style={{ borderBottom: "1px solid #f9fafb", transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "12px 14px", color: "#374151" }}>{row.id}</td>
                <td style={{ padding: "12px 14px", color: "#374151", fontWeight: 500 }}>{row.subCategory}</td>
                <td style={{ padding: "12px 14px", color: "#374151" }}>{row.category}</td>
                <td style={{ padding: "12px 14px", color: "#374151" }}>{row.totalBookings}</td>
                <td style={{ padding: "12px 14px", color: "#374151" }}>{row.activePartners}</td>
                <td style={{ padding: "12px 14px" }}><StatusBadge status={row.status} /></td>
                <td style={{ padding: "12px 14px" }}>
                  <button onClick={() => onView(row)} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "5px 18px", cursor: "pointer" }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ padding: "11px 18px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12, fontSize: 12, color: "#6b7280" }}>
          <span>Rows per page: 10</span>
          <span>1-{Math.min(rowsPerPage, filtered.length)} of {filtered.length}</span>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: 5, padding: "3px 7px", cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.4 : 1, display: "flex", alignItems: "center" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
            style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: 5, padding: "3px 7px", cursor: page >= totalPages ? "not-allowed" : "pointer", opacity: page >= totalPages ? 0.4 : 1, display: "flex", alignItems: "center" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 2: SUB-CATEGORY DETAIL ─────────────────────────────────────────────
function SubCategoryDetail({ onBack, onEdit }) {
  const [tab, setTab] = useState("Overview");
  const d = SUBCATEGORY_DETAIL;

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f9fafb", padding: "26px 28px" }}>
      <h1 style={{ margin: "0 0 4px", color: "#111" }}>Sub-Category Details</h1>
      <Breadcrumb items={["Admin", "Sub-Category", "Plumber"]} />

      <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>

        {/* Left Card */}
        <div style={{ width: 280, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20, flexShrink: 0 }}>
          <div style={{ width: "100%", height: 140, background: "#f3f4f6", borderRadius: 8, marginBottom: 14 }} />
          <div style={{ fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 14 }}>{d.name}</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            <div style={{ background: "#E6E6E6", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3 }}>Total Bookings</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>{d.totalBookings}</div>
              <div style={{ fontSize: 10, color: "#9ca3af" }}>Avg. rating : {d.avgRating}</div>
            </div>
            <div style={{ background: "#E6E6E6", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3 }}>Total Earned</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>{d.totalEarned}</div>
              <div style={{ fontSize: 10, color: "#9ca3af" }}>Lifetime</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onEdit} style={{ flex: 1, background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "9px 0", cursor: "pointer" }}>Edit Sub-Category</button>
            <button style={{ background: "#fff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: 7, padding: "9px 12px", fontSize: 13, cursor: "pointer" }}>Deactivate</button>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", marginBottom: 16 }}>
            {["Overview", "Pricing & Analytics"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "9px 20px", background: "none", border: "none",
                borderBottom: tab === t ? "2px solid #111" : "2px solid transparent",
                cursor: "pointer", fontSize: 13,
                fontWeight: tab === t ? 600 : 400,
                color: tab === t ? "#111" : "#6b7280",
                marginBottom: -1,
              }}>{t}</button>
            ))}
          </div>

          {tab === "Overview" && (
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "20px 24px" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 18 }}>Overview</div>
              {[
                { label: "Category", val: d.category },
                { label: "Sub-Category", val: d.subCategory },
                { label: "Total Partners", val: d.totalPartners },
                { label: "Status", val: d.status, green: true },
                { label: "Created On", val: d.createdOn },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", padding: "12px 0", borderBottom: "1px solid #f9fafb", gap: 16 }}>
                  <div style={{ width: 140, fontSize: 13, color: "#9ca3af", flexShrink: 0 }}>{row.label}</div>
                  <div style={{ fontSize: 13, color: row.green ? "#22c55e" : "#111", fontWeight: row.green ? 600 : 400 }}>{row.val}</div>
                </div>
              ))}
            </div>
          )}

          {tab === "Pricing & Analytics" && (
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "20px 24px" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 18 }}>Pricing & Analytics</div>
              {[
                { label: "Total Bookings", val: d.pricing.totalBookings },
                { label: "Conversion Rate", val: d.pricing.conversionRate },
                { label: "Cancel Rate", val: d.pricing.cancelRate },
                { label: "Revenue", val: d.pricing.revenue },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", padding: "12px 0", borderBottom: "1px solid #f9fafb", gap: 16 }}>
                  <div style={{ width: 160, fontSize: 13, color: "#9ca3af", flexShrink: 0 }}>{row.label}</div>
                  <div style={{ fontSize: 13, color: "#111", fontWeight: 500 }}>{row.val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 3 & 4: ADD / UPDATE SUB-CATEGORY ───────────────────────────────────
function SubCategoryForm({ isEdit, onBack }) {
  const [selectedCategory, setSelectedCategory] = useState(isEdit ? "AC Technician" : "");
  const [name, setName] = useState(isEdit ? "Title of your notification" : "");
  const [desc, setDesc] = useState(isEdit ? "Add a short description" : "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f9fafb", padding: "26px 28px" }}>
      <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#111" }}>
        {isEdit ? "Update Sub-Category" : "New Sub-Category"}
      </h1>
      <Breadcrumb items={isEdit
        ? ["Admin", "Sub-Category", "Edit Sub-Category"]
        : ["Admin", "Sub-Category", "Add Sub-Category"]}
      />

      <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>

        {/* Form Card */}
        <div style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "20px 24px" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 22 }}>
            {isEdit ? "Update Sub-Category" : "Add Sub-Category"}
          </div>

          {/* Category Dropdown */}
          <div style={{ display: "flex", gap: 20, marginBottom: 18, alignItems: "center" }}>
            <div style={{ width: 140, fontSize: 13, color: "#374151", flexShrink: 0 }}>Category</div>
            <div style={{ flex: 1, position: "relative" }}>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                style={{
                  width: "100%", border: "1px solid #e5e7eb", borderRadius: 7,
                  padding: "8px 36px 8px 12px", fontSize: 13, color: selectedCategory ? "#374151" : "#9ca3af",
                  background: "#fafafa", outline: "none", appearance: "none", cursor: "pointer",
                }}
              >
                <option value="" disabled>Select</option>
                {CATEGORY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round"
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Sub-Category Name */}
          <div style={{ display: "flex", gap: 20, marginBottom: 18, alignItems: "center" }}>
            <div style={{ width: 140, fontSize: 13, color: "#374151", flexShrink: 0 }}>Sub-Category Name</div>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter name"
              style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: 7, padding: "8px 12px", fontSize: 13, color: "#374151", outline: "none", background: "#fafafa" }}
            />
          </div>

          {/* Description */}
          <div style={{ display: "flex", gap: 20, marginBottom: 8, alignItems: "flex-start" }}>
            <div style={{ width: 140, fontSize: 13, color: "#374151", flexShrink: 0, paddingTop: 8 }}>Description</div>
            <div style={{ flex: 1 }}>
              <textarea
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder="Enter description"
                rows={5}
                style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 7, padding: "8px 12px", fontSize: 13, color: "#374151", outline: "none", background: "#fafafa", resize: "vertical", boxSizing: "border-box" }}
              />
              <div className="flex justify-between">
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>142 Characters left</div>
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  {["B", "I", "🔗", "≡"].map(t => (
                    <button key={t} style={{ background: "none", border: "none", fontSize: 13, color: "#9ca3af", cursor: "pointer", padding: "2px 4px" }}>{t}</button>
                  ))}
                </div>

              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={() => setShowDeleteModal(true)} style={{ background: "#fff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: 7, padding: "8px 22px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Delete</button>
            <button onClick={() => isEdit ? setShowUpdateModal(true) : null} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "8px 22px", cursor: "pointer" }}>
              {isEdit ? "Update Sub-Category" : "Add Sub-Category"}
            </button>
          </div>
        </div>

        {/* Image Card */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "20px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 4 }}>Sub-Category Image</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 14 }}>Add a photo of Sub-Category</div>

            {isEdit ? (
              /* Edit mode: show grey image box */
              <div style={{ width: "100%", height: 140, background: "#f3f4f6", borderRadius: 8, marginBottom: 12 }} />
            ) : (
              /* Add mode: dashed drop zone */
              <div style={{
                border: "2px dashed #e5e7eb", borderRadius: 8, height: 130,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                background: "#fafafa", cursor: "pointer", marginBottom: 12,
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>Select or Drop File</div>
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 7, padding: "8px 0", fontSize: 12, color: "#374151", cursor: "pointer" }}>Delete</button>
              {isEdit
                ? <button style={{ flex: 1, background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "8px 0", cursor: "pointer" }}>Edit</button>
                : <button style={{ width: "100%", background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "9px 0", cursor: "pointer", marginTop: 4 }}>Upload</button>
              }
            </div>
            {!isEdit && (
              <button style={{ width: "100%", background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "9px 0", cursor: "pointer", marginTop: 8 }}>Upload</button>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <Modal
          title="Delete Sub-Category"
          message="Do you want to delete this sub-category?"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => setShowDeleteModal(false)}
          confirmLabel="Delete"
          confirmDanger
        />
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <Modal
          title="Update Sub-Category"
          message="Do you want to Update this sub-category?"
          onCancel={() => setShowUpdateModal(false)}
          onConfirm={() => setShowUpdateModal(false)}
          confirmLabel="Update"
          confirmDanger={false}
        />
      )}
    </div>
  );
}

// ── ROOT COMPONENT ─────────────────────────────────────────────────────────────
export default function SubCategory() {
  const [screen, setScreen] = useState("list"); // list | detail | add | edit

  if (screen === "detail") return <SubCategoryDetail onBack={() => setScreen("list")} onEdit={() => setScreen("edit")} />;
  if (screen === "add") return <SubCategoryForm isEdit={false} onBack={() => setScreen("list")} />;
  if (screen === "edit") return <SubCategoryForm isEdit={true} onBack={() => setScreen("detail")} />;

  return <SubCategoryList onView={() => setScreen("detail")} onAdd={() => setScreen("add")} />;
}
