"use client";
import { useState, useEffect } from "react";

// ── RESPONSIVE HOOK ───────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

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
function SubCategoryList({ onView, onAdd, isMobile }) {
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
    <div style={{ flex: 1, overflowY: "auto", background: "#f9fafb", padding: isMobile ? "16px 14px" : "26px 28px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <h1 style={{ margin: 0, color: "#111", fontSize: isMobile ? 18 : 24 }}>Sub-Categories</h1>

        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e5e7eb", borderRadius: 7, background: "#fff", padding: "6px 12px", fontSize: 13, color: "#374151", cursor: "pointer" }}>
            All
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          <button
            onClick={onAdd}
            style={{
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "7px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              whiteSpace: "nowrap"
            }}
          >
            {isMobile ? "Add" : "Add Sub-Category"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? 10 : 14, marginBottom: 16 }}>
        {[
          { label: "Total Sub Categories", value: "33" },
          { label: "Total Bookings", value: "453" },
          { label: "Active Partners", value: "3230" }
        ].map(c => (
          <div key={c.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: isMobile ? "14px 16px" : "18px 22px" }}>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>{c.label}</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: isMobile ? "14px" : "16px 20px", marginBottom: 16 }}>
        <div style={{ color: "#374151", marginBottom: 14, fontSize: 13 }}>Filters</div>

        <div style={{ display: "flex", gap: isMobile ? 8 : 14, flexWrap: "wrap" }}>
          {[
            { label: "State", val: "Karnataka" },
            { label: "City", val: "Bengaluru" },
            { label: "Category", val: "All" },
            { label: "Sub-Category", val: "All" },
            { label: "Partner Status", val: "All" }
          ].map(f => (
            <div key={f.label} style={{ flex: isMobile ? "1 1 calc(50% - 8px)" : "0 0 auto" }}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 5 }}>{f.label}</div>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                border: "1px solid #e5e7eb",
                borderRadius: 7,
                background: "#fafafa",
                padding: "7px 12px",
                fontSize: 13,
                color: "#374151",
                cursor: "pointer",
                minWidth: isMobile ? 0 : 110
              }}>
                <span style={{ flex: 1 }}>{f.val}</span>

                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>

        {/* Table Header */}
        <div style={{ padding: isMobile ? "14px" : "14px 18px", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 12 }}>
            Sub-Category list
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>

            {/* Search */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              border: "1px solid #e5e7eb",
              borderRadius: 7,
              background: "#fafafa",
              padding: "6px 12px",
              flex: isMobile ? "1 1 100%" : 1
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search"
                style={{ border: "none", outline: "none", fontSize: 12, color: "#374151", background: "transparent", flex: 1 }}
              />
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e5e7eb", borderRadius: 7, background: "#fff", padding: "6px 12px", fontSize: 12, color: "#374151", cursor: "pointer", whiteSpace: "nowrap" }}>
                Status (All)
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              <button style={{ background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "7px 18px", cursor: "pointer", fontSize: 13 }}>
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE CARDS */}
        {isMobile ? (
          <div style={{ padding: "10px 14px" }}>
            {paginated.length === 0 ? (
              <div style={{ padding: 36, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>
                No sub-categories found.
              </div>
            ) : paginated.map((row, i) => (
              <div key={i} style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 10, padding: 14, marginBottom: 12 }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{row.subCategory}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{row.id}</div>
                  </div>

                  <StatusBadge status={row.status} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", marginBottom: 10 }}>
                  {[
                    { label: "Category", value: row.category },
                    { label: "Total Bookings", value: row.totalBookings },
                    { label: "Active Partners", value: row.activePartners }
                  ].map(r => (
                    <div key={r.label}>
                      <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 1 }}>{r.label}</div>
                      <div style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{r.value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 10, borderTop: "1px solid #f0f0f0" }}>
                  <button onClick={() => onView(row)} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "6px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (

          /* DESKTOP TABLE */

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                {["ID", "Sub-Category", "Category", "Total Bookings", "Active Partners", "Status", "Action"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginated.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f9fafb" }}>
                  <td style={{ padding: "12px 14px", color: "#374151" }}>{row.id}</td>
                  <td style={{ padding: "12px 14px", fontWeight: 500 }}>{row.subCategory}</td>
                  <td style={{ padding: "12px 14px" }}>{row.category}</td>
                  <td style={{ padding: "12px 14px" }}>{row.totalBookings}</td>
                  <td style={{ padding: "12px 14px" }}>{row.activePartners}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <StatusBadge status={row.status} />
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <button onClick={() => onView(row)} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "5px 18px", cursor: "pointer" }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        )}

      </div>
    </div>
  );
}
// ── SCREEN 2: SUB-CATEGORY DETAIL ─────────────────────────────────────────────
function SubCategoryDetail({ onBack, onEdit, isMobile }) {
  const [tab, setTab] = useState("Overview");
  const d = SUBCATEGORY_DETAIL;

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        background: "#f9fafb",
        padding: isMobile ? "16px 14px" : "26px 28px",
      }}
    >
      <h1 style={{ margin: "0 0 4px", color: "#111", fontSize: isMobile ? 18 : 24 }}>
        Sub-Category Details
      </h1>

      <Breadcrumb items={["Admin", "Sub-Category", "Plumber"]} />

      {/* MAIN LAYOUT */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? 14 : 18,
          alignItems: "flex-start",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* LEFT CARD */}
        <div
          style={{
            width: isMobile ? "100%" : 280,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: isMobile ? 16 : 20,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "100%",
              height: isMobile ? 120 : 140,
              background: "#f3f4f6",
              borderRadius: 8,
              marginBottom: 14,
            }}
          />

          <div
            style={{
              fontWeight: 700,
              fontSize: isMobile ? 14 : 15,
              color: "#111",
              marginBottom: 14,
            }}
          >
            {d.name}
          </div>

          {/* STATS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <div style={{ background: "#E6E6E6", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3 }}>
                Total Bookings
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>
                {d.totalBookings}
              </div>
              <div style={{ fontSize: 10, color: "#9ca3af" }}>
                Avg. rating : {d.avgRating}
              </div>
            </div>

            <div style={{ background: "#E6E6E6", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3 }}>
                Total Earned
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>
                {d.totalEarned}
              </div>
              <div style={{ fontSize: 10, color: "#9ca3af" }}>Lifetime</div>
            </div>
          </div>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <button
              onClick={onEdit}
              style={{
                flex: 1,
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: 7,
                padding: "9px 0",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Edit Sub-Category
            </button>

            <button
              style={{
                background: "#fff",
                color: "#374151",
                border: "1px solid #e5e7eb",
                borderRadius: 7,
                padding: "9px 12px",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Deactivate
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ flex: 1, width: "100%" }}>
          {/* TABS */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #e5e7eb",
              marginBottom: 16,
              overflowX: isMobile ? "auto" : "visible",
            }}
          >
            {["Overview", "Pricing & Analytics"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
               style={{
                padding: "9px 18px", background: "none", border: "none",
                backgroundColor: tab === t ? "#ffffff" : "transparent",
                cursor: "pointer", color: tab === t ? "#111" : "#6b7280",
                marginBottom: -1, whiteSpace: "nowrap", flexShrink: 0,
              }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* OVERVIEW TAB */}
          {tab === "Overview" && (
            <div
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                padding: isMobile ? 16 : "20px 24px",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#111",
                  marginBottom: 18,
                }}
              >
                Overview
              </div>

              {[
                { label: "Category", val: d.category },
                { label: "Sub-Category", val: d.subCategory },
                { label: "Total Partners", val: d.totalPartners },
                { label: "Status", val: d.status, green: true },
                { label: "Created On", val: d.createdOn },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    padding: "12px 0",
                    borderBottom: "1px solid #f9fafb",
                    gap: isMobile ? 4 : 16,
                  }}
                >
                  <div
                    style={{
                      width: isMobile ? "100%" : 140,
                      fontSize: 13,
                      color: "#9ca3af",
                      flexShrink: 0,
                    }}
                  >
                    {row.label}
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: row.green ? "#22c55e" : "#111",
                      fontWeight: row.green ? 600 : 400,
                    }}
                  >
                    {row.val}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PRICING TAB */}
          {tab === "Pricing & Analytics" && (
            <div
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                padding: isMobile ? 16 : "20px 24px",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#111",
                  marginBottom: 18,
                }}
              >
                Pricing & Analytics
              </div>

              {[
                { label: "Total Bookings", val: d.pricing.totalBookings },
                { label: "Conversion Rate", val: d.pricing.conversionRate },
                { label: "Cancel Rate", val: d.pricing.cancelRate },
                { label: "Revenue", val: d.pricing.revenue },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    padding: "12px 0",
                    borderBottom: "1px solid #f9fafb",
                    gap: isMobile ? 4 : 16,
                  }}
                >
                  <div
                    style={{
                      width: isMobile ? "100%" : 160,
                      fontSize: 13,
                      color: "#9ca3af",
                      flexShrink: 0,
                    }}
                  >
                    {row.label}
                  </div>

                  <div style={{ fontSize: 13, color: "#111", fontWeight: 500 }}>
                    {row.val}
                  </div>
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
function SubCategoryForm({ isEdit, onBack, isMobile }) {
  const [selectedCategory, setSelectedCategory] = useState(isEdit ? "AC Technician" : "");
  const [name, setName] = useState(isEdit ? "Title of your notification" : "");
  const [desc, setDesc] = useState(isEdit ? "Add a short description" : "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        background: "#f9fafb",
        padding: isMobile ? "16px 14px" : "26px 28px",
      }}
    >
      <h1
        style={{
          margin: "0 0 4px",
          fontSize: isMobile ? 18 : 22,
          fontWeight: 700,
          color: "#111",
        }}
      >
        {isEdit ? "Update Sub-Category" : "New Sub-Category"}
      </h1>

      <Breadcrumb
        items={
          isEdit
            ? ["Admin", "Sub-Category", "Edit Sub-Category"]
            : ["Admin", "Sub-Category", "Add Sub-Category"]
        }
      />

      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "flex-start",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* FORM CARD */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: isMobile ? "18px 16px" : "20px 24px",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: "#111",
              marginBottom: 22,
            }}
          >
            {isEdit ? "Update Sub-Category" : "Add Sub-Category"}
          </div>

          {/* CATEGORY */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginBottom: 18,
              alignItems: isMobile ? "flex-start" : "center",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <div
              style={{
                width: isMobile ? "100%" : 140,
                fontSize: 13,
                color: "#374151",
                flexShrink: 0,
              }}
            >
              Category
            </div>

            <div style={{ flex: 1, width: isMobile ? "100%" : "auto", position: "relative" }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: "100%",
                  border: "1px solid #e5e7eb",
                  borderRadius: 7,
                  padding: "8px 36px 8px 12px",
                  fontSize: 13,
                  color: selectedCategory ? "#374151" : "#9ca3af",
                  background: "#fafafa",
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled>
                  Select
                </option>
                {CATEGORY_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>

              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#aaa"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* NAME */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginBottom: 18,
              alignItems: isMobile ? "flex-start" : "center",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <div
              style={{
                width: isMobile ? "100%" : 140,
                fontSize: 13,
                color: "#374151",
                flexShrink: 0,
              }}
            >
              Sub-Category Name
            </div>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              style={{
                flex: 1,
                width: isMobile ? "100%" : "auto",
                border: "1px solid #e5e7eb",
                borderRadius: 7,
                padding: "8px 12px",
                fontSize: 13,
                color: "#374151",
                outline: "none",
                background: "#fafafa",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* DESCRIPTION */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginBottom: 8,
              alignItems: "flex-start",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <div
              style={{
                width: isMobile ? "100%" : 140,
                fontSize: 13,
                color: "#374151",
                paddingTop: isMobile ? 0 : 8,
                flexShrink: 0,
              }}
            >
              Description
            </div>

            <div style={{ flex: 1, width: isMobile ? "100%" : "auto" }}>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Enter description"
                rows={5}
                style={{
                  width: "100%",
                  border: "1px solid #e5e7eb",
                  borderRadius: 7,
                  padding: "8px 12px",
                  fontSize: 13,
                  color: "#374151",
                  outline: "none",
                  background: "#fafafa",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
                  142 Characters left
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  {["B", "I", "🔗", "≡"].map((t) => (
                    <button
                      key={t}
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: 13,
                        color: "#9ca3af",
                        cursor: "pointer",
                        padding: "2px 4px",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button
              onClick={() => setShowDeleteModal(true)}
              style={{
                background: "#fff",
                color: "#374151",
                border: "1px solid #e5e7eb",
                borderRadius: 7,
                padding: "8px 22px",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Delete
            </button>

            <button
              onClick={() => (isEdit ? setShowUpdateModal(true) : null)}
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: 7,
                padding: "8px 22px",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              {isEdit ? "Update Sub-Category" : "Add Sub-Category"}
            </button>
          </div>
        </div>

        {/* IMAGE CARD */}
        <div
          style={{
            width: isMobile ? "100%" : 220,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 4 }}>
              Sub-Category Image
            </div>

            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 14 }}>
              Add a photo of Sub-Category
            </div>

            {isEdit ? (
              <div
                style={{
                  width: "100%",
                  height: 140,
                  background: "#f3f4f6",
                  borderRadius: 8,
                  marginBottom: 12,
                }}
              />
            ) : (
              <div
                style={{
                  border: "2px dashed #e5e7eb",
                  borderRadius: 8,
                  height: 130,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fafafa",
                  cursor: "pointer",
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: 12, color: "#9ca3af" }}>
                  Select or Drop File
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{
                  flex: 1,
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 7,
                  padding: "8px 0",
                  fontSize: 12,
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>

              {isEdit ? (
                <button
                  style={{
                    flex: 1,
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    borderRadius: 7,
                    padding: "8px 0",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              ) : (
                <button
                  style={{
                    flex: 1,
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    borderRadius: 7,
                    padding: "8px 0",
                    cursor: "pointer",
                  }}
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

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

      {showUpdateModal && (
        <Modal
          title="Update Sub-Category"
          message="Do you want to Update this sub-category?"
          onCancel={() => setShowUpdateModal(false)}
          onConfirm={() => setShowUpdateModal(false)}
          confirmLabel="Update"
        />
      )}
    </div>
  );
}

// ── ROOT COMPONENT ─────────────────────────────────────────────────────────────
export default function SubCategory() {
  const isMobile = useIsMobile();
  const [screen, setScreen] = useState("list"); // list | detail | add | edit

  if (screen === "detail") return <SubCategoryDetail onBack={() => setScreen("list")} onEdit={() => setScreen("edit")} isMobile={isMobile}  />;
  if (screen === "add") return <SubCategoryForm isEdit={false} onBack={() => setScreen("list")} isMobile={isMobile} />;
  if (screen === "edit") return <SubCategoryForm isEdit={true} onBack={() => setScreen("detail")} isMobile={isMobile}  />;

  return <SubCategoryList onView={() => setScreen("detail")} onAdd={() => setScreen("add")}  isMobile={isMobile} />;
}
