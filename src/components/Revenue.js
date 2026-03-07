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

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

// ── DATA — dateOnly added for filtering ───────────────────────────────────────
const chartData = [
  { name: "Plumbing",    partner: 55, company: 30 },
  { name: "Electrical",  partner: 80, company: 40 },
  { name: "Carpentry",   partner: 95, company: 55 },
  { name: "Cleaning",    partner: 70, company: 48 },
  { name: "Cleaning",    partner: 82, company: 45 },
  { name: "Cleaning",    partner: 75, company: 42 },
];

const TABLE_DATA = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  date: i < 4 ? "2025-08-09" : i < 8 ? "2025-08-10" : "2025-08-11",
  category: "Construction & Building Work",
  subcategory: "Carpenter",
  bookings: 40,
  revenue: "₹48,000",
  commission: "₹9,600",
  payout: "₹36,000",
  taxes: "₹2,400",
}));

// ── TOOLTIP ───────────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 7, padding: "8px 14px", fontSize: 12, color: "#374151", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <div style={{ fontWeight: 700, marginBottom: 4, color: "#111" }}>{label}</div>
        {payload.map(p => (
          <div key={p.dataKey} style={{ color: p.color }}>
            {p.dataKey === "partner" ? "Partner Payout" : "Company Margin"}: {p.value}%
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// ── CALENDAR ICON ─────────────────────────────────────────────────────────────
function CalendarIcon({ color = "#9ca3af" }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Revenue() {
  const isMobile = useIsMobile();
  const [search, setSearch]       = useState("");
  const [page, setPage]           = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ── DATE FILTER STATE ──────────────────────────────────────────────────────
  const [pendingDate, setPendingDate] = useState("");
  const [activeDate, setActiveDate]   = useState("");

  const handleFilter = () => {
    setActiveDate(pendingDate);
    setPage(1);
  };

  const handleClearDate = () => {
    setPendingDate("");
    setActiveDate("");
    setPage(1);
  };

  // ── FILTER LOGIC — includes date ───────────────────────────────────────────
  const filtered = TABLE_DATA.filter(r => {
    const matchSearch = r.category.toLowerCase().includes(search.toLowerCase()) ||
                        r.subcategory.toLowerCase().includes(search.toLowerCase());
    const matchDate   = !activeDate || r.date === activeDate;
    return matchSearch && matchDate;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated  = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const controlBase = {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e5e7eb",
    borderRadius: 7,
    padding: "7px 12px",
    background: "#fafafa",
    fontSize: 12,
    color: "#374151",
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f7f8fa", padding: isMobile ? "16px 14px" : "28px 32px" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, color: "#111", fontSize: isMobile ? 18 : 24 }}>Revenue</h1>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e5e7eb", borderRadius: 7, background: "#fff", padding: "6px 12px", fontSize: 13, color: "#374151", cursor: "pointer" }}>
            All
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <button style={{ background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            Export CSV
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? 10 : 14, marginBottom: 22 }}>
        {[
          { label: "Total Revenue",     value: "₹1,33,345", badge: "-37%", badgeColor: "#ef4444" },
          { label: "Pending Payments",  value: "₹1,33,345", badge: null },
          { label: "Platform Earnings", value: "₹33,345",   badge: "-37%", badgeColor: "#ef4444" },
        ].map(c => (
          <div key={c.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: isMobile ? "14px 16px" : "18px 22px" }}>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>{c.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: 20, fontWeight: 500, color: "#111", letterSpacing: "-0.5px" }}>{c.value}</span>
              {c.badge && <span style={{ fontSize: 12, fontWeight: 600, color: c.badgeColor }}>{c.badge}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      {isMobile ? (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 14px" }}>
          <div style={{ fontSize: 13, color: "#374151", fontWeight: 600, marginBottom: 14 }}>Filters</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "State", val: "Karnataka" },
              { label: "City", val: "Bengaluru" },
              { label: "Category", val: "All" },
              { label: "Sub-Category", val: "All" },
              { label: "SKU", val: "All" },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{f.label}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e5e7eb", borderRadius: 7, background: "#fafafa", padding: "7px 10px", fontSize: 12, color: "#374151", cursor: "pointer", width: "100%" }}>
                  <span style={{ flex: 1 }}>{f.val}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 13, color: "#374151", fontWeight: 600, marginBottom: 14 }}>Filters</div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-end" }}>
            {[
              { label: "State", val: "Karnataka" },
              { label: "City", val: "Bengaluru" },
              { label: "Category", val: "All" },
              { label: "Sub-Category", val: "All" },
              { label: "SKU", val: "All" },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 5 }}>{f.label}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e5e7eb", borderRadius: 7, background: "#fafafa", padding: "6px 10px", fontSize: 12, color: "#374151", cursor: "pointer", minWidth: 100 }}>
                  <span style={{ flex: 1 }}>{f.val}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Chart ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontWeight: 600, fontSize: 13, color: "#111" }}>Partner payout share vs. company margin</span>
          <div style={{ display: "flex", gap: 18, fontSize: 12, color: "#6b7280" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: "#38bdf8" }} />Partner Payout %
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: "#fb923c" }} />Company Margin %
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} barCategoryGap="15%" barGap={3}>
            <CartesianGrid vertical={false} stroke="#f3f4f6" strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: "#000000", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#000000", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
            <Bar dataKey="partner" fill="#38bdf8" radius={[3, 3, 0, 0]} />
            <Bar dataKey="company" fill="#fb923c" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Revenue Table ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10 }}>

        {/* Controls */}
        <div style={{ background: "#f7f8fa", padding: isMobile ? "16px 14px" : "16px 20px" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 12 }}>Revenue</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>

            {/* Search */}
            <div style={{ ...controlBase, gap: 8, flex: isMobile ? "1 1 100%" : "0 0 auto", minWidth: isMobile ? 0 : 200 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search"
                style={{ border: "none", outline: "none", fontSize: 12, color: "#374151", background: "transparent", flex: 1 }}
              />
            </div>

            {/* Categories */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e5e7eb", borderRadius: 7, background: "#fff", padding: "6px 12px", fontSize: 12, color: "#374151", cursor: "pointer", whiteSpace: "nowrap" }}>
              Categories (All)
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* ── DATE PICKER — desktop only ── */}
            {!isMobile && (
              <div style={{
                ...controlBase,
                gap: 7,
                cursor: "pointer",
                borderColor: activeDate ? "#111" : "#e5e7eb",
                background: activeDate ? "#f9fafb" : "#fafafa",
              }}>
                <CalendarIcon color={activeDate ? "#374151" : "#9ca3af"} />
                <input
                  type="date"
                  value={pendingDate}
                  onChange={e => setPendingDate(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: 12,
                    color: pendingDate ? "#374151" : "#9ca3af",
                    background: "transparent",
                    cursor: "pointer",
                    width: 110,
                    WebkitAppearance: "none",
                  }}
                />
                {(pendingDate || activeDate) && (
                  <button
                    onClick={handleClearDate}
                    title="Clear date filter"
                    style={{ border: "none", background: "none", padding: "0 2px", cursor: "pointer", color: "#9ca3af", fontSize: 15, lineHeight: 1, display: "flex", alignItems: "center" }}
                  >
                    ×
                  </button>
                )}
              </div>
            )}

            {/* Filter button */}
            <button
              onClick={handleFilter}
              style={{ background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "7px 22px", fontSize: 12, fontWeight: 600, cursor: "pointer", flex: isMobile ? "1 1 auto" : "0 0 auto" }}
            >
              Filter
            </button>

            {/* Active date badge */}
            {activeDate && (
              <span style={{ fontSize: 12, color: "#374151", background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 5, padding: "4px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                📅 {activeDate}
                <button onClick={handleClearDate} style={{ border: "none", background: "none", cursor: "pointer", color: "#6b7280", fontSize: 13, lineHeight: 1, padding: 0 }}>×</button>
              </span>
            )}
          </div>
        </div>

        {/* Table */}
        {isMobile ? (
          <div style={{ padding: "10px 14px" }}>
            {paginated.length === 0 ? (
              <div style={{ padding: 32, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>No results found.</div>
            ) : paginated.map((row, i) => (
              <div key={i} style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 10, padding: 14, marginBottom: 12 }}>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{row.category}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{row.subcategory}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
                  {[
                    { label: "Bookings",      value: row.bookings },
                    { label: "Revenue",       value: row.revenue },
                    { label: "Commission",    value: row.commission },
                    { label: "Partner Payout",value: row.payout },
                    { label: "Taxes",         value: row.taxes },
                  ].map(item => (
                    <div key={item.label}>
                      <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                {["Category", "Subcategory", "Total Bookings", "Total Revenue", "Platform Commissions", "Partner Payout", "Taxes Collected"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, color: "#9ca3af", fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: 32, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>No results found.</td></tr>
              ) : paginated.map((row, i) => (
                <tr key={i}
                  style={{ borderBottom: "1px solid #f9fafb", transition: "background 0.1s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "11px 14px", color: "#374151", fontSize: 12 }}>{row.category}</td>
                  <td style={{ padding: "11px 14px", color: "#374151", fontSize: 12 }}>{row.subcategory}</td>
                  <td style={{ padding: "11px 14px", color: "#374151", fontSize: 12 }}>{row.bookings}</td>
                  <td style={{ padding: "11px 14px", color: "#374151", fontSize: 12 }}>{row.revenue}</td>
                  <td style={{ padding: "11px 14px", color: "#374151", fontSize: 12 }}>{row.commission}</td>
                  <td style={{ padding: "11px 14px", color: "#374151", fontSize: 12 }}>{row.payout}</td>
                  <td style={{ padding: "11px 14px", color: "#374151", fontSize: 12 }}>{row.taxes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div style={{ padding: "11px 18px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12, fontSize: 12, color: "#6b7280", flexWrap: "wrap" }}>
          <span>Rows per page:</span>
          <div style={{ position: "relative", display: "flex", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: 5, padding: "3px 22px 3px 8px" }}>
            <select value={rowsPerPage} onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
              style={{ border: "none", outline: "none", fontSize: 12, color: "#374151", background: "transparent", cursor: "pointer", appearance: "none" }}>
              {[5, 10, 13, 20].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" style={{ position: "absolute", right: 5, pointerEvents: "none" }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
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