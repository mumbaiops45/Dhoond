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
const ALL_BOOKINGS_DATA = [
  {
    id: "#B001",
    customer: "Rahul Kumar",
    customerPhone: "+91 9876543210",
    customerAddress: "123, MG Road, Bangalore",
    partner: "Rahul Kumar",
    partnerPhone: "+91 9876543210",
    partnerProfession: "Carpenter",
    partnerExperience: "5 Years",
    service: "Carpenter - Furniture Repair",
    serviceCategory: "AC Technician",
    serviceName: "AC Service jet + foam",
    serviceDescription: "Cleaning indoor and outdoor unit",
    serviceDuration: "2 Hours",
    date: "2025-08-13",
    orderStatus: "Pending",
    payment: "Pending",
    amount: "₹1200",
    timeline: [
      "2025-08-13 09:00 AM - Booking Created",
      "2025-08-13 09:10 AM - Assigned to Partner",
      "Pending - Awaiting Partner Acceptance",
    ],
    basePrice: "₹1000",
    extraCharges: "₹1000",
    taxes: "₹1000",
    totalAmount: "₹1000",
    partnerEarnings: "₹1000",
    commission: "₹1000",
  },
  {
    id: "#B002",
    customer: "Jane Smith",
    customerPhone: "+91 9876543211",
    customerAddress: "45, Park Street, Mumbai",
    partner: "Vikas Sharma",
    partnerPhone: "+91 9876543212",
    partnerProfession: "Electrician",
    partnerExperience: "8 Years",
    service: "Electrician - Wiring",
    serviceCategory: "Electrician",
    serviceName: "Full House Wiring",
    serviceDescription: "Complete wiring for 2BHK apartment",
    serviceDuration: "4 Hours",
    date: "2025-08-14",
    orderStatus: "In Progress",
    payment: "Paid",
    amount: "₹2500",
    timeline: [
      "2025-08-14 10:00 AM - Booking Created",
      "2025-08-14 10:15 AM - Assigned to Partner",
      "2025-08-14 11:00 AM - Partner En Route",
    ],
    basePrice: "₹2000",
    extraCharges: "₹300",
    taxes: "₹200",
    totalAmount: "₹2500",
    partnerEarnings: "₹2000",
    commission: "₹500",
  },
  {
    id: "#B003",
    customer: "Mitchell",
    customerPhone: "+91 9876543213",
    customerAddress: "12, Lake View, Kochi",
    partner: "Amit Kumar",
    partnerPhone: "+91 9876543214",
    partnerProfession: "Plumber",
    partnerExperience: "3 Years",
    service: "Plumbing - Pipe Repair",
    serviceCategory: "Plumber",
    serviceName: "Pipe Leak Fix",
    serviceDescription: "Fixing leaking bathroom pipe",
    serviceDuration: "1 Hour",
    date: "2025-08-10",
    orderStatus: "Completed",
    payment: "Paid",
    amount: "₹800",
    timeline: [
      "2025-08-10 08:00 AM - Booking Created",
      "2025-08-10 08:05 AM - Assigned to Partner",
      "2025-08-10 09:00 AM - Job Completed",
    ],
    basePrice: "₹600",
    extraCharges: "₹100",
    taxes: "₹100",
    totalAmount: "₹800",
    partnerEarnings: "₹640",
    commission: "₹160",
  },
  {
    id: "#B004",
    customer: "John Doe",
    customerPhone: "+91 9876543215",
    customerAddress: "88, Hill Road, Delhi",
    partner: "Joseph Mathew",
    partnerPhone: "+91 9876543216",
    partnerProfession: "AC Technician",
    partnerExperience: "6 Years",
    service: "AC Installation",
    serviceCategory: "AC Technician",
    serviceName: "AC Installation 1.5 Ton",
    serviceDescription: "Split AC installation with gas filling",
    serviceDuration: "3 Hours",
    date: "2025-08-09",
    orderStatus: "Cancelled",
    payment: "Pending",
    amount: "₹1500",
    timeline: [
      "2025-08-09 02:00 PM - Booking Created",
      "2025-08-09 02:10 PM - Assigned to Partner",
      "2025-08-09 03:00 PM - Cancelled by Customer",
    ],
    basePrice: "₹1200",
    extraCharges: "₹200",
    taxes: "₹100",
    totalAmount: "₹1500",
    partnerEarnings: "₹0",
    commission: "₹0",
  },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
function OrderBadge({ status }) {
  const colors = {
    "Pending":     "#f59e0b",
    "In Progress": "#3b82f6",
    "Completed":   "#22c55e",
    "Cancelled":   "#ef4444",
  };
  return <span style={{ color: colors[status] || "#6b7280", fontWeight: 500, fontSize: 13 }}>{status}</span>;
}

function PaymentBadge({ status }) {
  const styles = {
    "Paid":     { color: "#ffffff", bg: "#61DF41", padding: "3px 12px", borderRadius: 5 },
    "Pending":  { color: "#000000", bg: "#F2F6FF", padding: "3px 10px", borderRadius: 5 },
    "Refunded": { color: "#ffffff", bg: "#fef9c3", padding: "3px 12px", borderRadius: 5 },
  };
  const s = styles[status] || styles["Pending"];
  return (
    <span style={{
      display: "inline-block",
      width: 70,
      textAlign: "center",
      fontSize: 12,
      color: s.color,
      background: s.bg,
      padding: s.padding,
      borderRadius: s.borderRadius
    }}>
      {status}
    </span>
  );
}

function Row({ label, value, valueEl, alignLeft = false }) {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    ...(alignLeft ? { justifyContent: "flex-start" } : { justifyContent: "space-between" }),
  };
  return (
    <div style={containerStyle}>
      <div style={{ color: "#6b7280", fontSize: 13, width: "30%" }}>{label}:</div>
      <div style={{ fontSize: 13, fontWeight: 500, color: "#111" }}>{valueEl ? valueEl : value}</div>
    </div>
  );
}

