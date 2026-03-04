"use client"
import { useState } from "react";
import Image from "next/image";
import AllBookings from "@/components/AllBooking";
import OngoingBookings from "@/components/OngoingBookings";
import CompletedBookings from "@/components/ComplatedBooking";
import CancelledBookings from "@/components/CancellBooking";
import AllTransactions from "@/components/AllTransactions";
import PendingPayments from "@/components/PendingPayments";
import RefundManagement from "@/components/RefundManagement";
import Revenue from "@/components/Revenue";
import Category from "@/components/Category";
import SubCategory from "@/components/SubCategory";
// ── DATA ─────────────────────────────────────────────────────────────────────
const USERS = [
  { id: 1, name: "Mitchell", contact: "+91 9876543210", location: "Calicut, Kerala", status: "Inactive", joined: "22/03/2025, 03:00 PM" },
  { id: 2, name: "Mitchell", contact: "+91 9876543210", location: "Calicut, Kerala", status: "Inactive", joined: "22/03/2025, 03:00 PM" },
  { id: 3, name: "John Doe", contact: "+91 9876543210", location: "Mumbai, Maharashtra", status: "Active", joined: "22/03/2025, 03:00 PM" },
  { id: 4, name: "Jane Smith", contact: "+91 9876543210", location: "Calicut, Kerala", status: "Inactive", joined: "22/03/2025, 03:00 PM" },
  { id: 5, name: "John Doe", contact: "+91 9876543210", location: "Mumbai, Maharashtra", status: "Inactive", joined: "22/03/2025, 03:00 PM" },
  { id: 6, name: "Jane Smith", contact: "+91 9876543210", location: "Mumbai, Maharashtra", status: "Active", joined: "22/03/2025, 03:00 PM" },
  { id: 7, name: "Mitchell", contact: "+91 9876543210", location: "Mumbai, Maharashtra", status: "Inactive", joined: "22/03/2025, 03:00 PM" },
  { id: 8, name: "Jane Smith", contact: "+91 9876543210", location: "Calicut, Kerala", status: "Inactive", joined: "22/03/2025, 03:00 PM" },
];
// ── PARTNER DATA ─────────────────────────────────────────────
const PARTNERS = [
  {
    id: 1,
    fullName: "David Wilson",
    contact: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    profession: "Plumber",
    status: "Active",
    joinedDate: "22/03/2025, 03:00 PM",
    verification: "Verified",
    accountNumber: "123456789012",
    bankName: "State Bank of India",
    branch: "Andheri East",
    ifscCode: "SBIN0001234",
    profileImage: "/image.png",
    partnerScore: 4.8,
    totalOrders: 124,
    totalEarned: "₹1,85,000",
    openTickets: 2,
    lastOrderDate: "28/03/2025",
    skills: "Pipe Fitting, Leak Repair, Drainage Systems",
    experience: "7 Years",
    aadharNumber: "XXXX-XXXX-XXXX",
    panCard: "XXXXX1234X",
    drivingLicense: "MH-12-XXXX-XXXX"
  },
  {
    id: 2,
    fullName: "Rahul Sharma",
    contact: "+91 9876543210",
    location: "Kerala",
    profession: "Electrician",
    status: "Inactive",
    joinedDate: "22/03/2025, 03:00 PM",
    verification: "Pending",
    accountNumber: "987654321098",
    bankName: "HDFC Bank",
    branch: "Kochi Main",
    ifscCode: "HDFC0005678",
    profileImage: "/image2.webp",
    partnerScore: 4.2,
    totalOrders: 89,
    totalEarned: "₹1,10,000",
    openTickets: 5,
    lastOrderDate: "25/03/2025",
    skills: "Wiring, Circuit Breakers, Panel Installation",
    experience: "4 Years",
    aadharNumber: "XXXX-XXXX-XXXX",
    panCard: "XXXXX5678X",
    drivingLicense: "KL-07-XXXX-XXXX"
  },
  {
    id: 3,
    fullName: "Amit Kumar",
    contact: "+91 9876543210",
    location: "Delhi",
    profession: "Carpenter",
    status: "Active",
    joinedDate: "22/03/2025, 03:00 PM",
    verification: "Verified",
    accountNumber: "456789123456",
    bankName: "ICICI Bank",
    branch: "Connaught Place",
    ifscCode: "ICIC0004321",
    profileImage: "/image3.webp",
    partnerScore: 4.9,
    totalOrders: 156,
    totalEarned: "₹2,40,000",
    openTickets: 1,
    lastOrderDate: "30/03/2025",
    skills: "Wood Working, Repair & Restoration, Decor & Painting",
    experience: "5 Years",
    aadharNumber: "XXXX-XXXX-XXXX",
    panCard: "XXXXX9012X",
    drivingLicense: "DL-01-XXXX-XXXX"
  },
  {
    id: 4,
    fullName: "Joseph Mathew",
    contact: "+91 9876543210",
    location: "Kerala",
    profession: "AC Technician",
    status: "Inactive",
    joinedDate: "22/03/2025, 03:00 PM",
    verification: "Rejected",
    accountNumber: "789123456789",
    bankName: "Axis Bank",
    branch: "Trivandrum",
    ifscCode: "UTIB0007890",
    profileImage: "/image3.png",
    partnerScore: 3.8,
    totalOrders: 64,
    totalEarned: "₹75,000",
    openTickets: 8,
    lastOrderDate: "20/03/2025",
    skills: "AC Installation, Gas Refilling, Cooling Systems",
    experience: "3 Years",
    aadharNumber: "XXXX-XXXX-XXXX",
    panCard: "XXXXX3456X",
    drivingLicense: "KL-01-XXXX-XXXX"
  }
];
// ── TABLE STYLES ─────────────────────────────────────────────

