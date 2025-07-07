import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import AppLayout from '../layout/AdminLayout';
import PrivateRoute from '../routes/PrivateRoute';
import Dashboard from '../features/superadmin/pages/Dashboard';
import Enquiries from '../features/superadmin/pages/Enquiries';
import VerifiedCustomer from '../features/superadmin/pages/VerifiedCustomer';
import Kyc from '../features/superadmin/pages/Kyc';
import Repair from '../features/superadmin/pages/Repair';
import Awaiting from '../features/superadmin/pages/Awaiting';
import AwaitingQuote from '../features/superadmin/pages/AwaitingQuote';
import Qc from '../features/superadmin/pages/Qc';
import CompleteRepair from '../features/superadmin/pages/CompleteRepair';
import ScrapIntake from '../features/superadmin/pages/ScrapIntake';
import RefurbProcess from '../features/superadmin/pages/RefurbProcess';
import SaleRack from '../features/superadmin/pages/SaleRack';
import BuyBack from '../features/superadmin/pages/BuyBack';
import InspectionResult from '../features/superadmin/pages/InspectionResult';
import PaymentRejection from '../features/superadmin/pages/PaymentRejection';
import BookingSchedule from '../features/superadmin/pages/BookingSchedule/';

// Placeholder Component
const Placeholder = ({ title }) => <div className="p-3">{title}</div>;

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/admin" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Layout */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        {/* Main Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Customer Management */}
        <Route path="enquiries" element={<Enquiries/>} />
        <Route path="verified-customers" element={<VerifiedCustomer />} />
        <Route path="kyc-approvals" element={<Kyc/>} />

        {/* Repair Orders */}
        <Route path="repairs" element={<Repair />} />
        <Route path="awaiting-diagnosis" element={<Awaiting />} />
        <Route path="awaiting-approval" element={<AwaitingQuote/>} />
        <Route path="in-qc" element={<Qc />} />
        <Route path="completed" element={<CompleteRepair/>} />

        {/* Scrap & Refurb */}
        <Route path="scrap-intake" element={<ScrapIntake/>} />
        <Route path="refurb-progress" element={<RefurbProcess/>} />
        <Route path="sale-rack" element={<SaleRack/>} />

        {/* Buyback Devices */}
        <Route path="buyback-requests" element={<BuyBack/>} />
        <Route path="inspection-results" element={<InspectionResult/>} />
        <Route path="payments-rejections" element={<PaymentRejection/>} />

        {/* Appointment Center */}
        <Route path="booking-schedule" element={<BookingSchedule/>} />
        <Route path="engineer-allocation" element={<Placeholder title="Engineer Allocation" />} />
        <Route path="video-logs" element={<Placeholder title="Video Call Logs" />} />

        {/* Ticketing & Support */}
        <Route path="tickets" element={<Placeholder title="All Tickets" />} />
        <Route path="sla-timers" element={<Placeholder title="SLA Timers" />} />
        <Route path="escalations" element={<Placeholder title="Escalations" />} />

        {/* Rack Management */}
        <Route path="rack-abc" element={<Placeholder title="Rack A, B, C" />} />
        <Route path="slot-overview" element={<Placeholder title="Slot Overview" />} />
        <Route path="move-items" element={<Placeholder title="Move/Update Items" />} />

        {/* Engineer Panel */}
        <Route path="engineers" element={<Placeholder title="Add/View Engineers" />} />
        <Route path="assignment-logs" element={<Placeholder title="Assignment Logs" />} />
        <Route path="work-history" element={<Placeholder title="Work History" />} />

        {/* QR & Tracking */}
        <Route path="generate-qr" element={<Placeholder title="Generate New QR" />} />
        <Route path="scan-logs" element={<Placeholder title="Scan Logs" />} />

        {/* Reports */}
        <Route path="repair-reports" element={<Placeholder title="Repair Reports" />} />
        <Route path="financial-reports" element={<Placeholder title="Financial Reports" />} />
        <Route path="rack-utilization" element={<Placeholder title="Rack Utilization" />} />
        <Route path="appointment-summary" element={<Placeholder title="Appointment Summary" />} />
        <Route path="export-data" element={<Placeholder title="Export Data (CSV/PDF)" />} />

        {/* Settings */}
        <Route path="kyc-config" element={<Placeholder title="KYC Config" />} />
        <Route path="whatsapp-keys" element={<Placeholder title="WhatsApp API Keys" />} />
        <Route path="shipping-settings" element={<Placeholder title="Shiprocket/Zoom Settings" />} />

        {/* Fallback Redirect */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
