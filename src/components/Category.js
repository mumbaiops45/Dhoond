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
const CATEGORIES_DATA = [
  { id: "#101", category: "Construction",  subCategories: "-",             totalBookings: "-",    activeServices: "-",   status: "Active"   },
  { id: "#101", category: "AC Technician", subCategories: "AC jet + foam", totalBookings: 3002,   activeServices: 345,   status: "Inactive" },
  { id: "#101", category: "AC Technician", subCategories: "AC jet + foam", totalBookings: 3002,   activeServices: 345,   status: "Active"   },
  { id: "#101", category: "AC Technician", subCategories: "AC jet + foam", totalBookings: 3002,   activeServices: 345,   status: "Active"   },
  { id: "#101", category: "AC Technician", subCategories: "AC jet + foam", totalBookings: 3002,   activeServices: 345,   status: "Active"   },
];

const CATEGORY_DETAIL = {
  name: "AC Technician", category: "AC Technician",
  subCategories: "AC jet + foam, AC jet + water, AC installation",
  totalPartners: 303, status: "Active", createdOn: "12 Aug 2025",
  totalBookings: 20, avgRating: 4.0, totalEarned: "₹33,450",
  pricing: { totalBookings: 456, conversionRate: "82%", cancelRate: "4.3%", revenue: "₹2.2 L" },
};

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
        <span key={i}>
          {i > 0 && <span style={{ margin: "0 4px" }}>/</span>}
          <span style={{ color: i === items.length - 1 ? "#9ca3af" : "#2563eb", cursor: i < items.length - 1 ? "pointer" : "default" }}>
            {item}
          </span>
        </span>
      ))}
    </div>
  );
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function Modal({ title, message, onCancel, onConfirm, confirmLabel, confirmDanger }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: 10, padding: "24px 28px", width: 340, maxWidth: "90vw", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", position: "relative" }}>
        <button onClick={onCancel} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", fontSize: 18, color: "#9ca3af", cursor: "pointer" }}>×</button>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 22 }}>{message}</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={onCancel} style={{ background: "#fff", border: "1px solid #000000", borderRadius: 7, padding: "8px 32px", fontSize: 13, cursor: "pointer", color: "#374151", fontWeight: 500 }}>Cancel</button>
          <button onClick={onConfirm} style={{ background: confirmDanger ? "#ef4444" : "#111", color: "#fff", border: "none", borderRadius: 7, padding: "8px 32px", cursor: "pointer" }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 1: CATEGORY LIST ───────────────────────────────────────────────────
function CategoryList({ onView, onAdd, isMobile }) {
  const [search, setSearch] = useState("");
  const [page, setPage]     = useState(1);
  const rowsPerPage         = 10;

  const filtered   = CATEGORIES_DATA.filter(c => c.category.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated  = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f9fafb", padding: isMobile ? "16px 14px" : "26px 28px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <h1 style={{ margin: 0, color: "#111", fontSize: isMobile ? 18 : 24 }}>Categories</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e5e7eb", borderRadius: 7, background: "#fff", padding: "6px 12px", fontSize: 13, color: "#374151", cursor: "pointer" }}>
            All
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
          <button onClick={onAdd} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "7px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, whiteSpace: "nowrap" }}>
            {isMobile ? "Add" : "Add Category"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? 10 : 14, marginBottom: 16 }}>
        {[
          { label: "Total Categories", value: "33" },
          { label: "Total Profession",  value: "453" },
          { label: "Total Services",    value: "3230" },
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
            { label: "State",          val: "Karnataka" },
            { label: "City",           val: "Bengaluru" },
            { label: "Category",       val: "All" },
            { label: "Sub-Category",   val: "All" },
            { label: "Partner Status", val: "All" },
          ].map(f => (
            <div key={f.label} style={{ flex: isMobile ? "1 1 calc(50% - 8px)" : "0 0 auto" }}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 5 }}>{f.label}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e5e7eb", borderRadius: 7, background: "#fafafa", padding: "7px 12px", fontSize: 13, color: "#374151", cursor: "pointer", minWidth: isMobile ? 0 : 110 }}>
                <span style={{ flex: 1 }}>{f.val}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: isMobile ? "14px" : "14px 18px", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 12 }}>Category list</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>

            {/* Search — full width on mobile */}
            <div style={{
              display: "flex", alignItems: "center", gap: 7, border: "1px solid #e5e7eb",
              borderRadius: 7, background: "#fafafa", padding: "6px 12px",
              flex: isMobile ? "1 1 100%" : 1,
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search"
                style={{ border: "none", outline: "none", fontSize: 12, color: "#374151", background: "transparent", flex: 1 }} />
            </div>

            {/* Status + Filter — inline, fixed width (never stretch) */}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e5e7eb", borderRadius: 7, background: "#fff", padding: "6px 12px", fontSize: 12, color: "#374151", cursor: "pointer", whiteSpace: "nowrap" }}>
                Status (All)
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
              <button style={{ background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "7px 18px", cursor: "pointer", fontSize: 13, whiteSpace: "nowrap" }}>Filter</button>
            </div>
          </div>
        </div>

        {/* ── MOBILE: category cards ── */}
        {isMobile ? (
          <div style={{ padding: "10px 14px" }}>
            {paginated.length === 0 ? (
              <div style={{ padding: 36, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>No categories found.</div>
            ) : paginated.map((row, i) => (
              <div key={i} style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 10, padding: 14, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{row.category}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{row.id}</div>
                  </div>
                  <StatusBadge status={row.status} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", marginBottom: 10 }}>
                  {[
                    { label: "Sub-Categories",  value: row.subCategories },
                    { label: "Total Bookings",   value: row.totalBookings },
                    { label: "Active Services",  value: row.activeServices },
                  ].map(r => (
                    <div key={r.label}>
                      <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 1 }}>{r.label}</div>
                      <div style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{r.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 10, borderTop: "1px solid #f0f0f0" }}>
                  <button onClick={() => onView(row)} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "6px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── DESKTOP: original table ── */
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                {["ID", "Category", "Sub-Categories", "Total Bookings", "Active Services", "Status", "Action"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f9fafb", transition: "background 0.1s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "12px 14px", color: "#374151" }}>{row.id}</td>
                  <td style={{ padding: "12px 14px", color: "#374151", fontWeight: 500 }}>{row.category}</td>
                  <td style={{ padding: "12px 14px", color: "#374151" }}>{row.subCategories}</td>
                  <td style={{ padding: "12px 14px", color: "#374151" }}>{row.totalBookings}</td>
                  <td style={{ padding: "12px 14px", color: "#374151" }}>{row.activeServices}</td>
                  <td style={{ padding: "12px 14px" }}><StatusBadge status={row.status} /></td>
                  <td style={{ padding: "12px 14px" }}>
                    <button onClick={() => onView(row)} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "5px 18px", cursor: "pointer" }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div style={{ padding: "11px 18px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12, fontSize: 12, color: "#6b7280", flexWrap: "wrap" }}>
          <span>Rows per page: 10</span>
          <span>{(page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, filtered.length)} of {filtered.length}</span>
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

// ── SCREEN 2: CATEGORY DETAIL ─────────────────────────────────────────────────
function CategoryDetail({ onBack, onEdit, isMobile }) {
  const [tab, setTab] = useState("Overview");
  const d = CATEGORY_DETAIL;

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f9fafb", padding: isMobile ? "16px 14px" : "26px 28px" }}>
      <h1 style={{ margin: "0 0 4px", fontSize: isMobile ? 18 : 22, fontWeight: 700, color: "#111" }}>Category Details</h1>
      <Breadcrumb items={["Admin", "Category", "Construction"]} />

      <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}>

        {/* Left Card */}
        <div style={{ width: isMobile ? "100%" : 260, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20, flexShrink: 0 }}>
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
            <button onClick={onEdit} style={{ flex: 1, background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "9px 0", cursor: "pointer", fontSize: 13 }}>Edit Category</button>
            <button style={{ background: "#fff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: 7, padding: "9px 14px", fontSize: 13, cursor: "pointer" }}>Deactivate</button>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, minWidth: 0, width: isMobile ? "100%" : "auto" }}>
          {/* Tabs — scrollable on mobile */}
          <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", marginBottom: 16, overflowX: "auto" }}>
            {["Overview", "Pricing & Analytics"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "9px 18px", background: "none", border: "none",
                backgroundColor: tab === t ? "#ffffff" : "transparent",
                cursor: "pointer", color: tab === t ? "#111" : "#6b7280",
                marginBottom: -1, whiteSpace: "nowrap", flexShrink: 0,
              }}>{t}</button>
            ))}
          </div>

          {tab === "Overview" && (
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "20px 24px" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 18 }}>Overview</div>
              {[
                { label: "Category",       val: d.category },
                { label: "Sub Categories", val: d.subCategories },
                { label: "Total Partners", val: d.totalPartners },
                { label: "Status",         val: d.status, green: true },
                { label: "Created On",     val: d.createdOn },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", padding: "12px 0", borderBottom: "1px solid #f9fafb", gap: 16, flexWrap: isMobile ? "wrap" : "nowrap" }}>
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
                { label: "Total Bookings",   val: d.pricing.totalBookings },
                { label: "Conversion Rate",  val: d.pricing.conversionRate },
                { label: "Cancel Rate",      val: d.pricing.cancelRate },
                { label: "Revenue",          val: d.pricing.revenue },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", padding: "12px 0", borderBottom: "1px solid #f9fafb", gap: 16, flexWrap: isMobile ? "wrap" : "nowrap" }}>
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

// ── SCREEN 3: ADD / EDIT CATEGORY ─────────────────────────────────────────────
function AddCategory({ onBack, isEdit, isMobile }) {
  const [name, setName]                   = useState(isEdit ? "Title of your notification" : "");
  const [desc, setDesc]                   = useState(isEdit ? "Add a short description" : "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f9fafb", padding: isMobile ? "16px 14px" : "26px 28px" }}>
      <h1 style={{ margin: "0 0 4px", fontSize: isMobile ? 18 : 22, fontWeight: 700, color: "#111" }}>
        {isEdit ? "Update Category" : "New Category"}
      </h1>
      <Breadcrumb items={isEdit ? ["Admin", "Category", "Edit Category"] : ["Admin", "Category", "Add Category"]} />

      <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}>

        {/* Form Card */}
        <div style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "20px 24px", width: isMobile ? "100%" : "auto" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 20 }}>
            {isEdit ? "Update Category" : "Add Category"}
          </div>

          {/* Category Name */}
          <div style={{ display: "flex", gap: 20, marginBottom: 20, alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}>
            <div style={{ width: isMobile ? "100%" : 130, fontSize: 13, color: "#374151", paddingTop: isMobile ? 0 : 8, flexShrink: 0 }}>Category Name</div>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter name"
              style={{ flex: 1, width: isMobile ? "100%" : "auto", border: "1px solid #e5e7eb", borderRadius: 7, padding: "8px 12px", fontSize: 13, color: "#374151", outline: "none", background: "#fafafa", boxSizing: "border-box" }} />
          </div>

          {/* Description */}
          <div style={{ display: "flex", gap: 20, marginBottom: 8, alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}>
            <div style={{ width: isMobile ? "100%" : 130, fontSize: 13, color: "#374151", paddingTop: isMobile ? 0 : 8, flexShrink: 0 }}>Description</div>
            <div style={{ flex: 1, width: isMobile ? "100%" : "auto" }}>
              <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Enter description" rows={5}
                style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 7, padding: "8px 12px", fontSize: 13, color: "#374151", outline: "none", background: "#fafafa", resize: "vertical", boxSizing: "border-box" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>142 Characters left</div>
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  {["B", "I", "🔗", "≡"].map(t => (
                    <button key={t} style={{ background: "none", border: "none", fontSize: 13, color: "#9ca3af", cursor: "pointer", padding: "2px 4px" }}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons — never stretch */}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={() => setShowDeleteModal(true)} style={{ background: "#fff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: 7, padding: "8px 22px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Delete</button>
            <button onClick={() => isEdit ? setShowUpdateModal(true) : null}
              style={{ background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "8px 22px", cursor: "pointer", fontSize: 13 }}>
              {isEdit ? "Update Category" : "Add Category"}
            </button>
          </div>
        </div>

        {/* Image Card */}
        <div style={{ width: isMobile ? "100%" : 220, flexShrink: 0 }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 4 }}>Category Image</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 14 }}>Add a photo of Category</div>
            <div style={{ border: "2px dashed #e5e7eb", borderRadius: 8, height: 130, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#fafafa", cursor: "pointer", marginBottom: 12 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>Select or Drop File</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 7, padding: "7px 0", fontSize: 12, color: "#374151", cursor: "pointer" }}>Delete</button>
              {isEdit
                ? <button style={{ flex: 1, background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "7px 0", cursor: "pointer", fontSize: 12 }}>Edit</button>
                : <button style={{ flex: 1, background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "7px 0", cursor: "pointer", fontSize: 12 }}>Upload</button>
              }
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <Modal title="Delete Category" message="Do you want to delete this category?" onCancel={() => setShowDeleteModal(false)} onConfirm={() => setShowDeleteModal(false)} confirmLabel="Delete" confirmDanger />
      )}
      {showUpdateModal && (
        <Modal title="Update Category" message="Do you want to Update this category?" onCancel={() => setShowUpdateModal(false)} onConfirm={() => setShowUpdateModal(false)} confirmLabel="Update" confirmDanger={false} />
      )}
    </div>
  );
}

// ── ROOT COMPONENT ────────────────────────────────────────────────────────────
export default function Category() {
  const isMobile = useIsMobile();
  const [screen, setScreen] = useState("list");

  if (screen === "detail") return <CategoryDetail onBack={() => setScreen("list")} onEdit={() => setScreen("edit")} isMobile={isMobile} />;
  if (screen === "add")    return <AddCategory onBack={() => setScreen("list")}   isEdit={false} isMobile={isMobile} />;
  if (screen === "edit")   return <AddCategory onBack={() => setScreen("detail")} isEdit={true}  isMobile={isMobile} />;

  return <CategoryList onView={() => setScreen("detail")} onAdd={() => setScreen("add")} isMobile={isMobile} />;
}