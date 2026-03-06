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

// ── DATA ──────────────────────────────────────────────────────────────────────
const CANCELLED_BOOKINGS_DATA = [
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Carpenter - Furniture Repair", date: "22/03/2025", reason: "Don't need the service anymore",  customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Carpenter", partnerExperience: "5 Years", serviceCategory: "Carpentry", serviceName: "Furniture Repair", serviceDescription: "Fix and polish wooden furniture", serviceDuration: "2 Hours", timeline: ["2025-03-22 09:00 AM - Booking Created", "2025-03-22 09:10 AM - Assigned to Partner", "2025-03-22 09:30 AM - Cancelled by Customer"], cancelledBy: "Customer", refundStatus: "Pending",   amount: "₹1200" },
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Carpenter - Furniture Repair", date: "22/03/2025", reason: "Not available at this time",        customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Carpenter", partnerExperience: "5 Years", serviceCategory: "Carpentry", serviceName: "Furniture Repair", serviceDescription: "Fix and polish wooden furniture", serviceDuration: "2 Hours", timeline: ["2025-03-22 09:00 AM - Booking Created", "2025-03-22 09:10 AM - Assigned to Partner", "2025-03-22 09:45 AM - Cancelled by Partner"], cancelledBy: "Partner",   refundStatus: "Processed", amount: "₹1200" },
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Carpenter - Furniture Repair", date: "22/03/2025", reason: "Don't need the service anymore",  customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Carpenter", partnerExperience: "5 Years", serviceCategory: "Carpentry", serviceName: "Furniture Repair", serviceDescription: "Fix and polish wooden furniture", serviceDuration: "2 Hours", timeline: ["2025-03-22 09:00 AM - Booking Created", "2025-03-22 09:10 AM - Assigned to Partner", "2025-03-22 09:30 AM - Cancelled by Customer"], cancelledBy: "Customer", refundStatus: "Pending",   amount: "₹1200" },
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Carpenter - Furniture Repair", date: "22/03/2025", reason: "Not available at this time",        customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Carpenter", partnerExperience: "5 Years", serviceCategory: "Carpentry", serviceName: "Furniture Repair", serviceDescription: "Fix and polish wooden furniture", serviceDuration: "2 Hours", timeline: ["2025-03-22 09:00 AM - Booking Created", "2025-03-22 09:10 AM - Assigned to Partner", "2025-03-22 09:45 AM - Cancelled by Partner"], cancelledBy: "Partner",   refundStatus: "Processed", amount: "₹1200" },
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Carpenter - Furniture Repair", date: "22/03/2025", reason: "Don't need the service anymore",  customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Carpenter", partnerExperience: "5 Years", serviceCategory: "Carpentry", serviceName: "Furniture Repair", serviceDescription: "Fix and polish wooden furniture", serviceDuration: "2 Hours", timeline: ["2025-03-22 09:00 AM - Booking Created", "2025-03-22 09:10 AM - Assigned to Partner", "2025-03-22 09:30 AM - Cancelled by Customer"], cancelledBy: "Customer", refundStatus: "Pending",   amount: "₹1200" },
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Carpenter - Furniture Repair", date: "22/03/2025", reason: "Don't need the service anymore",  customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Carpenter", partnerExperience: "5 Years", serviceCategory: "Carpentry", serviceName: "Furniture Repair", serviceDescription: "Fix and polish wooden furniture", serviceDuration: "2 Hours", timeline: ["2025-03-22 09:00 AM - Booking Created", "2025-03-22 09:10 AM - Assigned to Partner", "2025-03-22 09:30 AM - Cancelled by Customer"], cancelledBy: "Customer", refundStatus: "Pending",   amount: "₹1200" },
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Carpenter - Furniture Repair", date: "22/03/2025", reason: "Don't need the service anymore",  customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Carpenter", partnerExperience: "5 Years", serviceCategory: "Carpentry", serviceName: "Furniture Repair", serviceDescription: "Fix and polish wooden furniture", serviceDuration: "2 Hours", timeline: ["2025-03-22 09:00 AM - Booking Created", "2025-03-22 09:10 AM - Assigned to Partner", "2025-03-22 09:30 AM - Cancelled by Customer"], cancelledBy: "Customer", refundStatus: "Pending",   amount: "₹1200" },
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Carpenter - Furniture Repair", date: "22/03/2025", reason: "Don't need the service anymore",  customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Carpenter", partnerExperience: "5 Years", serviceCategory: "Carpentry", serviceName: "Furniture Repair", serviceDescription: "Fix and polish wooden furniture", serviceDuration: "2 Hours", timeline: ["2025-03-22 09:00 AM - Booking Created", "2025-03-22 09:10 AM - Assigned to Partner", "2025-03-22 09:30 AM - Cancelled by Customer"], cancelledBy: "Customer", refundStatus: "Pending",   amount: "₹1200" },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
function Card({ title, children }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px 20px" }}>
      <div style={{ fontWeight: 600, fontSize: 14, color: "#111", marginBottom: 14 }}>{title}</div>
      {children}
    </div>
  );
}

