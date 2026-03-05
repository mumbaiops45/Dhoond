"use client"
import { useState } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const ONGOING_BOOKINGS_DATA = [
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Carpenter - Furniture Repair", date: "22/03/2025", payment: "Pending", amount: "₹1200", customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Carpenter", partnerExperience: "5 Years", serviceCategory: "Carpentry", serviceName: "Furniture Repair", serviceDescription: "Fix and polish wooden furniture", serviceDuration: "2 Hours", timeline: ["2025-03-22 09:00 AM - Booking Created", "2025-03-22 09:10 AM - Assigned to Partner", "Pending - Awaiting Partner Acceptance"], basePrice: "₹1000", extraCharges: "₹100", taxes: "₹100", totalAmount: "₹1200", partnerEarnings: "₹960", commission: "₹240" },
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Electrician - Wiring",         date: "22/03/2025", payment: "Paid",    amount: "₹1200", customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Electrician", partnerExperience: "8 Years", serviceCategory: "Electrician", serviceName: "House Wiring", serviceDescription: "Full wiring for 2BHK", serviceDuration: "4 Hours", timeline: ["2025-03-22 10:00 AM - Booking Created", "2025-03-22 10:15 AM - Assigned to Partner", "In Progress - Partner En Route"], basePrice: "₹1000", extraCharges: "₹100", taxes: "₹100", totalAmount: "₹1200", partnerEarnings: "₹960", commission: "₹240" },
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Electrician - Wiring",         date: "22/03/2025", payment: "Paid",    amount: "₹1200", customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Electrician", partnerExperience: "8 Years", serviceCategory: "Electrician", serviceName: "House Wiring", serviceDescription: "Full wiring for 2BHK", serviceDuration: "4 Hours", timeline: ["2025-03-22 10:00 AM - Booking Created", "2025-03-22 10:15 AM - Assigned to Partner", "In Progress - Partner En Route"], basePrice: "₹1000", extraCharges: "₹100", taxes: "₹100", totalAmount: "₹1200", partnerEarnings: "₹960", commission: "₹240" },
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Electrician - Wiring",         date: "22/03/2025", payment: "Paid",    amount: "₹1200", customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Electrician", partnerExperience: "8 Years", serviceCategory: "Electrician", serviceName: "House Wiring", serviceDescription: "Full wiring for 2BHK", serviceDuration: "4 Hours", timeline: ["2025-03-22 10:00 AM - Booking Created", "2025-03-22 10:15 AM - Assigned to Partner", "In Progress - Partner En Route"], basePrice: "₹1000", extraCharges: "₹100", taxes: "₹100", totalAmount: "₹1200", partnerEarnings: "₹960", commission: "₹240" },
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Electrician - Wiring",         date: "22/03/2025", payment: "Paid",    amount: "₹1200", customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Electrician", partnerExperience: "8 Years", serviceCategory: "Electrician", serviceName: "House Wiring", serviceDescription: "Full wiring for 2BHK", serviceDuration: "4 Hours", timeline: ["2025-03-22 10:00 AM - Booking Created", "2025-03-22 10:15 AM - Assigned to Partner", "In Progress - Partner En Route"], basePrice: "₹1000", extraCharges: "₹100", taxes: "₹100", totalAmount: "₹1200", partnerEarnings: "₹960", commission: "₹240" },
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Electrician - Wiring",         date: "22/03/2025", payment: "Paid",    amount: "₹1200", customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Electrician", partnerExperience: "8 Years", serviceCategory: "Electrician", serviceName: "House Wiring", serviceDescription: "Full wiring for 2BHK", serviceDuration: "4 Hours", timeline: ["2025-03-22 10:00 AM - Booking Created", "2025-03-22 10:15 AM - Assigned to Partner", "In Progress - Partner En Route"], basePrice: "₹1000", extraCharges: "₹100", taxes: "₹100", totalAmount: "₹1200", partnerEarnings: "₹960", commission: "₹240" },
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Electrician - Wiring",         date: "22/03/2025", payment: "Paid",    amount: "₹1200", customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Electrician", partnerExperience: "8 Years", serviceCategory: "Electrician", serviceName: "House Wiring", serviceDescription: "Full wiring for 2BHK", serviceDuration: "4 Hours", timeline: ["2025-03-22 10:00 AM - Booking Created", "2025-03-22 10:15 AM - Assigned to Partner", "In Progress - Partner En Route"], basePrice: "₹1000", extraCharges: "₹100", taxes: "₹100", totalAmount: "₹1200", partnerEarnings: "₹960", commission: "₹240" },
  { id: "#B001", customer: "Rahul Kumar", partner: "Vikas Sharma", service: "Electrician - Wiring",         date: "22/03/2025", payment: "Paid",    amount: "₹1200", customerPhone: "+91 9876543210", customerAddress: "123, MG Road, Bangalore", partnerPhone: "+91 9876543210", partnerProfession: "Electrician", partnerExperience: "8 Years", serviceCategory: "Electrician", serviceName: "House Wiring", serviceDescription: "Full wiring for 2BHK", serviceDuration: "4 Hours", timeline: ["2025-03-22 10:00 AM - Booking Created", "2025-03-22 10:15 AM - Assigned to Partner", "In Progress - Partner En Route"], basePrice: "₹1000", extraCharges: "₹100", taxes: "₹100", totalAmount: "₹1200", partnerEarnings: "₹960", commission: "₹240" },
];