function Card({ title, children, style }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px 20px", ...style }}>
      <div style={{ fontWeight: 600, fontSize: 14, color: "#111", marginBottom: 14 }}>{title}</div>
      {children}
    </div>
  );
}

// ── BOOKING DETAIL PAGE ───────────────────────────────────────────────────────
function BookingDetailPage({ booking, onBack, isMobile }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f7f8fa", padding: isMobile ? "16px 14px" : "26px 30px" }}>
      <h1 style={{ margin: "0 0 4px", fontSize: isMobile ? 17 : 20, fontWeight: 700, color: "#111" }}>
        Booking Details - {booking.id}
      </h1>
      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 22 }}>
        <span style={{ color: "#2563eb", cursor: "pointer" }}>Admin</span>
        {" / "}
        <span onClick={onBack} style={{ color: "#2563eb", cursor: "pointer" }}>All Bookings</span>
        {" / "}
        <span style={{ color: "#2563eb" }}>{booking.id}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card title="Booking Summary">
            <Row alignLeft label="Booking ID"     value={booking.id} />
            <Row alignLeft label="Date"           value={booking.date} />
            <Row alignLeft label="Status"         valueEl={<OrderBadge status={booking.orderStatus} />} />
            <Row alignLeft label="Payment Status" valueEl={<PaymentBadge status={booking.payment} />} />
          </Card>
          <Card title="Service Details">
            <Row alignLeft label="Category"    value={booking.serviceCategory} />
            <Row alignLeft label="Service"     value={booking.serviceName} />
            <Row alignLeft label="Description" value={booking.serviceDescription} />
            <Row alignLeft label="Duration"    value={booking.serviceDuration} />
          </Card>
          <Card title="Booking Timeline">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {booking.timeline.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", marginTop: 5, flexShrink: 0, background: i === booking.timeline.length - 1 ? "#f59e0b" : "#22c55e" }} />
                  <span style={{ fontSize: 12, color: "#6b7280" }}>{t}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card title="Customer Details">
            <Row alignLeft label="Name"    value={booking.customer} />
            <Row alignLeft label="Phone"   value={booking.customerPhone} />
            <Row alignLeft label="Address" value={booking.customerAddress} />
          </Card>
          <Card title="Partner Details">
            <Row alignLeft label="Name"       value={booking.partner} />
            <Row alignLeft label="Phone"      value={booking.partnerPhone} />
            <Row alignLeft label="Profession" value={booking.partnerProfession} />
            <Row alignLeft label="Experience" value={booking.partnerExperience} />
          </Card>
          <Card title="Payment Breakdown">
            <Row label="Base Price"    value={booking.basePrice} />
            <Row label="Extra Charges" value={booking.extraCharges} />
            <Row label="Taxes"         value={booking.taxes} />
            <div style={{ borderTop: "1px solid #f3f4f6", margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
              <span style={{ fontSize: 13, color: "#111", fontWeight: 700 }}>Total Amount:</span>
              <span style={{ fontSize: 13, color: "#111", fontWeight: 700 }}>{booking.totalAmount}</span>
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

// ── CALENDAR ICON ─────────────────────────────────────────────────────────────
function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// ── ALL BOOKINGS LIST ─────────────────────────────────────────────────────────
export default function AllBookings() {
  const isMobile = useIsMobile();
  const [search, setSearch]                   = useState("");
  const [paymentFilter, setPaymentFilter]     = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rowsPerPage, setRowsPerPage]         = useState(10);
  const [page, setPage]                       = useState(1);

  // ── DATE FILTER STATE ──────────────────────────────────────────────────────
  // pendingDate: what's typed in the picker (not applied yet)
  // activeDate:  what's actually filtering the table (applied on Filter click)
  const [pendingDate, setPendingDate] = useState("");
  const [activeDate, setActiveDate]   = useState("");

  const handleView = (b) => setSelectedBooking(b);
  const handleBack = ()  => setSelectedBooking(null);

  // ── FILTER LOGIC — now includes date ──────────────────────────────────────
  const filtered = ALL_BOOKINGS_DATA.filter(b => {
    const q = search.toLowerCase();
    const matchSearch  = !q || [b.id, b.customer, b.partner, b.service].some(v => v.toLowerCase().includes(q));
    const matchPayment = paymentFilter === "All" || b.payment === paymentFilter;
    // Compare booking date (YYYY-MM-DD string) with selected date
    const matchDate    = !activeDate || b.date === activeDate;
    return matchSearch && matchPayment && matchDate;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated  = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // ── APPLY FILTER HANDLER ───────────────────────────────────────────────────
  const handleFilter = () => {
    setActiveDate(pendingDate);
    setPage(1);
  };

  // ── CLEAR DATE ─────────────────────────────────────────────────────────────
  const handleClearDate = () => {
    setPendingDate("");
    setActiveDate("");
    setPage(1);
  };

  if (selectedBooking) {
    return <BookingDetailPage booking={selectedBooking} onBack={handleBack} isMobile={isMobile} />;
  }

  // Shared control styles — define once, reuse
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
    <div style={{ flex: 1, overflowY: "auto", background: "#f7f8fa", padding: isMobile ? "16px 14px" : "28px 32px" }}>

      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <h1 style={{ margin: 0, color: "#111", fontSize: isMobile ? 18 : 24 }}>All Bookings</h1>
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
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 10 : 14, marginBottom: 22 }}>
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
          <div style={{ fontWeight: 600, fontSize: 15, color: "#111", marginBottom: 14 }}>All Bookings</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>

            {/* Search */}
            <div style={{ ...controlBase, gap: 8, flex: isMobile ? "1 1 100%" : "0 0 auto", minWidth: isMobile ? 0 : 180 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search"
                style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", background: "transparent", width: isMobile ? "100%" : 120 }}
              />
            </div>

            {/* Payment filter */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: 7, padding: "7px 32px 7px 12px", background: "#fff", flex: isMobile ? "1 1 auto" : "0 0 auto" }}>
              <select
                value={paymentFilter}
                onChange={e => { setPaymentFilter(e.target.value); setPage(1); }}
                style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", background: "transparent", cursor: "pointer", appearance: "none", width: "100%" }}
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

            {/* ── DATE PICKER — desktop only, styled to match layout ── */}
            {!isMobile && (
              <div style={{
                ...controlBase,
                gap: 7,
                cursor: "pointer",
                position: "relative",
                // Highlight the wrapper when a date is actively filtering
                borderColor: activeDate ? "#111" : "#e5e7eb",
                background: activeDate ? "#f9fafb" : "#fafafa",
              }}>
                <CalendarIcon />
                <input
                  type="date"
                  value={pendingDate}
                  onChange={e => setPendingDate(e.target.value)}
                  // Hide the native placeholder text; show our own label when empty
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: 13,
                    color: pendingDate ? "#374151" : "#9ca3af",
                    background: "transparent",
                    cursor: "pointer",
                    // Keep consistent width whether date is set or not
                    width: 110,
                    // Remove the native calendar icon on webkit
                    WebkitAppearance: "none",
                  }}
                />
                {/* Clear button — only when a date is selected in pending or active */}
                {(pendingDate || activeDate) && (
                  <button
                    onClick={handleClearDate}
                    title="Clear date filter"
                    style={{
                      border: "none",
                      background: "none",
                      padding: "0 2px",
                      cursor: "pointer",
                      color: "#9ca3af",
                      fontSize: 14,
                      lineHeight: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            )}

            {/* Filter button — now actually applies date filter */}
            <button
              onClick={handleFilter}
              style={{
                background: "#111", color: "#fff", border: "none", borderRadius: 7,
                padding: "7px 22px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                flex: isMobile ? "1 1 auto" : "0 0 auto",
              }}
            >
              Filter
            </button>

            {/* Active date indicator badge */}
            {activeDate && (
              <span style={{
                fontSize: 12,
                color: "#374151",
                background: "#f3f4f6",
                border: "1px solid #e5e7eb",
                borderRadius: 5,
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                📅 {activeDate}
                <button
                  onClick={handleClearDate}
                  style={{ border: "none", background: "none", cursor: "pointer", color: "#6b7280", fontSize: 13, lineHeight: 1, padding: 0 }}
                >×</button>
              </span>
            )}
          </div>
        </div>

        {/* ── MOBILE: booking cards ── */}
        {isMobile ? (
          <div style={{ padding: "10px 14px" }}>
            {paginated.length === 0 ? (
              <div style={{ padding: 36, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>No bookings found.</div>
            ) : paginated.map((b, i) => (
              <div key={i} style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 10, padding: 14, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{b.id}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{b.date}</div>
                  </div>
                  <OrderBadge status={b.orderStatus} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", marginBottom: 10 }}>
                  {[
                    { label: "Customer", value: b.customer },
                    { label: "Partner",  value: b.partner },
                    { label: "Service",  value: b.service },
                    { label: "Amount",   value: b.amount },
                  ].map(row => (
                    <div key={row.label}>
                      <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 1 }}>{row.label}</div>
                      <div style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{row.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "1px solid #f0f0f0" }}>
                  <PaymentBadge status={b.payment} />
                  <button
                    onClick={() => handleView(b)}
                    style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "6px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                {["Booking ID", "Customer", "Partner", "Service", "Date", "Order status", "Payment", "Amount", "Action"].map(h => (
                  <th key={h} style={{ padding: "11px 16px", textAlign: "left", color: "#9ca3af", fontWeight: 500, fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: 36, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>No bookings found.</td>
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
                  <td style={{ padding: "13px 16px" }}><OrderBadge status={b.orderStatus} /></td>
                  <td style={{ padding: "13px 16px" }}><PaymentBadge status={b.payment} /></td>
                  <td style={{ padding: "13px 16px", color: "#111", whiteSpace: "nowrap" }}>{b.amount}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <button
                      onClick={() => handleView(b)}
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

        {/* Pagination */}
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