function Row({ label, value, valueEl }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "5px 0" }}>
      <span style={{ fontSize: 12, color: "#9ca3af", minWidth: 120, flexShrink: 0 }}>{label}:</span>
      {valueEl || <span style={{ fontSize: 13, color: "#111", fontWeight: 500, textAlign: "right" }}>{value}</span>}
    </div>
  );
}

function RefundBadge({ status }) {
  return (
    <span style={{
      fontSize: 12, fontWeight: 600, padding: "2px 10px", borderRadius: 4,
      background: status === "Processed" ? "#dcfce7" : "#fef9c3",
      color: status === "Processed" ? "#16a34a" : "#a16207",
    }}>
      {status}
    </span>
  );
}

// ── DETAIL PAGE ───────────────────────────────────────────────────────────────
function BookingDetailPage({ booking, onBack, isMobile }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f7f8fa", padding: isMobile ? "16px 14px" : "26px 30px" }}>
      <h1 style={{ margin: "0 0 4px", fontSize: isMobile ? 17 : 20, fontWeight: 700, color: "#111" }}>
        Booking Details - {booking.id}
      </h1>
      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 22 }}>
        <span style={{ color: "#2563eb", cursor: "pointer" }}>Admin</span>
        {" / "}
        <span onClick={onBack} style={{ color: "#2563eb", cursor: "pointer" }}>Cancelled Bookings</span>
        {" / "}
        <span style={{ color: "#2563eb" }}>{booking.id}</span>
      </div>

      {/* Two-column on desktop, single column on mobile */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: 16,
        alignItems: "start",
      }}>

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card title="Booking Summary">
            <Row label="Booking ID"    value={booking.id} />
            <Row label="Date"          value={booking.date} />
            <Row label="Status"        valueEl={<span style={{ fontSize: 13, color: "#ef4444", fontWeight: 500 }}>Cancelled</span>} />
            <Row label="Cancelled By"  value={booking.cancelledBy} />
            <Row label="Reason"        value={booking.reason} />
            <Row label="Refund Status" valueEl={<RefundBadge status={booking.refundStatus} />} />
          </Card>

          <Card title="Service Details">
            <Row label="Category"    value={booking.serviceCategory} />
            <Row label="Service"     value={booking.serviceName} />
            <Row label="Description" value={booking.serviceDescription} />
            <Row label="Duration"    value={booking.serviceDuration} />
          </Card>

          <Card title="Cancellation Timeline">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {booking.timeline.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%", marginTop: 5, flexShrink: 0,
                    background: i === booking.timeline.length - 1 ? "#ef4444" : "#22c55e"
                  }} />
                  <span style={{ fontSize: 12, color: "#6b7280" }}>{t}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card title="Customer Details">
            <Row label="Name"    value={booking.customer} />
            <Row label="Phone"   value={booking.customerPhone} />
            <Row label="Address" value={booking.customerAddress} />
          </Card>

          <Card title="Partner Details">
            <Row label="Name"       value={booking.partner} />
            <Row label="Phone"      value={booking.partnerPhone} />
            <Row label="Profession" value={booking.partnerProfession} />
            <Row label="Experience" value={booking.partnerExperience} />
          </Card>

          <Card title="Payment Breakdown">
            <Row label="Booking Amount" value={booking.amount} />
            <div style={{ borderTop: "1px solid #f3f4f6", margin: "8px 0" }} />
            <Row label="Refund Amount"  value={booking.amount} />
            <Row label="Refund Status"  valueEl={<RefundBadge status={booking.refundStatus} />} />
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function CancelledBookings() {
  const isMobile = useIsMobile();
  const [search, setSearch]                   = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rowsPerPage, setRowsPerPage]         = useState(10);
  const [page, setPage]                       = useState(1);

  const handleView = (b) => setSelectedBooking(b);
  const handleBack = ()  => setSelectedBooking(null);

  const filtered = CANCELLED_BOOKINGS_DATA.filter(b => {
    const q = search.toLowerCase();
    return !q || [b.id, b.customer, b.partner, b.service, b.reason].some(v => v.toLowerCase().includes(q));
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated  = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (selectedBooking) {
    return <BookingDetailPage booking={selectedBooking} onBack={handleBack} isMobile={isMobile} />;
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f7f8fa", padding: isMobile ? "16px 14px" : "28px 32px" }}>

      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <h1 style={{ margin: 0, color: "#111", fontSize: isMobile ? 18 : 24 }}>Cancelled Bookings</h1>
        <div style={{
          display: "flex", alignItems: "center", gap: 5, background: "#fff",
          border: "1px solid #e5e7eb", borderRadius: 7, padding: "6px 14px",
          fontSize: 13, color: "#374151", cursor: "pointer", fontWeight: 500,
        }}>
          All
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
        gap: isMobile ? 10 : 14,
        marginBottom: 22,
      }}>
        {[
          { label: "Total Bookings",     value: "33,345", extra: <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 600, marginLeft: 4 }}>↑37%</span> },
          { label: "Completed Bookings", value: "33,253", extra: null },
          { label: "Conversion Rate",    value: "98%",    extra: null },
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

      {/* Table card */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>

        {/* Controls */}
        <div style={{ padding: isMobile ? "14px" : "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: "#111", marginBottom: 14 }}>Cancelled Bookings List</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>

            {/* Search — full width on mobile */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8, border: "1px solid #e5e7eb",
              borderRadius: 7, padding: "7px 12px", background: "#fafafa",
              flex: isMobile ? "1 1 100%" : "0 0 auto",
              minWidth: isMobile ? 0 : 200,
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search"
                style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", background: "transparent", width: isMobile ? "100%" : 140 }}
              />
            </div>

            {/* Date — desktop only */}
            {!isMobile && (
              <div style={{
                display: "flex", alignItems: "center", gap: 7, border: "1px solid #e5e7eb",
                borderRadius: 7, padding: "7px 12px", fontSize: 13, color: "#bbb",
                background: "#fafafa", cursor: "pointer",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                MM/DD/YYYY
              </div>
            )}

            <button style={{
              background: "#111", color: "#fff", border: "none", borderRadius: 7,
              padding: "7px 22px", fontSize: 13, fontWeight: 600, cursor: "pointer",
              flex: isMobile ? "1 1 auto" : "0 0 auto",
            }}>
              Filter
            </button>
          </div>
        </div>

        {/* ── MOBILE: booking cards ── */}
        {isMobile ? (
          <div style={{ padding: "10px 14px" }}>
            {paginated.length === 0 ? (
              <div style={{ padding: 36, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>No cancelled bookings found.</div>
            ) : paginated.map((b, i) => (
              <div key={i} style={{
                background: "#fafafa", border: "1px solid #f0f0f0",
                borderRadius: 10, padding: 14, marginBottom: 12,
              }}>
                {/* Card header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{b.id}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{b.date}</div>
                  </div>
                  <RefundBadge status={b.refundStatus} />
                </div>

                {/* Card body — 2-col grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", marginBottom: 10 }}>
                  {[
                    { label: "Customer", value: b.customer },
                    { label: "Partner",  value: b.partner },
                    { label: "Service",  value: b.service },
                    { label: "By",       value: b.cancelledBy },
                  ].map(row => (
                    <div key={row.label}>
                      <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 1 }}>{row.label}</div>
                      <div style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{row.value}</div>
                    </div>
                  ))}
                </div>

                {/* Reason */}
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10, padding: "6px 8px", background: "#fff", borderRadius: 6, border: "1px solid #f0f0f0" }}>
                  <span style={{ color: "#9ca3af", fontSize: 10 }}>Reason: </span>{b.reason}
                </div>

                {/* Card footer */}
                <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 10, borderTop: "1px solid #f0f0f0" }}>
                  <button
                    // onClick={() => handleView(b)}
                    style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "6px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── DESKTOP: original table, zero changes ── */
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                {["Booking ID", "Customer", "Partner", "Service", "Date", "Reason", "Action"].map(h => (
                  <th key={h} style={{ padding: "11px 16px", textAlign: "left", color: "#9ca3af", fontWeight: 500, fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: 36, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>No cancelled bookings found.</td>
                </tr>
              ) : paginated.map((b, i) => (
                <tr key={i}
                  style={{ borderBottom: "1px solid #f9fafb", transition: "background 0.1s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "#374151", fontWeight: 500 }}>{b.id}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "#374151" }}>{b.customer}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "#374151" }}>{b.partner}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "#374151" }}>{b.service}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>{b.date}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "#6b7280" }}>{b.reason}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <button
                      // onClick={() => handleView(b)}
                      style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "5px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination — original, zero changes */}
        <div style={{
          padding: "12px 20px", borderTop: "1px solid #f3f4f6",
          display: "flex", justifyContent: "flex-end", alignItems: "center",
          gap: 14, fontSize: 12, color: "#6b7280", flexWrap: "wrap",
        }}>
          <span>Rows per page:</span>
          <div style={{ position: "relative", display: "flex", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: 5, padding: "3px 24px 3px 8px" }}>
            <select
              value={rowsPerPage}
              onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
              style={{ border: "none", outline: "none", fontSize: 12, color: "#374151", background: "transparent", cursor: "pointer", appearance: "none" }}
            >
              {[5, 10, 20].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"
              style={{ position: "absolute", right: 5, pointerEvents: "none" }}>
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