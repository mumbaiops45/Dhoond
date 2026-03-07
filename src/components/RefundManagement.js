"use client"
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

// ── DATA — dateOnly added for filtering, dateIssued display unchanged ──────────
const BASE_REFUNDS = [
  { id: "RFD001", transId: "TXN001", dateIssued: "08/09/2025, 12:34 PM", dateOnly: "2025-08-09", customer: "Vikas Sharma", partner: "Rajesh Kumar", service: "Carpenter - Furniture Repair", refundAmount: "₹1,200", status: "Pending",  reason: "Service Cancelled by Customer", type: "customer", datetime: "2025-08-12, 03:45 PM", method: "UPI", paymentRef: "UPI REF-458795", serviceAmount: "₹1,200", commission: "₹240", taxes: "₹216", partnerPayout: "₹744" },
  { id: "RFD001", transId: "TXN001", dateIssued: "08/09/2025, 12:34 PM", dateOnly: "2025-08-09", customer: "Vikas Sharma", partner: "Rajesh Kumar", service: "Carpenter - Furniture Repair", refundAmount: "₹1,200", status: "Pending",  reason: "Service Cancelled by Customer", type: "customer", datetime: "2025-08-12, 03:45 PM", method: "UPI", paymentRef: "UPI REF-458795", serviceAmount: "₹1,200", commission: "₹240", taxes: "₹216", partnerPayout: "₹744" },
  { id: "RFD001", transId: "TXN001", dateIssued: "08/09/2025",           dateOnly: "2025-08-09", customer: "Vikas Sharma", partner: "Rajesh Kumar", service: "Carpenter -",                  refundAmount: "₹1,200", status: "Refunded", reason: "Service Cancelled",             type: "customer", datetime: "2025-08-12, 03:45 PM", method: "UPI", paymentRef: "UPI REF-458795", serviceAmount: "₹1,200", commission: "₹240", taxes: "₹216", partnerPayout: "₹744" },
  { id: "RFD001", transId: "TXN001", dateIssued: "08/09/2025, 12:34 PM", dateOnly: "2025-08-09", customer: "Vikas Sharma", partner: "Rajesh Kumar", service: "Carpenter - Furniture Repair", refundAmount: "₹1,200", status: "Refunded", reason: "Service Cancelled by Customer", type: "customer", datetime: "2025-08-12, 03:45 PM", method: "UPI", paymentRef: "UPI REF-458795", serviceAmount: "₹1,200", commission: "₹240", taxes: "₹216", partnerPayout: "₹744" },
  { id: "RFD001", transId: "TXN001", dateIssued: "08/10/2025, 12:34 PM", dateOnly: "2025-08-10", customer: "Vikas Sharma", partner: "Rajesh Kumar", service: "Carpenter - Furniture Repair", refundAmount: "₹1,200", status: "Refunded", reason: "Service Cancelled by Customer", type: "customer", datetime: "2025-08-12, 03:45 PM", method: "UPI", paymentRef: "UPI REF-458795", serviceAmount: "₹1,200", commission: "₹240", taxes: "₹216", partnerPayout: "₹744" },
  { id: "RFD001", transId: "TXN001", dateIssued: "08/10/2025, 12:34 PM", dateOnly: "2025-08-10", customer: "Vikas Sharma", partner: "Rajesh Kumar", service: "Carpenter - Furniture Repair", refundAmount: "₹1,200", status: "Refunded", reason: "Service Cancelled by Customer", type: "customer", datetime: "2025-08-12, 03:45 PM", method: "UPI", paymentRef: "UPI REF-458795", serviceAmount: "₹1,200", commission: "₹240", taxes: "₹216", partnerPayout: "₹744" },
  { id: "RFD002", transId: "TXN002", dateIssued: "08/09/2025, 12:34 PM", dateOnly: "2025-08-09", customer: "Vikas Sharma", partner: "Amit Kumar",   service: "Electrician - Wiring",       refundAmount: "₹2,000", status: "Pending",  reason: "Partner Unavailable",           type: "partner",  datetime: "2025-08-10, 11:00 AM", method: "UPI", paymentRef: "UPI REF-789012", serviceAmount: "₹2,000", commission: "₹400", taxes: "₹360", partnerPayout: "₹1,240" },
  { id: "RFD002", transId: "TXN002", dateIssued: "08/09/2025",           dateOnly: "2025-08-09", customer: "Vikas Sharma", partner: "Amit Kumar",   service: "Electrician -",              refundAmount: "₹2,000", status: "Refunded", reason: "Partner Unavailable",           type: "partner",  datetime: "2025-08-10, 11:00 AM", method: "UPI", paymentRef: "UPI REF-789012", serviceAmount: "₹2,000", commission: "₹400", taxes: "₹360", partnerPayout: "₹1,240" },
  { id: "RFD002", transId: "TXN002", dateIssued: "08/11/2025, 12:34 PM", dateOnly: "2025-08-11", customer: "Vikas Sharma", partner: "Amit Kumar",   service: "Electrician - Wiring",       refundAmount: "₹2,000", status: "Refunded", reason: "Partner Unavailable",           type: "partner",  datetime: "2025-08-10, 11:00 AM", method: "UPI", paymentRef: "UPI REF-789012", serviceAmount: "₹2,000", commission: "₹400", taxes: "₹360", partnerPayout: "₹1,240" },
];

