"use client"
import { useState } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const ALL_TRANSACTIONS_DATA = [
  { id: "TXN001", datetime: "2025-08-12, 03:45 PM", customer: "John Smith",   partner: "Rajesh Kumar", service: "Carpenter - Furniture Repair", amount: "₹1,200", status: "Pending",  method: "UPI", paymentRef: "UPI REF-456795", serviceAmount: "₹1,200", commission: "₹240", taxes: "₹216", partnerPayout: "₹744" },
  { id: "TXN001", datetime: "08/09/2025, 12:34 PM", customer: "Vikas Sharma", partner: "Rajesh Kumar", service: "Carpenter",                    amount: "₹1,200", status: "Success",  method: "UPI", paymentRef: "UPI REF-123456", serviceAmount: "₹1,200", commission: "₹240", taxes: "₹216", partnerPayout: "₹744" },
  { id: "TXN001", datetime: "08/09/2025, 12:34 PM", customer: "Vikas Sharma", partner: "Rajesh Kumar", service: "Carpenter",                    amount: "₹1,200", status: "Success",  method: "UPI", paymentRef: "UPI REF-234567", serviceAmount: "₹1,200", commission: "₹240", taxes: "₹216", partnerPayout: "₹744" },
  { id: "TXN001", datetime: "08/09/2025, 12:34 PM", customer: "Vikas Sharma", partner: "Rajesh Kumar", service: "Carpenter",                    amount: "₹1,200", status: "Refunded", method: "UPI", paymentRef: "UPI REF-345678", serviceAmount: "₹1,200", commission: "₹0",   taxes: "₹0",   partnerPayout: "₹0"   },
  { id: "TXN001", datetime: "08/09/2025, 12:34 PM", customer: "Vikas Sharma", partner: "Rajesh Kumar", service: "Carpenter",                    amount: "₹1,200", status: "Success",  method: "UPI", paymentRef: "UPI REF-456789", serviceAmount: "₹1,200", commission: "₹240", taxes: "₹216", partnerPayout: "₹744" },
  { id: "TXN001", datetime: "08/09/2025, 12:34 PM", customer: "Vikas Sharma", partner: "Rajesh Kumar", service: "Carpenter",                    amount: "₹1,200", status: "Pending",  method: "UPI", paymentRef: "UPI REF-567890", serviceAmount: "₹1,200", commission: "₹240", taxes: "₹216", partnerPayout: "₹744" },
  { id: "TXN001", datetime: "08/09/2025, 12:34 PM", customer: "Vikas Sharma", partner: "Rajesh Kumar", service: "Carpenter",                    amount: "₹1,200", status: "Pending",  method: "UPI", paymentRef: "UPI REF-678901", serviceAmount: "₹1,200", commission: "₹240", taxes: "₹216", partnerPayout: "₹744" },
  { id: "TXN001", datetime: "08/09/2025, 12:34 PM", customer: "Vikas Sharma", partner: "Rajesh Kumar", service: "Carpenter",                    amount: "₹1,200", status: "Pending",  method: "UPI", paymentRef: "UPI REF-789012", serviceAmount: "₹1,200", commission: "₹240", taxes: "₹216", partnerPayout: "₹744" },
];

// ── STATUS BADGE ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  if (status === "Pending") {
    return <span style={{ fontSize: 13, color: "#f59e0b", fontWeight: 500 }}>Pending</span>;
  }
  if (status === "Success") {
    return <span style={{ fontSize: 13, color: "#22c55e", fontWeight: 500 }}>Success</span>;
  }
  const map = {
    Refunded: { bg: "#fffff", color: "#ef4444" },
    Failed:   { bg: "#fee2e2", color: "#b91c1c" },
  };
  const s = map[status] || { bg: "#f1f5f9", color: "#64748b" };
  return (
    <span style={{ display: "inline-block", fontSize: 12, fontWeight: 500, color: s.color, background: s.bg,  borderRadius: 5 }}>
      {status}
    </span>
  );
}