// ── BADGE ─────────────────────────────────────────────────────────────────────
function PaymentBadge({ status }) {
  const styles = {
    Paid:     { color: "#16a34a", bg: "#22c55e", textColor: "#fff" },
    Pending:  { color: "#92400e", bg: "transparent", textColor: "#9ca3af", italic: true },
    Refunded: { color: "#a16207", bg: "#fef9c3", textColor: "#a16207" },
  };
  const s = styles[status] || styles.Pending;
  if (status === "Pending") {
    return <span style={{ fontSize: 12, color: "#9ca3af", fontStyle: "italic" }}>{status}</span>;
  }
  return (
    <span style={{
      display: "inline-block", fontSize: 12, fontWeight: 600,
      color: s.textColor, background: s.bg,
      padding: "3px 14px", borderRadius: 5,
    }}>
      {status}
    </span>
  );
}

// ── SHARED CARD / ROW HELPERS ─────────────────────────────────────────────────
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

// ── DETAIL PAGE ───────────────────────────────────────────────────────────────
function BookingDetailPage({ booking, onBack }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f7f8fa", padding: "26px 30px" }}>

      <h1 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#111" }}>
        Booking Details - {booking.id}
      </h1>
      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 22 }}>
        <span style={{ color: "#2563eb", cursor: "pointer" }}>Admin</span>
        {" / "}
        <span onClick={onBack} style={{ color: "#2563eb", cursor: "pointer" }}>Ongoing Bookings</span>
        {" / "}
        <span style={{ color: "#2563eb" }}>{booking.id}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card title="Booking Summary">
            <Row label="Booking ID"     value={booking.id} />
            <Row label="Date"           value={booking.date} />
            <Row label="Status"         valueEl={<span style={{ fontSize: 13, color: "#3b82f6", fontWeight: 500 }}>In Progress</span>} />
            <Row label="Payment Status" valueEl={<PaymentBadge status={booking.payment} />} />
          </Card>

          <Card title="Service Details">
            <Row label="Category"    value={booking.serviceCategory} />
            <Row label="Service"     value={booking.serviceName} />
            <Row label="Description" value={booking.serviceDescription} />
            <Row label="Duration"    value={booking.serviceDuration} />
          </Card>

          <Card title="Booking Timeline">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {booking.timeline.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%", marginTop: 5, flexShrink: 0,
                    background: i === booking.timeline.length - 1 ? "#3b82f6" : "#22c55e"
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
            <Row label="Base Price"    value={booking.basePrice} />
            <Row label="Extra Charges" value={booking.extraCharges} />
            <Row label="Taxes"         value={booking.taxes} />
            <div style={{ borderTop: "1px solid #f3f4f6", margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Total Amount:</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{booking.totalAmount}</span>
            </div>
            <div style={{ borderTop: "1px solid #f3f4f6", margin: "8px 0" }} />
            <Row label="Partner Earnings" value={booking.partnerEarnings} />
            <Row label="Commission"       value={booking.commission} />
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function OngoingBookings() {
  const [search, setSearch]               = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rowsPerPage, setRowsPerPage]     = useState(10);
  const [page, setPage]                   = useState(1);

  const handleView = (b) => setSelectedBooking(b);
  const handleBack = ()  => setSelectedBooking(null);

  const filtered = ONGOING_BOOKINGS_DATA.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = !q || [b.id, b.customer, b.partner, b.service].some(v => v.toLowerCase().includes(q));
    const matchPayment = paymentFilter === "All" || b.payment === paymentFilter;
    return matchSearch && matchPayment;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated  = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (selectedBooking) {
    return <BookingDetailPage booking={selectedBooking} onBack={handleBack} />;
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f7f8fa", padding: "28px 32px"}}>

      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <h1 style={{ margin: 0,  color: "#111" }}>Ongoing Bookings</h1>
        <div style={{
          display: "flex", alignItems: "center", gap: 5, background: "#fff",
          border: "1px solid #e5e7eb", borderRadius: 7, padding: "6px 14px",
          fontSize: 13, color: "#374151", cursor: "pointer", fontWeight: 500
        }}>
          All
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 22 }}>
        {[
          { label: "Total Bookings",     value: "33,345", extra: <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 600, marginLeft: 4 }}>↑37%</span> },
          { label: "Completed Bookings", value: "33,253", extra: null },
          { label: "Conversion Rate",    value: "98%",    extra: null },
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
          <div style={{ fontWeight: 600, fontSize: 15, color: "#111", marginBottom: 14 }}>Ongoing Bookings List</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>

            {/* Search */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8, border: "1px solid #e5e7eb",
              borderRadius: 7, padding: "7px 12px", background: "#fafafa", minWidth: 180
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search"
                style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", background: "transparent", width: 120 }}
              />
            </div>

            {/* Payment Status */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: 7, padding: "7px 32px 7px 12px", background: "#fff" }}>
              <select
                value={paymentFilter}
                onChange={e => { setPaymentFilter(e.target.value); setPage(1); }}
                style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", background: "transparent", cursor: "pointer", appearance: "none" }}
              >
                <option value="All">Payment Status (All)</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Refunded">Refunded</option>
              </select>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"
                style={{ position: "absolute", right: 10, pointerEvents: "none" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Date */}
            <div style={{
              display: "flex", alignItems: "center", gap: 7, border: "1px solid #e5e7eb",
              borderRadius: 7, padding: "7px 12px", fontSize: 13, color: "#bbb",
              background: "#fafafa", cursor: "pointer"
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              MM/DD/YYYY
            </div>

            {/* Filter */}
            <button style={{
              background: "#111", color: "#fff", border: "none", borderRadius: 7,
              padding: "7px 22px", fontSize: 13, fontWeight: 600, cursor: "pointer"
            }}>
              Filter
            </button>
          </div>
        </div>

        {/* Table — no Order Status column */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
              {["Booking ID", "Customer", "Partner", "Service", "Date", "Payment", "Amount", "Action"].map(h => (
                <th key={h} style={{ padding: "11px 16px", textAlign: "left", color: "#9ca3af", fontWeight: 500, fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: 36, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>No ongoing bookings found.</td>
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
                <td style={{ padding: "13px 16px" }}><PaymentBadge status={b.payment} /></td>
                <td style={{ padding: "13px 16px",color: "#111", whiteSpace: "nowrap" }}>{b.amount}</td>
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

        {/* Pagination */}
        <div style={{
          padding: "12px 20px", borderTop: "1px solid #f3f4f6",
          display: "flex", justifyContent: "flex-end", alignItems: "center",
          gap: 14, fontSize: 12, color: "#6b7280"
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