// ── STATUS BADGE ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  if (status === "Pending")  return <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 500, border: "1px solid #fde68a", padding: "2px 10px", borderRadius: 4, background: "#fffbeb" }}>Pending</span>;
  if (status === "Refunded") return <span style={{ fontSize: 12, fontWeight: 600, color: "#22c55e", background: "#ffffff", padding: "3px 12px", borderRadius: 5 }}>Refunded</span>;
  return <span style={{ fontSize: 12, color: "#6b7280" }}>{status}</span>;
}

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

// ── CREATE REFUND MODAL ───────────────────────────────────────────────────────
function CreateRefundModal({ onClose }) {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ type: "Partner", mobile: "+91 9876543210", reason: "Service Cancelled", price: "₹100" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "16px" : "0" }}
    >
      <div style={{ background: "#fff", borderRadius: 12, padding: isMobile ? "24px 20px 20px" : "28px 28px 24px", width: isMobile ? "100%" : 440, maxWidth: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", fontSize: 22, color: "#9ca3af", cursor: "pointer", lineHeight: 1 }}>×</button>
        <div style={{ fontWeight: 700, fontSize: 16, color: "#111", marginBottom: 20 }}>Create Refund</div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: "#374151", fontWeight: 500, display: "block", marginBottom: 6 }}>Customer/ Partner</label>
          <div style={{ position: "relative" }}>
            <select value={form.type} onChange={e => set("type", e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 36px 10px 14px", fontSize: 14, color: "#111", background: "#fff", appearance: "none", outline: "none", cursor: "pointer", boxSizing: "border-box" }}>
              <option>Partner</option>
              <option>Customer</option>
            </select>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: "#374151", fontWeight: 500, display: "block", marginBottom: 6 }}>Mobile Number</label>
          <input value={form.mobile} onChange={e => set("mobile", e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "#111", outline: "none", boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: "#374151", fontWeight: 500, display: "block", marginBottom: 6 }}>Reason</label>
          <input value={form.reason} onChange={e => set("reason", e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "#111", outline: "none", boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, color: "#374151", fontWeight: 500, display: "block", marginBottom: 6 }}>Refund Price</label>
          <input value={form.price} onChange={e => set("price", e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "#111", outline: "none", boxSizing: "border-box" }} />
        </div>

        <button onClick={onClose} style={{ width: "100%", background: "#111", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          Issue Refund
        </button>
      </div>
    </div>
  );
}

