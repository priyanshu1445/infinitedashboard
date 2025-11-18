// Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Wrench, Trash, RefreshCcw, ShoppingCart, Calendar,
  Video, HelpCircle, BarChart2, QrCode, LogOut, Settings, ChevronDown, ChevronRight
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `nav-link d-flex align-items-center gap-2 px-3 py-2 ${isActive ? 'bg-primary text-white' : 'text-dark'}`
    }
  >
    <Icon size={18} />
    {label}
  </NavLink>
);

const SidebarGroup = ({ icon: Icon, label, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-2">
      <div
        className="d-flex justify-content-between align-items-center px-2 py-2 text-dark fw-bold"
        style={{ cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      >
        <span className="d-flex align-items-center gap-2">
          <Icon size={18} />
          {label}
        </span>
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </div>
      {open && <div className="ms-4">{children}</div>}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="vh-100 bg-light border-end" style={{ width: 240, overflowY: 'auto' }}>
      <div className="p-3 border-bottom text-primary fw-bold fs-5">Admin Panel</div>

      {/* Dashboard */}
      <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/admin/dashboard" />
          {/* All Products */}

           <SidebarGroup icon={Users} label="All Products">
        <SidebarItem icon={HelpCircle} label="Products" path="/admin/all-products" />
      
      </SidebarGroup>

      {/* Customer Management */}
      <SidebarGroup icon={Users} label="Customer Management">
        <SidebarItem icon={HelpCircle} label="Enquiries" path="/admin/enquiries" />
        {/* <SidebarItem icon={HelpCircle} label="Verified Customers" path="/admin/verified-customers" />
        <SidebarItem icon={HelpCircle} label="KYC Approvals" path="/admin/kyc-approvals" /> */}
      </SidebarGroup>



  

      {/* Repair Orders */}
      <SidebarGroup icon={Wrench} label="Repair Orders">
        <SidebarItem icon={HelpCircle} label="All Repairs" path="/admin/repairs" />
        <SidebarItem icon={HelpCircle} label="Approve Products" path="/admin/approve-products" />
        <SidebarItem icon={HelpCircle} label=" Not Approve Products" path="/admin/not-approve-products" />
        {/* <SidebarItem icon={HelpCircle} label="Awaiting Diagnosis" path="/admin/awaiting-diagnosis" /> */}
        <SidebarItem icon={HelpCircle} label="Awaiting Quote Approval" path="/admin/awaiting-approval" />
        <SidebarItem icon={HelpCircle} label="All Quality Check" path="/admin/in-qc" />
        {/* <SidebarItem icon={HelpCircle} label="Completed & Invoiced" path="/admin/completed" /> */}
      </SidebarGroup>

      {/* Scrap & Refurb */}
      {/* <SidebarGroup icon={Trash} label="Scrap & Refurb">
        <SidebarItem icon={HelpCircle} label="Scrap Intake" path="/admin/scrap-intake" />
        <SidebarItem icon={HelpCircle} label="Refurb Progress" path="/admin/refurb-progress" />
        <SidebarItem icon={HelpCircle} label="Sale Rack Items" path="/admin/sale-rack" />
      </SidebarGroup> */}

      {/* Buyback Devices */}
      {/* <SidebarGroup icon={RefreshCcw} label="Buyback Devices">
        <SidebarItem icon={HelpCircle} label="Buyback Requests" path="/admin/buyback-requests" />
        <SidebarItem icon={HelpCircle} label="Inspection Results" path="/admin/inspection-results" />
        <SidebarItem icon={HelpCircle} label="Payments / Rejections" path="/admin/payments-rejections" />
      </SidebarGroup> */}

      {/* Appointment Center */}
      <SidebarGroup icon={Calendar} label="Appointment Center">
        <SidebarItem icon={HelpCircle} label="Booking Schedule" path="/admin/booking-schedule" />
        <SidebarItem icon={HelpCircle} label="Engineer Allocation" path="/admin/engineer-allocation" />
        <SidebarItem icon={Video} label="Video Call Logs" path="/admin/video-logs" />
      </SidebarGroup>

      {/* Ticketing & Support */}
      <SidebarGroup icon={HelpCircle} label="Ticketing & Support">
        <SidebarItem icon={HelpCircle} label="All Tickets" path="/admin/tickets" />
        {/* <SidebarItem icon={HelpCircle} label="SLA Timers" path="/admin/sla-timers" />
        <SidebarItem icon={HelpCircle} label="Escalations" path="/admin/escalations" /> */}
      </SidebarGroup>

      {/* Rack Management */}
      <SidebarGroup icon={ShoppingCart} label="Rack Management">
        <SidebarItem icon={HelpCircle} label="Rack A, B, C" path="/admin/rack-abc" />
        <SidebarItem icon={HelpCircle} label="Slot Overview" path="/admin/slot-overview" />
        <SidebarItem icon={HelpCircle} label="Move/Update Items" path="/admin/move-items" />
      </SidebarGroup>

      {/* Engineer Panel */}
      <SidebarGroup icon={Users} label="Engineer Panel">
        <SidebarItem icon={HelpCircle} label="Add/View Engineers" path="/admin/engineers" />
        <SidebarItem icon={HelpCircle} label="Assignment Logs" path="/admin/assignment-logs" />
        {/* <SidebarItem icon={HelpCircle} label="Work History" path="/admin/work-history" /> */}
      </SidebarGroup>



{/*  packing  */}

        <SidebarGroup icon={Users} label="Packing Panel">
        <SidebarItem icon={HelpCircle} label="Packed Products" path="/admin/packed-products" />
        <SidebarItem icon={HelpCircle} label="Delivered Products" path="/admin/delivered-products" />
 
      </SidebarGroup>

      {/* QR & Tracking */}
      {/* <SidebarGroup icon={QrCode} label="QR & Tracking">
        <SidebarItem icon={HelpCircle} label="Generate New QR" path="/admin/generate-qr" />
        <SidebarItem icon={HelpCircle} label="Scan Logs" path="/admin/scan-logs" />
      </SidebarGroup> */}

      {/* Reports */}
      {/* <SidebarGroup icon={BarChart2} label="Reports & Analytics">
        <SidebarItem icon={HelpCircle} label="Repair Reports" path="/admin/repair-reports" />
        <SidebarItem icon={HelpCircle} label="Financial Reports" path="/admin/financial-reports" />
        <SidebarItem icon={HelpCircle} label="Rack Utilization" path="/admin/rack-utilization" />
        <SidebarItem icon={HelpCircle} label="Appointment Summary" path="/admin/appointment-summary" />
        <SidebarItem icon={HelpCircle} label="Export Data" path="/admin/export-data" />
      </SidebarGroup> */}

      {/* Settings */}
      <SidebarGroup icon={Settings} label="Settings">
        <SidebarItem icon={HelpCircle} label="KYC Config" path="/admin/kyc-config" />
        <SidebarItem icon={HelpCircle} label="WhatsApp API Keys" path="/admin/whatsapp-keys" />
        <SidebarItem icon={HelpCircle} label="Shiprocket/Zoom" path="/admin/shipping-settings" />
      </SidebarGroup>

      {/* Logout */}
      <SidebarItem icon={LogOut} label="Logout" path="/login" />
    </div>
  );
};

export default Sidebar;