const thStyle = {
  padding: 12,
  textAlign: "left",
  fontSize: 13,
  fontWeight: 600,
  borderBottom: "1px solid #eee"
};

const tdStyle = {
  padding: 12,
  fontSize: 13,
  borderBottom: "1px solid #f2f2f2"
};

const USER_DETAIL = {
  name: "John Doe", initials: "JD",
  joined: "Mar 05, 2025", lastActive: "Aug 11, 2025",
  phone: "+91 9876543210",
  address: "21B, Greenview Apartments, Sector 12, Kochi",
  totalBookings: 20, avgRating: 4.6,
  totalSpend: "₹3,450", openTickets: 1,
  ticketPriority: "High priority", lastBooking: "11/08/25", lastBookingType: "Carpenter",
};

const BOOKINGS = [
  { id: "#BOK-9012", date: "22/03/2025", service: "AC Repair", partner: "David Wilson", amount: "₹350", status: "Completed" },
  { id: "#BOK-9012", date: "22/03/2025", service: "AC Repair", partner: "David Wilson", amount: "₹350", status: "Pending" },
  { id: "#BOK-9012", date: "22/03/2025", service: "AC Repair", partner: "David Wilson", amount: "₹350", status: "Cancelled" },
  { id: "#BOK-9012", date: "22/03/2025", service: "AC Repair", partner: "David Wilson", amount: "₹350", status: "Completed" },
];

const PAYMENTS = [
  { id: "#TX-9012", datetime: "22/03/2025, 03:00 AM", method: "UPI", amount: "₹350", status: "Success" },
  { id: "#TX-9012", datetime: "22/03/2025, 03:00 AM", method: "Credit Card", amount: "₹350", status: "Refunded" },
  { id: "#TX-9012", datetime: "22/03/2025, 03:00 AM", method: "Credit Card", amount: "₹350", status: "Failed" },
  { id: "#TX-9012", datetime: "22/03/2025, 03:00 AM", method: "Credit Card", amount: "₹350", status: "Success" },
];

const TICKETS = [
  { id: "#TKT-102", created: "22/03/2025, 03:00 AM", issue: "Missing Add-on on Booking", priority: "High", status: "Closed" },
  { id: "#TKT-102", created: "22/03/2025, 03:00 AM", issue: "Refund processed incorrectly", priority: "Medium", status: "Open" },
  { id: "#TKT-102", created: "22/03/2025, 03:00 AM", issue: "Missing Add-on on Booking", priority: "Low", status: "Closed" },
  { id: "#TKT-102", created: "22/03/2025, 03:00 AM", issue: "Missing Add-on on Booking", priority: "Low", status: "Closed" },
];

const NOTES = [
  { author: "Admin", date: "Aug 10, 2025", title: "Credit refund issued", sub: "Follow up before Aug 15" },
  { author: "Admin", date: "Aug 10, 2025", title: "Credit refund issued", sub: "Refund ID #RF234" },
];

// partener panel data 
const PartnerProfileBelow = [
  {
    service: "AC Repair",
    rate: "₹350",
    bookingCompletedCount: 12,
    averageRating: 4.5
  },
  {
    service: "Plumbing",
    rate: "₹500",
    bookingCompletedCount: 8,
    averageRating: 4.2
  },
  {
    service: "Washing Machine Repair",
    rate: "₹700",
    bookingCompletedCount: 5,
    averageRating: 4.0
  },
  {
    service: "AC Installation",
    rate: "₹1200",
    bookingCompletedCount: 3,
    averageRating: 4.7
  }
];
const WorkHystory = [
  {
    jobId: "#BOK-9012",
    customer: "Rahul Sharma",
    service: "AC Repair",
    date: "22 Mar 2025",
    earning: "₹2,500",
    status: "Completed"
  },
  {
    jobId: "#BOK-9013",
    customer: "Amit Kumar",
    service: "Plumbing",
    date: "25 Mar 2025",
    earning: "₹1,200",
    status: "Ongoing"
  },
  {
    jobId: "#BOK-9014",
    customer: "Joseph Mathew",
    service: "Washing Machine Repair",
    date: "29 Mar 2025",
    earning: "₹3,000",
    status: "Upcoming"
  },
  {
    jobId: "#BOK-9015",
    customer: "Sneha Reddy",
    service: "AC Installation",
    date: "30 Mar 2025",
    earning: "₹2,800",
    status: "Cancelled"
  },
  {
    jobId: "#BOK-9016",
    customer: "Vishal Reddy",
    service: "AC Installation",
    date: "02 Apr 2025",
    earning: "₹2,100",
    status: "Pending"
  }
];
const PartnerPayments = [
  {
    transactionId: "#TX-9012",
    datetime: "22/03/2025, 03:00 AM",
    service: "AC Repair",
    amount: "₹350",
    status: "Success"
  },
  {
    transactionId: "#TX-9013",
    datetime: "22/03/2025, 04:15 AM",
    service: "Plumbing",
    amount: "₹500",
    status: "Refunded"
  },
  {
    transactionId: "#TX-9014",
    datetime: "23/03/2025, 10:30 AM",
    service: "Washing Machine Repair",
    amount: "₹750",
    status: "Failed"
  },
  {
    transactionId: "#TX-9015",
    datetime: "24/03/2025, 01:45 PM",
    service: "AC Installation",
    amount: "₹1200",
    status: "Success"
  }
];
const Partnersupport = [
  { id: "#TKT-102", created: "22/03/2025, 03:00 AM", issue: "Missing Add-on on Booking", priority: "High", status: "Closed" },
  { id: "#TKT-102", created: "22/03/2025, 03:00 AM", issue: "Refund processed incorrectly", priority: "Medium", status: "Open" },
  { id: "#TKT-102", created: "22/03/2025, 03:00 AM", issue: "Missing Add-on on Booking", priority: "Low", status: "Closed" },
  { id: "#TKT-102", created: "22/03/2025, 03:00 AM", issue: "Missing Add-on on Booking", priority: "Low", status: "Closed" },
];