// ── REFUND DETAIL PAGE ────────────────────────────────────────────────────────
function RefundDetailPage({ refund, onBack, isMobile }) {
  const [approved, setApproved]   = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const InfoRow = ({ label, value, blue }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #f3f4f6", flexWrap: isMobile ? "wrap" : "nowrap", gap: isMobile ? 2 : 0 }}>
      <span style={{ fontSize: 13, color: "#6b7280", minWidth: isMobile ? "auto" : 170, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, color: blue ? "#2563eb" : "#111", fontWeight: 500, textAlign: "right", wordBreak: "break-all" }}>{value}</span>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f7f8fa", padding: isMobile ? "16px 14px" : "26px 30px" }}>
      <h1 style={{ margin: "0 0 4px", fontSize: isMobile ? 17 : 20, fontWeight: 700, color: "#111" }}>
        Refund Details - {refund.transId}
      </h1>
      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 24, flexWrap: "wrap", display: "flex", gap: 2 }}>
        <span style={{ color: "#2563eb", cursor: "pointer" }}>Admin</span>
        <span>{" / "}</span>
        <span onClick={onBack} style={{ color: "#2563eb", cursor: "pointer" }}>Refund Management</span>
        <span>{" / "}</span>
        <span style={{ color: "#2563eb" }}>{refund.transId}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, alignItems: "start" }}>
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "20px 22px" }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#111", marginBottom: 10 }}>Booking Information</div>
            <div style={{ height: 1, background: "#f3f4f6", marginBottom: 4 }} />
            <InfoRow label="Date & Time:"    value={refund.datetime} />
            <InfoRow label="Transaction ID:" value={refund.transId} />
            <InfoRow label="Customer:"       value={refund.customer} />
            <InfoRow label="Partner:"        value={refund.partner} />
            <InfoRow label="Service:"        value={refund.service} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0" }}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>Status:</span>
              {approved  ? <span style={{ fontSize: 13, color: "#22c55e", fontWeight: 500 }}>Approved</span>
               : cancelled ? <span style={{ fontSize: 13, color: "#ef4444", fontWeight: 500 }}>Cancelled</span>
               : <span style={{ fontSize: 13, color: "#f59e0b", fontWeight: 500 }}>{refund.status}</span>}
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "20px 22px" }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#111", marginBottom: 14 }}>Admin Actions</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => { setApproved(true); setCancelled(false); }}
                style={{ background: approved ? "#22c55e" : "#111", color: "#fff", border: "none", borderRadius: 7, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s", flex: isMobile ? "1 1 auto" : "0 0 auto" }}>
                {approved ? "Refund Approved ✓" : "Approve Refund"}
              </button>
              <button onClick={() => { setCancelled(true); setApproved(false); }}
                style={{ background: "none", color: cancelled ? "#ef4444" : "#374151", border: `1px solid ${cancelled ? "#ef4444" : "#e5e7eb"}`, borderRadius: 7, padding: "8px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s", flex: isMobile ? "1 1 auto" : "0 0 auto" }}>
                {cancelled ? "Refund Cancelled ✓" : "Cancel Refund"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "20px 22px" }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#111", marginBottom: 10 }}>Payment Details</div>
          <div style={{ height: 1, background: "#f3f4f6", marginBottom: 4 }} />
          <InfoRow label="Payment Method"             value={refund.method} />
          <InfoRow label="Payment Reference"          value={refund.paymentRef} blue />
          <div style={{ height: 8 }} />
          <InfoRow label="Service Amount:"            value={refund.serviceAmount} />
          <InfoRow label="Platform Commission (20%):" value={refund.commission} />
          <InfoRow label="Taxes (GST 18%):"           value={refund.taxes} />
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 4px" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Partner Payout:</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{refund.partnerPayout}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── REFUND TABLE ──────────────────────────────────────────────────────────────
function RefundTable({ data, showPartnerCol, onView }) {
  const isMobile = useIsMobile();
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage]   = useState(10);
  const [page, setPage]                 = useState(1);

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

  // ── FILTER LOGIC ───────────────────────────────────────────────────────────
  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || [r.id, r.transId, r.customer, r.partner, r.service].some(v => v.toLowerCase().includes(q));
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const matchDate   = !activeDate || r.dateOnly === activeDate;
    return matchSearch && matchStatus && matchDate;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated  = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const headers = showPartnerCol
    ? ["Refund ID", "Trans. ID", "Date Issued", "Partner", "Service", "Refund Amount", "Status", "Reason", "Action"]
    : ["Refund ID", "Trans. ID", "Date Issued", "Customer", "Partner", "Service", "Refund Amount", "Status", "Reason", "Action"];

  const controlBase = {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e5e7eb",
    borderRadius: 7,
    padding: "7px 12px",
    background: "#fafafa",
    fontSize: 13,
    color: "#374151",
  };

  return (
    <>
      {/* Controls */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>

        {/* Search */}
        <div style={{ ...controlBase, gap: 8, flex: isMobile ? "1 1 100%" : "0 0 auto", minWidth: isMobile ? 0 : 200 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search"
            style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", background: "transparent", width: isMobile ? "100%" : 140 }} />
        </div>

        {/* Status filter */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: 7, padding: "7px 32px 7px 12px", background: "#fff", flex: isMobile ? "1 1 auto" : "0 0 auto" }}>
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", background: "transparent", cursor: "pointer", appearance: "none" }}>
            <option value="All">Payment Status (All)</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" style={{ position: "absolute", right: 10, pointerEvents: "none" }}>
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
                fontSize: 13,
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
          style={{ background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "7px 22px", fontSize: 13, fontWeight: 600, cursor: "pointer", flex: isMobile ? "1 1 auto" : "0 0 auto" }}
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

      {/* Table */}
      {isMobile ? (
        <div style={{ padding: "4px 0" }}>
          {paginated.length === 0 ? (
            <div style={{ padding: 36, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>No refunds found.</div>
          ) : paginated.map((r, i) => (
            <div key={i} style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 10, padding: 14, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{r.id}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{r.dateIssued}</div>
                </div>
                <StatusBadge status={r.status} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", marginBottom: 10 }}>
                {[
                  { label: "Transaction", value: r.transId },
                  { label: "Customer",    value: r.customer },
                  { label: "Partner",     value: r.partner },
                  { label: "Service",     value: r.service },
                  { label: "Reason",      value: r.reason },
                ].map(row => (
                  <div key={row.label}>
                    <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 1 }}>{row.label}</div>
                    <div style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{row.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{r.refundAmount}</span>
                <button onClick={() => onView(r)} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "6px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
              {headers.map(h => (
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: "#9ca3af", fontWeight: 500, fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={headers.length} style={{ padding: 36, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>No refunds found.</td></tr>
            ) : paginated.map((r, i) => (
              <tr key={i}
                style={{ borderBottom: "1px solid #f9fafb", transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "12px 12px", fontSize: 13, color: "#374151", fontWeight: 500 }}>{r.id}</td>
                <td style={{ padding: "12px 12px", fontSize: 13, color: "#374151" }}>{r.transId}</td>
                <td style={{ padding: "12px 12px", fontSize: 12, color: "#6b7280", whiteSpace: "nowrap" }}>{r.dateIssued}</td>
                {!showPartnerCol && (
                  <td style={{ padding: "12px 12px", fontSize: 13, color: "#374151" }}>{r.customer}</td>
                )}
                <td style={{ padding: "12px 12px", fontSize: 13, color: "#374151" }}>{r.partner}</td>
                <td style={{ padding: "12px 12px", fontSize: 13, color: "#374151", maxWidth: 130 }}>{r.service}</td>
                <td style={{ padding: "12px 12px", color: "#111", whiteSpace: "nowrap" }}>{r.refundAmount}</td>
                <td style={{ padding: "12px 12px" }}><StatusBadge status={r.status} /></td>
                <td style={{ padding: "12px 12px", fontSize: 12, color: "#6b7280", maxWidth: 150 }}>{r.reason}</td>
                <td style={{ padding: "12px 12px" }}>
                  <button onClick={() => onView(r)} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "5px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div style={{ padding: "12px 0", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 14, fontSize: 12, color: "#6b7280", flexWrap: "wrap" }}>
        <span>Rows per page:</span>
        <div style={{ position: "relative", display: "flex", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: 5, padding: "3px 24px 3px 8px" }}>
          <select value={rowsPerPage} onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
            style={{ border: "none", outline: "none", fontSize: 12, color: "#374151", background: "transparent", cursor: "pointer", appearance: "none" }}>
            {[5, 10, 20].map(n => <option key={n} value={n}>{n}</option>)}
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
    </>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function RefundManagement() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab]           = useState("all");
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [showModal, setShowModal]           = useState(false);

  const handleView = (r) => setSelectedRefund(r);
  const handleBack = ()  => setSelectedRefund(null);

  const customerRefunds = BASE_REFUNDS.filter(r => r.type === "customer");
  const partnerRefunds  = BASE_REFUNDS.filter(r => r.type === "partner");

  const tabData  = activeTab === "all" ? BASE_REFUNDS : activeTab === "customer" ? customerRefunds : partnerRefunds;
  const tabTitle = activeTab === "all" ? "All Refunds" : activeTab === "customer" ? "Customer Refunds" : "Partner Refunds";

  if (selectedRefund) return <RefundDetailPage refund={selectedRefund} onBack={handleBack} isMobile={isMobile} />;

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f7f8fa", padding: isMobile ? "16px 14px" : "28px 32px" }}>

      {showModal && <CreateRefundModal onClose={() => setShowModal(false)} />}

      {/* Title row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
        <h1 style={{ margin: 0, color: "#111", fontSize: isMobile ? 18 : 24 }}>Refund Management</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 7, padding: "6px 14px", fontSize: 13, color: "#374151", cursor: "pointer", fontWeight: 500 }}>
            All
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#111", borderRadius: 7, padding: "6px 14px", fontSize: 13, color: "#fff", cursor: "pointer", fontWeight: 600 }}>
            Export CSV
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? 10 : 14, marginBottom: 22 }}>
        {[
          { label: "Total Revenue",     value: "₹1,33,345", extra: <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 600, marginLeft: 6 }}>↑37%</span> },
          { label: "Pending Payments",  value: "₹1,33,345", extra: null },
          { label: "Platform Earnings", value: "₹33,345",   extra: <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 600, marginLeft: 6 }}>↑37%</span> },
        ].map(c => (
          <div key={c.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: isMobile ? "14px 16px" : "18px 22px" }}>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>{c.label}</div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span style={{ fontSize: 20, fontWeight: 500, color: "#111", letterSpacing: "-0.5px" }}>{c.value}</span>
              {c.extra}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs row + Create Refund button */}
      <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", marginBottom: 20, flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 0 }}>
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #e5e7eb", overflowX: "auto" }}>
          {[
            { key: "all",      label: "All Refunds" },
            { key: "customer", label: "Customer Refunds" },
            { key: "partner",  label: "Partner Refunds" },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{ padding: "9px 18px", border: "none", background: activeTab === tab.key ? "#ffffff" : "transparent", cursor: "pointer", color: activeTab === tab.key ? "#111" : "#6b7280", marginBottom: -1, transition: "all 0.15s", whiteSpace: "nowrap", fontSize: 13 }}>
              {tab.label}
            </button>
          ))}
        </div>

        <button onClick={() => setShowModal(true)}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", alignSelf: isMobile ? "flex-start" : "auto" }}>
          Create Refund
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Table card */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden", padding: "16px 20px" }}>
        <div style={{ fontWeight: 600, fontSize: 15, color: "#111", marginBottom: 14 }}>{tabTitle}</div>
        <RefundTable data={tabData} showPartnerCol={activeTab === "partner"} onView={handleView} />
      </div>
    </div>
  );
}