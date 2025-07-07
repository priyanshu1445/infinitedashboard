import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
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
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const metrics = [
  { label: 'Total Active Repairs', icon: Wrench, value: 34, color: 'primary' },
  { label: 'Devices in Transit', icon: Package, value: 18, color: 'info' },
  { label: 'Completed Repairs Today', icon: CheckCircle, value: 12, color: 'success' },
  { label: 'Total Engineers Online', icon: Users, value: 8, color: 'warning' },
  { label: 'Appointments Booked Today', icon: CalendarDays, value: 14, color: 'dark' },
  { label: 'Rack Utilization %', icon: MapPin, value: 78, color: 'secondary' },
  { label: 'Invoices Generated', icon: FileText, value: 9, color: 'danger' },
  { label: 'Revenue Today', icon: DollarSign, value: 45000, color: 'success' },
  { label: 'Pending Approvals / Quotes', icon: AlertTriangle, value: 5, color: 'danger' },
];

const chartData = metrics.slice(0, 6).map((item) => ({
  name: item.label.split(' ')[0],
  value: typeof item.value === 'number' ? item.value : parseInt(item.value),
}));

const Dashboard = () => {
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
              style={{ borderRadius: '1rem' }}
            >
              <Card.Body className="d-flex align-items-center gap-3 py-3 px-4">
                <div
                  className={`bg-${color} bg-opacity-10 text-${color} d-flex align-items-center justify-content-center rounded-circle`}
                  style={{
                    width: '45px',
                    height: '45px',
                    minWidth: '45px',
                  }}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <small className="text-muted">{label}</small>
                  <div className="fs-5 fw-semibold">{value}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Static Bar Chart */}
      <Card className="border-0 shadow-sm" data-aos="fade-up">
        <Card.Body>
          <h5 className="fw-semibold mb-4">🔍 Weekly Overview (Static)</h5>
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