// ── HELPERS ───────────────────────────────────────────────────────────────────
const statusStyle = s => ({
  Active: { bg: "#61DF41", color: "#ffffff", border: "#86efac" },
  Inactive: { bg: "#F2F6FF", color: "#00000", border: "#cbd5e1" },
  Completed: { bg: "#61DF41", color: "#ffffff", border: "#86efac" },
  Pending: { bg: "#F2BF51", color: "#ffffff", border: "#fde047" },
  Cancelled: { bg: "#EF513E", color: "#ffffff", border: "#fca5a5" },
  Success: { bg: "#61DF41", color: "#ffffff", border: "#86efac" },
  Refunded: { bg: "#F2BF51", color: "#ffffff", border: "#fde047" },
  Failed: { bg: "#EF513E", color: "#ffffff", border: "#fca5a5" },
  Open: { bg: "#F2BF51", color: "#ffffff", border: "#fde047" },
  Closed: { bg: "#61DF41", color: "#ffffff", border: "#86efac" },
  Upcoming: { bg: "#F2F6FF", color: "#000000", border: "#F2F6FF" },
  Ongoing: { bg: "#F2BF51", color: "#ffffff", border: "#fde047" },
}[s] || { bg: "#f1f5f9", color: "#ffffff", border: "#cbd5e1" });

const priorityColor = p => p === "High" ? "#ef4444" : p === "Medium" ? "#f59e0b" : "#64748b";

