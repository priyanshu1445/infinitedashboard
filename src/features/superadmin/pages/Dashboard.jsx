import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import {
  Wrench,
  Package,
  CheckCircle,
  Users,
  CalendarDays,
  MapPin,
  FileText,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getAllUsers } from "../../../apis/admin/users";
import { getAllRepairOrders } from "../../../apis/admin/repairOrders";
import { getAllTickets } from "../../../apis/admin/supportTickets";
import { getAllRacks } from "../../../apis/admin/racks";

const Dashboard = () => {
  const [metrics, setMetrics] = useState([
    { label: "Total Active Repairs", icon: Wrench, value: 0, color: "primary" },
    { label: "Devices in Transit", icon: Package, value: 0, color: "info" },
    { label: "Completed Repairs Today", icon: CheckCircle, value: 0, color: "success" },
    { label: "Total Engineers Online", icon: Users, value: 0, color: "warning" },
    { label: "Appointments Booked Today", icon: CalendarDays, value: 0, color: "dark" },
    { label: "Rack Utilization %", icon: MapPin, value: 0, color: "secondary" },
    { label: "Invoices Generated", icon: FileText, value: 0, color: "danger" },
    { label: "Revenue Today", icon: DollarSign, value: 0, color: "success" },
    { label: "Pending Approvals / Quotes", icon: AlertTriangle, value: 0, color: "danger" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, repairsRes, ticketsRes, racksRes] = await Promise.all([
          getAllUsers(),
          getAllRepairOrders(),
          getAllTickets(),
          getAllRacks(),
        ]);

        const users = usersRes?.data || usersRes || [];
        const repairs = repairsRes?.data || repairsRes || [];
        const tickets = ticketsRes?.data || ticketsRes || [];
        const racks = racksRes?.data || racksRes || [];

        const totalRepairs = repairs.length;
        const completedRepairs = repairs.filter(
          (r) => r.status?.toLowerCase() === "completed"
        ).length;
        const inTransit = repairs.filter(
          (r) => r.status?.toLowerCase() === "in transit"
        ).length;
        const pendingRepairs = repairs.filter(
          (r) => r.status?.toLowerCase() === "pending"
        ).length;

        // Update metrics (keep same structure so UI stays same)
        setMetrics([
          { label: "Total Active Repairs", icon: Wrench, value: totalRepairs, color: "primary" },
          { label: "Devices in Transit", icon: Package, value: inTransit, color: "info" },
          { label: "Completed Repairs Today", icon: CheckCircle, value: completedRepairs, color: "success" },
          { label: "Total Engineers Online", icon: Users, value: users.length, color: "warning" },
          { label: "Appointments Booked Today", icon: CalendarDays, value: 0, color: "dark" },
          { label: "Rack Utilization %", icon: MapPin, value: racks.length, color: "secondary" },
          { label: "Invoices Generated", icon: FileText, value: tickets.length, color: "danger" },
          { label: "Revenue Today", icon: DollarSign, value: 45000, color: "success" },
          { label: "Pending Approvals / Quotes", icon: AlertTriangle, value: pendingRepairs, color: "danger" },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Chart data
  const chartData = metrics.slice(0, 6).map((item) => ({
    name: item.label.split(" ")[0],
    value: Number(item.value) || 0,
  }));

  return (
    <div>
      <h4 className="fw-bold mb-4">📊 Dashboard Overview</h4>

      {/* Cards */}
      <Row className="g-4 mb-5">
        {metrics.map(({ label, icon: Icon, value, color }, idx) => (
          <Col key={idx} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="border-0 shadow-sm h-100"
              data-aos="fade-up"
              data-aos-delay={idx * 50}
              style={{ borderRadius: "1rem" }}
            >
              <Card.Body className="d-flex align-items-center gap-3 py-3 px-4">
                <div
                  className={`bg-${color} bg-opacity-10 text-${color} d-flex align-items-center justify-content-center rounded-circle`}
                  style={{
                    width: "45px",
                    height: "45px",
                    minWidth: "45px",
                  }}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <small className="text-muted">{label}</small>
                  <div className="fs-5 fw-semibold">
                    {loading ? <Spinner size="sm" animation="border" /> : value}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Chart */}
      <Card className="border-0 shadow-sm" data-aos="fade-up">
        <Card.Body>
          <h5 className="fw-semibold mb-4">🔍 Weekly Overview (Live Data)</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0d6efd" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;