// ── DETAIL PAGE ───────────────────────────────────────────────────────────────
function TransactionDetailPage({ txn, onBack }) {
  const [markedPaid, setMarkedPaid] = useState(false);
  const [refundIssued, setRefundIssued] = useState(false);

  // label : value row used inside both panels
  const InfoRow = ({ label, value, valueStyle, bold }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "9px 0", borderBottom: "1px solid #f3f4f6" }}>
      <span style={{ fontSize: 13, color: "#6b7280", flexShrink: 0, minWidth: 160 }}>{label}</span>
      <span style={{ fontSize: 13, color: "#111", fontWeight: bold ? 700 : 500, textAlign: "right", ...valueStyle }}>{value}</span>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f7f8fa", padding: "26px 30px" }}>

      {/* Header */}
      <h1 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#111" }}>
        Transaction Details - {txn.id}
      </h1>
      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 24 }}>
        <span style={{ color: "#2563eb", cursor: "pointer" }}>Admin</span>
        {" / "}
        <span onClick={onBack} style={{ color: "#2563eb", cursor: "pointer" }}>All Transactions</span>
        {" / "}
        <span style={{ color: "#2563eb" }}>{txn.id}</span>
      </div>

      {/* Two-column top row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>

        {/* LEFT — Booking Information */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "20px 22px" }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#111", marginBottom: 4 }}>Booking Information</div>
            <div style={{ height: 1, background: "#f3f4f6", margin: "10px 0 4px" }} />

            <InfoRow label="Date & Time:"     value={txn.datetime} />
            <InfoRow label="Transaction ID:"  value={txn.id} />
            <InfoRow label="Customer:"        value={txn.customer} />
            <InfoRow label="Partner:"         value={txn.partner} />
            <InfoRow label="Service:"         value={txn.service} />
            <InfoRow
              label="Status:"
              value=""
              valueStyle={{}}
              bold={false}
            >
            </InfoRow>
            {/* Custom status row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0" }}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>Status:</span>
              <StatusBadge status={txn.status} />
            </div>
          </div>

          {/* Admin Actions */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "20px 22px" }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#111", marginBottom: 14 }}>Admin Actions</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setMarkedPaid(true)}
                style={{
                  background: markedPaid ? "#22c55e" : "#111",
                  color: "#fff", border: "none", borderRadius: 7,
                  padding: "8px 18px", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", transition: "background 0.2s"
                }}
              >
                {markedPaid ? "Paid to Partner ✓" : "Mark as Paid to Partner"}
              </button>
              <button
                onClick={() => setRefundIssued(true)}
                style={{
                  background: "none",
                  color: refundIssued ? "#22c55e" : "#374151",
                  border: `1px solid ${refundIssued ? "#22c55e" : "#e5e7eb"}`,
                  borderRadius: 7, padding: "8px 18px", fontSize: 13,
                  fontWeight: 500, cursor: "pointer", transition: "all 0.2s"
                }}
              >
                {refundIssued ? "Refund Issued ✓" : "Issue Refund"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — Payment Details */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "20px 22px" }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#111", marginBottom: 4 }}>Payment Details</div>
          <div style={{ height: 1, background: "#f3f4f6", margin: "10px 0 4px" }} />

          {/* Payment Method row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>Payment Method</span>
            <span style={{ fontSize: 13, color: "#111", fontWeight: 500 }}>{txn.method}</span>
          </div>

          {/* Payment Reference — blue value */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>Payment Reference</span>
            <span style={{ fontSize: 13, color: "#2563eb", fontWeight: 500 }}>{txn.paymentRef}</span>
          </div>

          {/* Spacer gap */}
          <div style={{ height: 10 }} />

          {/* Service Amount */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>Service Amount:</span>
            <span style={{ fontSize: 13, color: "#111", fontWeight: 500 }}>{txn.serviceAmount}</span>
          </div>

          {/* Platform Commission */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>Platform Commission (20%):</span>
            <span style={{ fontSize: 13, color: "#111", fontWeight: 500 }}>{txn.commission}</span>
          </div>

          {/* Taxes */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>Taxes (GST 18%):</span>
            <span style={{ fontSize: 13, color: "#111", fontWeight: 500 }}>{txn.taxes}</span>
          </div>

          {/* Partner Payout — bold */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 4px" }}>
            <span style={{ fontSize: 13, color: "#111", fontWeight: 700 }}>Partner Payout:</span>
            <span style={{ fontSize: 13, color: "#111", fontWeight: 700 }}>{txn.partnerPayout}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function AllTransactions() {
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTxn, setSelectedTxn]   = useState(null);
  const [rowsPerPage, setRowsPerPage]   = useState(10);
  const [page, setPage]                 = useState(1);

  const handleView = (t) => setSelectedTxn(t);
  const handleBack = ()  => setSelectedTxn(null);

  const filtered = ALL_TRANSACTIONS_DATA.filter(t => {
    const q = search.toLowerCase();
    const matchSearch = !q || [t.id, t.customer, t.partner, t.service].some(v => v.toLowerCase().includes(q));
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated  = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (selectedTxn) {
    return <TransactionDetailPage txn={selectedTxn} onBack={handleBack} />;
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f7f8fa", padding: "28px 32px"}}>

      {/* Title row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <h1 style={{ margin: 0,  color: "#111" }}>All Transactions</h1>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 22 }}>
        {[
          { label: "Total Revenue",     value: "₹1,33,345", extra: <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 600, marginLeft: 6 }}>↑37%</span> },
          { label: "Pending Payments",  value: "₹1,33,345", extra: null },
          { label: "Platform Earnings", value: "₹33,345",   extra: <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 600, marginLeft: 6 }}>↑37%</span> },
        ].map(c => (
          <div key={c.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px 22px" }}>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>{c.label}</div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span style={{ fontSize: 20, fontWeight: 500, color: "#111", letterSpacing: "-0.5px" }}>{c.value}</span>
              {c.extra}
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>

        {/* Controls */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: "#111", marginBottom: 14 }}>All Transactions</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>

            <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #e5e7eb", borderRadius: 7, padding: "7px 12px", background: "#fafafa", minWidth: 200 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search"
                style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", background: "transparent", width: 140 }}
              />
            </div>

            <div style={{ position: "relative", display: "flex", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: 7, padding: "7px 32px 7px 12px", background: "#fff" }}>
              <select
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", background: "transparent", cursor: "pointer", appearance: "none" }}
              >
                <option value="All">Status (All)</option>
                <option value="Success">Success</option>
                <option value="Pending">Pending</option>
                <option value="Refunded">Refunded</option>
                <option value="Failed">Failed</option>
              </select>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" style={{ position: "absolute", right: 10, pointerEvents: "none" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 7, border: "1px solid #e5e7eb", borderRadius: 7, padding: "7px 12px", fontSize: 13, color: "#bbb", background: "#fafafa", cursor: "pointer" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              MM/DD/YYYY
            </div>

            <button style={{ background: "#111", color: "#fff", border: "none", borderRadius: 7, padding: "7px 22px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
              {["Transa. ID", "Date & Time", "Customer", "Partner", "Service", "Amount", "Status", "Method", "Action"].map(h => (
                <th key={h} style={{ padding: "11px 14px", textAlign: "left", color: "#9ca3af", fontWeight: 500, fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={9} style={{ padding: 36, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>No transactions found.</td></tr>
            ) : paginated.map((t, i) => (
              <tr key={i}
                style={{ borderBottom: "1px solid #f9fafb", transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", fontWeight: 500 }}>{t.id}</td>
                <td style={{ padding: "13px 14px", fontSize: 12, color: "#6b7280", whiteSpace: "nowrap" }}>{t.datetime}</td>
                <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151" }}>{t.customer}</td>
                <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151" }}>{t.partner}</td>
                <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", maxWidth: 160 }}>{t.service}</td>
                <td style={{ padding: "13px 14px",color: "#111", whiteSpace: "nowrap" }}>{t.amount}</td>
                <td style={{ padding: "13px 14px" }}><StatusBadge status={t.status} /></td>
                <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151" }}>{t.method}</td>
                <td style={{ padding: "13px 14px" }}>
                  <button
                    onClick={() => handleView(t)}
                    style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "5px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ padding: "12px 20px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 14, fontSize: 12, color: "#6b7280" }}>
          <span>Rows per page:</span>
          <div style={{ position: "relative", display: "flex", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: 5, padding: "3px 24px 3px 8px" }}>
            <select
              value={rowsPerPage}
              onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
              style={{ border: "none", outline: "none", fontSize: 12, color: "#374151", background: "transparent", cursor: "pointer", appearance: "none" }}
            >
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
      </div>
    </div>
  );
}
