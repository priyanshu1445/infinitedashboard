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
import BookingSchedule from '../features/superadmin/pages/BookingSchedule';
import EngineerAllocation from '../features/superadmin/pages/EngineerAllocation';
import ViedoLog from '../features/superadmin/pages/ViedoLog';
import AllTickets from '../features/superadmin/pages/AllTickets';
import SlaTimer from '../features/superadmin/pages/SlaTimer';
import Escalations from '../features/superadmin/pages/Escalations';
import Rack from '../features/superadmin/pages/Rack';
import SlotOverview from '../features/superadmin/pages/SlotOverview';
import Move from '../features/superadmin/pages/Move';
import AddEngineer from '../features/superadmin/pages/AddEngineer';
import AssignmentLogs from '../features/superadmin/pages/AssignmentLogs';
import WorkHistory from '../features/superadmin/pages/WorkHistory';
import GenerateQR from '../features/superadmin/pages/GenerateQR';
import ScanLogs from '../features/superadmin/pages/ScanLogs';
import RepairReport from '../features/superadmin/pages/RepairReport';
import FinancialReport from '../features/superadmin/pages/FinancialReport';
import RackUtilization from '../features/superadmin/pages/RackUtilization';
import AppointmentSummary from '../features/superadmin/pages/AppointmentSummary';
import ExportData from '../features/superadmin/pages/ExportData';
import ApprovedProducts from '../features/superadmin/pages/ApproveProducts';
import NotApprovedProducts from '../features/superadmin/pages/NotApprovedProducts';
import AllProducts from '../features/superadmin/pages/AllProducts';
import PackedProducts from '../features/superadmin/pages/PackedProducts';
import DeliveredProducts from '../features/superadmin/pages/DeliveredProducts';

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
        <Route path="all-products" element={<AllProducts />} />

        {/* Customer Management */}
        <Route path="enquiries" element={<Enquiries/>} />
        <Route path="verified-customers" element={<VerifiedCustomer />} />
        <Route path="kyc-approvals" element={<Kyc/>} />

        {/* Repair Orders */}
        <Route path="repairs" element={<Repair />} />
        <Route path="approve-products" element={<ApprovedProducts />} />
        <Route path="not-approve-products" element={<NotApprovedProducts/>} />
        {/* <Route path="awaiting-diagnosis" element={<Awaiting />} /> */}
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
        <Route path="engineer-allocation" element={<EngineerAllocation />} />
        <Route path="video-logs" element={<ViedoLog/>} />

        {/* Ticketing & Support */}
        <Route path="tickets" element={<AllTickets />} />
        <Route path="sla-timers" element={<SlaTimer />} />
        <Route path="escalations" element={<Escalations/>} />

        {/* Rack Management */}
        <Route path="rack-abc" element={<Rack/>} />
        <Route path="slot-overview" element={<SlotOverview/>} />
        <Route path="move-items" element={<Move/>} />

        {/* Engineer Panel */}
        <Route path="engineers" element={<AddEngineer/>} />
        <Route path="assignment-logs" element={<AssignmentLogs/>} />
        <Route path="work-history" element={<WorkHistory/>} />


<Route path="packed-products" element={<PackedProducts />} />
<Route path="delivered-products" element={<DeliveredProducts />} />
        {/* QR & Tracking */}
        <Route path="generate-qr" element={<GenerateQR />} />
        <Route path="scan-logs" element={<ScanLogs/>} />

        {/* Reports */}
        <Route path="repair-reports" element={<RepairReport />} />
        <Route path="financial-reports" element={<FinancialReport/>} />
        <Route path="rack-utilization" element={<RackUtilization/>} />
        <Route path="appointment-summary" element={<AppointmentSummary/>} />
        <Route path="export-data" element={<ExportData />} />

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