function Badge({ status }) {
  const s = statusStyle(status);
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 4, fontSize: 12, fontWeight: 500,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`, whiteSpace: "nowrap"
    }}>
      {status}
    </span>
  );
}

function VerificationBadge({ status }) {
  const color = status === "Verified" ? "#16a34a"
    : status === "Pending" ? "#f59e0b"
      : "#ef4444"; // Rejected
  return (
    <span style={{ fontSize: 13, fontWeight: 500, color }}>
      {status}
    </span>
  );
}

// ── SVG ICONS ─────────────────────────────────────────────────────────────────
const ic = (d, size = 15) => (active = false) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={active ? "#ffffff" : "#000000"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

const DashIcon = ic(<><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>);
const UsersIcon = ic(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>);
const PartnerIcon = ic(<><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" /></>);
const BookIcon = ic(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>);
const TxIcon = ic(<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>);
const BellIcon = ic(<><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>);
const SupportIcon = ic(<><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>);
const SettingsIcon = ic(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>);

function LogoutSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    Icon: DashIcon,
  },
  {
    id: "users",
    label: "User Management",
    Icon: UsersIcon,
  },
  {
    id: "partners",
    label: "Partner Management",
    Icon: PartnerIcon,
    children: [
      { id: "all-partners", label: "All Partners" },
    ],
  },
  {
    id: "bookings",
    label: "Bookings",
    Icon: BookIcon,
    children: [
      { id: "all-bookings", label: "All Bookings" },
      { id: "ongoing-bookings", label: "Ongoing Bookings" },
      { id: "completed-bookings", label: "Completed Bookings" },
      { id: "cancelled-bookings", label: "Cancelled Bookings" },
    ],
  },
  {
    id: "services",
    label: "Services Categories",
    Icon: SupportIcon,
    children: [
      { id: "book-price", label: "Book at Your Price" },
      { id: "category", label: "Category" },
      { id: "sub-category", label: "Sub Category" },
    ],
  },
  {
    id: "transactions",
    label: "Transactions",
    Icon: TxIcon,
    children: [
      { id: "All-transactions", label: "All Transactions" },
      { id: "pending-payment", label: "Pending Payment" },
      { id: "refund-management", label: "Refund Management" },
      { id: "revenue", label: "Revenue" },
    ],
  },
  {
    id: "notifications",
    label: "Notifications",
    Icon: BellIcon,
  },
  {
    id: "helpsupport",
    label: "Help & Support",
    Icon: SupportIcon,
  },
  {
    id: "settings",
    label: "Settings",
    Icon: SettingsIcon,
  },
];

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function Sidebar({ active, onNav }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div style={{
      width: 230,
      minWidth: 175,
      background: "#ffffff",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflowY: "auto"
    }}>
      <nav style={{ padding: "8px 8px", flex: 1 }}>
        {NAV_ITEMS.map(({ id, label, Icon, children }) => {
          const isActive = active === id
          return (
            <div key={id}>

              {/* Main Item */}
              <div
                onClick={() => {
                  if (children) {
                    toggleMenu(id);
                  } else {
                    onNav(id);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "9px 12px",
                  borderRadius: isActive ? 7 : 0,
                  background: isActive ? "black" : "transparent",
                  color: isActive ? "#ffffff" : "#aaa",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  userSelect: "none"
                }}
              >
                {Icon(isActive)}
                <span style={{ flex: 1 }}>{label}</span>

                {children && (
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: openMenu === id ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "0.2s"
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </div>

              {/* Dropdown Items */}
              {children && openMenu === id && (
                <div style={{ marginLeft: 20, marginTop: 3 }}>
                  {children.map(child => (
                    <div
                      key={child.id}
                      onClick={() => onNav(child.id)}
                      style={{
                        padding: "7px 8px",
                        fontSize: 12,
                        borderRadius: 6,
                        background: active === child.id ? "#000" : "transparent",
                        color: active === child.id ? "#fff" : "#888",
                        cursor: "pointer"
                      }}
                    >
                      {child.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

// ── TOPBAR ────────────────────────────────────────────────────────────────────
function Topbar() {
  return (
    <div style={{
      height: 50, background: "#1a1a1a", display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 24px", flexShrink: 0
    }}>
      <span style={{ color: "#fff", fontWeight: 700, fontSize: 20, letterSpacing: "-0.3px" }}>
        Dhoond
      </span>
      <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
        <LogoutSVG />
      </button>
    </div>
  );
}

// ── USER MANAGEMENT PAGE ──────────────────────────────────────────────────────
function UserManagementPage({ onView }) {
  const [search, setSearch] = useState("");
  const filtered = USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.contact.includes(search)
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f5f5f5", padding: "26px 28px" }}>
      {/* Title row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h1 style={{ margin: 0, color: "#111" }}>User Management</h1>
        <div style={{
          display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #e5e7eb",
          borderRadius: 6, padding: "6px 12px", fontSize: 13, color: "#374151", cursor: "pointer"
        }}>
          All
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
        {[
          { label: "Total Users", value: "33,345", sub: "↑ 37%", subC: "#16a34a" },
          { label: "Active Customers", value: "3,453", sub: null },
          { label: "New Sign-ups (This Month)", value: "320", sub: "↓ 23%", subC: "#ef4444" },
        ].map(c => (
          <div key={c.label} style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "14px 18px" }}>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 5 }}>{c.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 26, fontWeight: 500, color: "#111" }}>{c.value}</span>
              {c.sub && <span style={{ fontSize: 12, color: c.subC, fontWeight: 500 }}>{c.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
        {/* Controls */}
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#111", marginBottom: 12 }}>Users List</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 7, border: "1px solid #e5e7eb",
              borderRadius: 6, padding: "6px 12px", flex: 1, background: "#fafafa"
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or phone"
                style={{ border: "none", outline: "none", fontSize: 12, color: "#374151", flex: 1, background: "transparent" }} />
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 5, border: "1px solid #e5e7eb",
              borderRadius: 6, padding: "6px 10px", fontSize: 12, color: "#374151", cursor: "pointer", whiteSpace: "nowrap"
            }}>
              Status (All)
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 5, border: "1px solid #e5e7eb",
              borderRadius: 6, padding: "6px 10px", fontSize: 12, color: "#9ca3af", cursor: "pointer"
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              MM/DD/YYYY
            </div>
            <button style={{
              background: "#111", color: "#fff", border: "none", borderRadius: 6,
              padding: "7px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer"
            }}>
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr>
              {["Name", "Contact", "Location", "Status", "Joined Date", "Action"].map(h => (
                <th key={h} style={{
                  padding: "10px 14px", textAlign: "left", color: "#6b7280",
                  fontWeight: 500, fontSize: 12, borderBottom: "1px solid #f3f4f6"
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f9fafb", transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "11px 14px", fontWeight: 500, color: "#111" }}>{u.name}</td>
                <td style={{ padding: "11px 14px", color: "#374151" }}>{u.contact}</td>
                <td style={{ padding: "11px 14px", color: "#374151" }}>{u.location}</td>
                <td style={{ padding: "11px 14px" }}><Badge status={u.status} /></td>
                <td style={{ padding: "11px 14px", color: "#374151" }}>{u.joined}</td>
                <td style={{ padding: "11px 14px" }}>
                  <button onClick={() => onView(u)}
                    style={{
                      background: "#111", color: "#fff", border: "none", borderRadius: 5,
                      padding: "5px 16px", fontSize: 12, fontWeight: 500, cursor: "pointer"
                    }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{
          padding: "12px 16px", borderTop: "1px solid #f3f4f6", display: "flex",
          justifyContent: "flex-end", alignItems: "center", gap: 10, fontSize: 12, color: "#374151"
        }}>
          <span>Rows per page:</span>
          <div style={{
            display: "flex", alignItems: "center", gap: 4, border: "1px solid #e5e7eb",
            borderRadius: 4, padding: "3px 8px", cursor: "pointer"
          }}>
            10
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
          <span>1-5 of 13</span>
          {[
            <><polyline points="15 18 9 12 15 6" /></>,
            <><polyline points="9 18 15 12 9 6" /></>,
          ].map((d, i) => (
            <button key={i} style={{
              background: "none", border: "1px solid #e5e7eb", borderRadius: 4,
              padding: "3px 6px", cursor: "pointer", display: "flex", alignItems: "center", lineHeight: 1
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// PARTNER MANAGMENT
function PartnerManagement({ onView }) {

  const [search, setSearch] = useState("");
  const filtered = PARTNERS.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.contact.includes(search)
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f5f5f5", padding: "26px 28px" }}>
      {/* Title row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h1 style={{ margin: 0, color: "#111" }}>Partner Managment</h1>
        <div style={{
          display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #e5e7eb",
          borderRadius: 6, padding: "6px 12px", fontSize: 13, color: "#374151", cursor: "pointer"
        }}>
          All
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
        {[
          { label: "Total partners", value: "33,345", sub: "↑ 37%", subC: "#16a34a" },
          { label: "partners on duty", value: "453", sub: null },
          { label: "New Sign-ups (This Month)", value: "320", sub: "↓ 23%", subC: "#ef4444" },
        ].map(c => (
          <div key={c.label} style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "14px 18px" }}>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 5 }}>{c.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 500, color: "#111" }}>{c.value}</span>
              {c.sub && <span style={{ fontSize: 12, color: c.subC, fontWeight: 500 }}>{c.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
        {/* Controls */}
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#111", marginBottom: 12 }}>Partners list</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 7, border: "1px solid #e5e7eb",
              borderRadius: 6, padding: "6px 12px", flex: 1, background: "#fafafa"
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or phone"
                style={{ border: "none", outline: "none", fontSize: 12, color: "#374151", flex: 1, background: "transparent" }} />
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 5, border: "1px solid #e5e7eb",
              borderRadius: 6, padding: "6px 10px", fontSize: 12, color: "#374151", cursor: "pointer", whiteSpace: "nowrap"
            }}>
              Status (All)
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 5, border: "1px solid #e5e7eb",
              borderRadius: 6, padding: "6px 10px", fontSize: 12, color: "#9ca3af", cursor: "pointer"
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              MM/DD/YYYY
            </div>
            <button style={{
              background: "#111", color: "#fff", border: "none", borderRadius: 6,
              padding: "7px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer"
            }}>
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr>
              {["Full Name", "Contact", "Location", "Profession", "Status", "Joined Date", "varification", "Action"].map(h => (
                <th key={h} style={{
                  padding: "10px 14px", textAlign: "left", color: "#6b7280",
                  fontWeight: 500, fontSize: 12, borderBottom: "1px solid #f3f4f6"
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={i}
                style={{ borderBottom: "1px solid #f9fafb", transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "11px 14px", fontWeight: 500, color: "#111" }}>
                  {u.fullName}
                </td>

                <td style={{ padding: "11px 14px", color: "#374151" }}>
                  {u.contact}
                </td>

                <td style={{ padding: "11px 14px", color: "#374151" }}>
                  {u.location}
                </td>

                <td style={{ padding: "11px 14px", color: "#374151" }}>
                  {u.profession}
                </td>

                <td style={{ padding: "11px 14px" }}>
                  <Badge status={u.status} />
                </td>

                <td style={{ padding: "11px 14px", color: "#374151" }}>
                  {u.joinedDate}
                </td>

                <td style={{ padding: "11px 14px" }}>
                  <VerificationBadge status={u.verification} />
                </td>

                <td style={{ padding: "11px 14px" }}>
                  <button
                    onClick={() => onView(u)}
                    style={{
                      background: "#111",
                      color: "#fff",
                      border: "none",
                      borderRadius: 5,
                      padding: "5px 16px",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer"
                    }}
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
          padding: "12px 16px", borderTop: "1px solid #f3f4f6", display: "flex",
          justifyContent: "flex-end", alignItems: "center", gap: 10, fontSize: 12, color: "#374151"
        }}>
          <span>Rows per page:</span>
          <div style={{
            display: "flex", alignItems: "center", gap: 4, border: "1px solid #e5e7eb",
            borderRadius: 4, padding: "3px 8px", cursor: "pointer"
          }}>
            10
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
          <span>1-5 of 13</span>
          {[
            <><polyline points="15 18 9 12 15 6" /></>,
            <><polyline points="9 18 15 12 9 6" /></>,
          ].map((d, i) => (
            <button key={i} style={{
              background: "none", border: "1px solid #e5e7eb", borderRadius: 4,
              padding: "3px 6px", cursor: "pointer", display: "flex", alignItems: "center", lineHeight: 1
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TAB PANELS ────────────────────────────────────────────────────────────────
function ProfilePanel() {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20 }}>
      <div style={{ fontWeight: 600, fontSize: 14, color: "#111", marginBottom: 16 }}>Profile</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 40px" }}>
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 3 }}>Full Name</div>
          <div style={{ fontSize: 13, color: "#111", fontWeight: 500 }}>John Doe</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 3 }}>Last login</div>
          <div style={{ fontSize: 13, color: "#111" }}>Aug 11, 2025, 03:00 PM</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 3 }}>Phone</div>
          <div style={{ fontSize: 13, color: "#111" }}>+91 9876543210</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 3 }}>Last Booking</div>
          <div style={{ fontSize: 13, color: "#111" }}>Aug 11, 2025, 03:00 PM</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 3 }}>Address</div>
          <div style={{ fontSize: 13, color: "#111" }}>21B, Greenview Apartments, Sector 12, Kochi</div>
        </div>
      </div>
    </div>
  );
}

function TableCard({ title, headers, rows }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid #f3f4f6", fontWeight: 600, fontSize: 14, color: "#111" }}>{title}</div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h} style={{ padding: "9px 14px", textAlign: "left", color: "#6b7280", fontWeight: 500, fontSize: 12, borderBottom: "1px solid #f3f4f6" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f9fafb" }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "12px 14px", color: "#374151", verticalAlign: "middle" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BookingsPanel() {
  return (
    <TableCard
      title="Bookings"
      headers={["Booking ID", "Date", "Service", "Partner", "Amount", "Status"]}
      rows={BOOKINGS.map(b => [b.id, b.date, b.service, b.partner, <strong>{b.amount}</strong>, <Badge status={b.status} />])}
    />
  );
}

function PaymentsPanel() {
  return (
    <TableCard
      title="Payments"
      headers={["Transaction ID", "Date & Time", "Method", "Amount", "Status"]}
      rows={PAYMENTS.map(p => [p.id, p.datetime, p.method, <strong>{p.amount}</strong>, <Badge status={p.status} />])}
    />
  );
}

function SupportPanel() {
  return (
    <TableCard
      title="Support"
      headers={["Ticket", "Created", "Issue", "Priority", "Status"]}
      rows={TICKETS.map(t => [
        t.id, t.created, t.issue,
        <span style={{ fontWeight: 500, fontSize: 13, color: priorityColor(t.priority) }}>{t.priority}</span>,
        <Badge status={t.status} />
      ])}
    />
  );
}
// partner managment panel
function WorkHystoryPanel() {
  return (
    <TableCard
      title="Work History"
      headers={[
        "Job ID",
        "Customer",
        "Service",
        "Date",
        "Earning",
        "Status"
      ]}
      rows={WorkHystory.map(b => [
        <strong>{b.jobId}</strong>,
        b.customer,
        b.service,
        b.date,
        <strong>{b.earning}</strong>,
        <Badge status={b.status} />
      ])}
    />
  );
}

function PartnerPaymentsPanel() {
  return (
    <TableCard
      title="Payments"
      headers={["Transaction ID", "DAte & Time", "Service", "Amount", "Status"]}
      rows={PartnerPayments.map(b => [b.transactionId, b.datetime, b.service, b.amount, <Badge status={b.status} />])}
    />
  );
}

function PartnersupportPanel() {
  return (
    <TableCard
      title="Payments"
      headers={["Ticket", "Created", "Issue", "Priority", "Status"]}
      rows={Partnersupport.map(b => [b.id, b.created, b.issue, b.priority, <span style={{ fontWeight: 500, fontSize: 13, color: priorityColor(b.priority) }}>{b.priority}</span>,
        <Badge status={b.status} />])}
    />
  );
}
function PartnerProfileBelowPanel() {
  return (
    <TableCard
      title="Services Provided"
      headers={["Service", "Rate", "Bookings Completed", "Average Rating"]}
      rows={PartnerProfileBelow.map(b => [
        b.service,
        b.rate,
        b.bookingCompletedCount,
        <span style={{ color: "black" }}>{b.averageRating} ★</span>
      ])}
    />
  );
}

// ── USER CARD (LEFT PANEL) ────────────────────────────────────────────────────


function UserCard({ u }) {
  return (
    <div style={{ width: 280, minWidth: 220, display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Main card */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 18 }}>
        {/* Avatar + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 46, height: 46, borderRadius: "50%", background: "#222", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, flexShrink: 0
          }}>
            {u.initials}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{u.name}</div>
            <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>Joined {u.joined}</div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>last active {u.lastActive}</div>
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>Phone No.</div>
          <div style={{ fontSize: 13, color: "#111" }}>{u.phone}</div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>Address</div>
          <div style={{ fontSize: 13, color: "#111", lineHeight: 1.4 }}>{u.address}</div>
        </div>
        {/* Stats 2x2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[
            { label: "Total Bookings", value: u.totalBookings, sub: `Avg. rating: ${u.avgRating}` },
            { label: "Total Spend", value: u.totalSpend, sub: "Lifetime" },
            { label: "Open Tickets", value: u.openTickets, sub: u.ticketPriority },
            { label: "Last Booking", value: u.lastBooking, sub: u.lastBookingType },
          ].map(c => (
            <div key={c.label} style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "8px 10px",
              background: "#E6E6E6",
              minWidth: 0,
            }}>
              <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 3 }}>{c.label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#111", lineHeight: 1.2 }}>{c.value}</div>
              <div style={{ fontSize: 9, color: "#6b7280", marginTop: 1 }}>{c.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{
            flex: 1, background: "#111", color: "#fff", border: "none", borderRadius: 6,
            padding: "5px 6px", fontSize: 12, fontWeight: 500, cursor: "pointer"
          }}>Send Message</button>
          <button style={{
            flex: 1, background: "#fff", color: "#374151", border: "1px solid #e5e7eb",
            borderRadius: 6, padding: "5px 6px", fontSize: 12, cursor: "pointer"
          }}>Deactivate</button>
        </div>
      </div>

      {/* Internal Notes */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontWeight: 600, fontSize: 13 }}>Internal Notes</span>
          <span style={{ fontSize: 11, color: "#6b7280" }}>Private</span>
        </div>
        {NOTES.map((n, i) => (
          <div key={i} style={{
            marginBottom: 12, paddingBottom: 12,
            borderBottom: i < NOTES.length - 1 ? "1px solid #f3f4f6" : "none"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>{n.author}</span>
              <span style={{ fontSize: 10, color: "#9ca3af" }}>{n.date}</span>
            </div>
            <div style={{ fontSize: 12, color: "#374151" }}>{n.title}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{n.sub}</div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 6 }}>
          <input placeholder="Add a private note..."
            style={{
              flex: 1, border: "1px solid #e5e7eb", borderRadius: 6, padding: "6px 10px",
              fontSize: 12, outline: "none", color: "#374151"
            }} />
          <button style={{
            background: "#111", color: "#fff", border: "none", borderRadius: 6,
            padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer"
          }}>Add</button>
        </div>
      </div>
    </div>
  );
}



// ── USER DETAIL PAGE ──────────────────────────────────────────────────────────
const TABS = ["Profile", "Bookings", "Payments", "Support"];

function UserDetailPage({ onBack }) {
  const [tab, setTab] = useState("Profile");

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f5f5f5", padding: "26px 28px" }}>
      <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#111" }}>User Details</h1>
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 22 }}>
        {["Admin", "User Management"].map((s, i) => (
          <span key={i}>
            <span onClick={onBack} style={{ color: "#2563eb", cursor: "pointer" }}>{s}</span>
            {" / "}
          </span>
        ))}
        <span style={{ color: "#2563eb", fontWeight: 500 }}>John Doe</span>
      </div>

      <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
        <UserCard u={USER_DETAIL} />

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", marginBottom: 16 }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  padding: "9px 18px", background: "none", border: "none",
                  borderBottom: tab === t ? "2px solid #111" : "2px solid transparent",
                  cursor: "pointer", fontSize: 13,
                  fontWeight: tab === t ? 600 : 400,
                  color: tab === t ? "#111" : "#6b7280",
                  marginBottom: -1, transition: "all 0.1s",
                }}>
                {t}
              </button>
            ))}
          </div>

          {tab === "Profile" && <ProfilePanel />}
          {tab === "Bookings" && <BookingsPanel />}
          {tab === "Payments" && <PaymentsPanel />}
          {tab === "Support" && <SupportPanel />}
        </div>
      </div>
    </div>
  );
}
// partener detail
function PartnerDetailPage({ partner, onBack }) {
  const [tab, setTab] = useState("Profile");

  const TABS = ["Profile", "Work History", "Payments", "Documents", "Bank Details", "Support"];

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f5f5f5", padding: "26px 28px" }}>

      <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700 }}>Partner Details</h1>

      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 22 }}>
        <span onClick={onBack} style={{ cursor: "pointer", color: "#2563eb" }}>
          Partner Management
        </span> / {partner.fullName}
      </div>

      <div style={{ display: "flex", gap: 20 }}>

        {/* LEFT CARD */}
        <div style={{ width: 280, minWidth: 220, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 18 }}>

            {/* Avatar + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                <Image src={partner.profileImage} alt="Partner" width={56} height={56} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{partner.fullName}</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>Joined {partner.joinedDate}</div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>last active Aug 11, 2025</div>
              </div>
            </div>

            {/* Profession + Status */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>Profession</div>
                <div style={{ fontSize: 13, color: "#111" }}>{partner.profession}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>Status</div>
                <VerificationBadge status={partner.verification} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>Location</div>
                <div style={{ fontSize: 13, color: "#111" }}>{partner.location}</div>
              </div>
            </div>

            {/* Partner Score */}
            <div style={{ background: "#111", borderRadius: 8, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: "#aaa" }}>Partner Score</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{partner.partnerScore}</span>
            </div>

            {/* Stats 2x2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12, minWidth: 0 }}>
              {[
                { label: "Total Orders", value: partner.totalOrders, sub: `Avg. rating: ${partner.partnerScore}` },
                { label: "Total Earned", value: partner.totalEarned, sub: "Lifetime" },
                { label: "Open Tickets", value: partner.openTickets, sub: "High Priority" },
                { label: "Last Order", value: partner.lastOrderDate, sub: "Wood Cutting" },
              ].map(c => (
                <div key={c.label} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 10px", background: "#E6E6E6", minWidth: 0 }}>
                  <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 3 }}>{c.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111", lineHeight: 1.2 }}>{c.value}</div>
                  <div style={{ fontSize: 9, color: "#6b7280", marginTop: 1 }}>{c.sub}</div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ flex: 1, background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "8px 0", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                Send Message
              </button>
              <button style={{ flex: 1, background: "#fff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: 6, padding: "8px 0", fontSize: 12, cursor: "pointer" }}>
                Deactivate
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={{ flex: 1 }}>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", marginBottom: 16 }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  padding: "9px 16px",
                  background: "none",
                  border: "none",
                  borderBottom: tab === t ? "2px solid #111" : "2px solid transparent",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: tab === t ? 600 : 400,
                  color: tab === t ? "#111" : "#6b7280"
                }}>
                {t}
              </button>
            ))}
          </div>

          {/* Profile Panel */}
          {tab === "Profile" && (
            <>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Profile</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 40px" }}>

                  {/* LEFT COLUMN */}
                  <div>
                    {[
                      { label: "Full Name", value: partner.fullName },
                      { label: "Phone", value: partner.contact },
                      { label: "Location", value: partner.location },
                      { label: "Age", value: "29 (12 Aug 1996)" },
                      { label: "Gender", value: "Male" },
                    ].map((row, i) => (
                      <div key={i} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>
                        <div style={{ width: 80, fontSize: 12, color: "#6b7280", flexShrink: 0 }}>{row.label}</div>
                        <div style={{ fontSize: 13, color: "#111" }}>{row.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* RIGHT COLUMN */}
                  <div>
                    {[
                      { label: "Profession", value: partner.profession },
                      { label: "Skills", value: "Wood working, Repair & Restoration, Decor & Painting" },
                      { label: "Experience", value: "5 Years" },
                    ].map((row, i) => (
                      <div key={i} style={{ padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#111", marginBottom: 4 }}>{row.label}</div>
                        <div style={{ fontSize: 12, color: "#6b7280" }}>{row.value}</div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              <PartnerProfileBelowPanel />
            </>
          )}
          {tab === "Work History" && <WorkHystoryPanel />}
          {tab === "Payments" && <PartnerPaymentsPanel />}
          {tab === "Documents" && (
            <div style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: 20
            }}>
              <div style={{ fontWeight: 600, marginBottom: 15 }}>Documents</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
                <div className="flex justify-between">
                  <div className="w-[50%]">
                    <div className="flex">
                      <div style={{  fontSize: 12, color: "#6b7280",width:"30%" }}>Aadhar Number : </div>
                      <div>{partner.aadharNumber}</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <VerificationBadge status={partner.verification} />
                    <button
                      onClick={() => onView(u)}
                      style={{
                        background: "#111",
                        color: "#fff",
                        border: "none",
                        borderRadius: 5,
                        padding: "5px 16px",
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: "pointer"
                      }}
                    >
                      View
                    </button></div>
                </div>

                <div className="flex justify-between">
                  <div className="w-[50%]">
                    <div className="flex"><div style={{  fontSize: 12, color: "#6b7280",width:"30%" }}>PAN Card : </div>
                      <div>{partner.panCard}</div></div>
                  </div>

                  <div className="flex gap-4">
                    <VerificationBadge status={partner.verification} />
                    <button
                      onClick={() => onView(u)}
                      style={{
                        background: "#111",
                        color: "#fff",
                        border: "none",
                        borderRadius: 5,
                        padding: "5px 16px",
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: "pointer"
                      }}
                    >
                      View
                    </button></div>
                </div>

                <div className="flex justify-between">
                  <div className="w-[50%]">
                    <div className="flex"><div style={{  fontSize: 12, color: "#6b7280",width:"30%" }}>Driving LIcense : </div>
                      <div>{partner.drivingLicense}</div></div>
                  </div>

                  <div className="flex gap-4">
                    <VerificationBadge status={partner.verification} />
                    <button
                      onClick={() => onView(u)}
                      style={{
                        background: "#111",
                        color: "#fff",
                        border: "none",
                        borderRadius: 5,
                        padding: "5px 16px",
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: "pointer"
                      }}
                    >
                      View
                    </button></div>
                </div>
              </div>
            </div>
          )}
          {tab === "Bank Details" && (
            <div style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: 20
            }}>
              <div style={{ fontWeight: 600, marginBottom: 15 }}>Bank Details</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
                <div>
                  <div className="flex"><div style={{ width: "20%", fontSize: 12, color: "#6b7280" }}>Account Holder Name</div>
                    <div>{partner.fullName}</div></div>

                </div>

                <div>
                  <div className="flex"><div style={{ width: "20%", fontSize: 12, color: "#6b7280" }}>Account Number</div>
                    <div>{partner.accountNumber}</div>
                  </div></div>


                <div>
                  <div className="flex"><div style={{ width: "20%", fontSize: 12, color: "#6b7280" }}>Bank Name</div>
                    <div>{partner.bankName}</div></div>

                </div>

                <div>
                  <div className="flex"><div style={{ width: "20%", fontSize: 12, color: "#6b7280" }}>Branch</div>
                    <div>{partner.branch}</div></div>

                </div>

                <div>
                  <div className="flex"><div style={{ width: "20%", fontSize: 12, color: "#6b7280" }}>IFSC code</div>
                    <div>{partner.ifscCode}</div></div>

                </div>
              </div>
            </div>
          )}
          {tab === "Support" && <PartnersupportPanel />}



        </div>
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [nav, setNav] = useState("users");
  const [detail, setDetail] = useState(false);
  const [partnerDetail, setPartnerDetail] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const handleView = () => { setDetail(true); setNav("users"); };
  const handleBack = () => setDetail(false);
  const handleNav = id => { setNav(id); if (id !== "users") setDetail(false); };

  const showDetail = nav === "users" && detail;
  const handlePartnerView = (partner) => {
    setSelectedPartner(partner);
    setPartnerDetail(true);
    setNav("all-partners");
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden",
     
    }}>
      <Topbar />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar active={nav} onNav={handleNav} />
        {showDetail ? (
          <UserDetailPage onBack={handleBack} />
        ) : nav === "users" ? (
          <UserManagementPage onView={handleView} />
        ) : nav === "all-partners" && partnerDetail ? (
          <PartnerDetailPage
            partner={selectedPartner}
            onBack={() => setPartnerDetail(false)}
          />
        ) : nav === "all-partners" ? (
          <PartnerManagement onView={handlePartnerView} />
        ) : nav === "all-bookings" ? (
          <AllBookings />) : nav === "ongoing-bookings" ? (
            <OngoingBookings />) : nav === "completed-bookings" ? (
              <CompletedBookings />) : nav === "cancelled-bookings" ? (
                <CancelledBookings />) : nav === "All-transactions" ? (
                  <AllTransactions />) : nav === "pending-payment" ? (
                    <PendingPayments />) : nav === "refund-management" ? (
                      <RefundManagement />) : nav === "revenue" ? (
                        <Revenue />) : nav === "category" ? (
                          <Category />) : nav === "sub-category" ? (
                            <SubCategory />) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f5f5f5",
              color: "#9ca3af",
              fontSize: 15
            }}
          >
            Section under construction
          </div>
        )}
      </div>
    </div>
  );
}
