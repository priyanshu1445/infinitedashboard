import React, { useState, useMemo } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import {
  Eye,
  XCircle,
  Pencil,
  CheckCircle,
  Send,
  Calendar as CalendarIcon,
  PlusCircle,
  List,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateAppointmentModal from '../../../components/common/modal/CreateAppointmentModal';
import {
  Calendar as BigCalendar,
} from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isSameDay } from 'date-fns';
import { dateFnsLocalizer } from 'react-big-calendar';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DataTable from 'react-data-table-component';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// ✅ Mock appointment data (like inspection page)
const mockAppointments = [
  {
    id: 1,
    title: 'Sneha R. - iPhone 11',
    start: new Date(),
    end: new Date(new Date().getTime() + 30 * 60000),
    engineer: 'Eng. Sneha',
    status: 'Paid',
    mode: 'Video',
    customerName: 'Sneha R.',
    deviceModel: 'iPhone 11',
  },
  {
    id: 2,
    title: 'Amit P. - Samsung S21',
    start: new Date(new Date().getTime() + 60 * 60000),
    end: new Date(new Date().getTime() + 90 * 60000),
    engineer: 'Eng. Alok',
    status: 'Pending',
    mode: 'Telephonic',
    customerName: 'Amit P.',
    deviceModel: 'Samsung S21',
  },
  {
    id: 3,
    title: 'Riya K. - MacBook Pro',
    start: new Date(new Date().getTime() + 2 * 60 * 60000),
    end: new Date(new Date().getTime() + 2.5 * 60 * 60000),
    engineer: 'Eng. Priya',
    status: 'Completed',
    mode: 'Walk-in',
    customerName: 'Riya K.',
    deviceModel: 'MacBook Pro',
  },
  {
    id: 4,
    title: 'Rahul S. - iPad Air',
    start: new Date(new Date().getTime() + 3 * 60 * 60000),
    end: new Date(new Date().getTime() + 3.5 * 60 * 60000),
    engineer: 'Eng. Rohit',
    status: 'Cancelled',
    mode: 'Video',
    customerName: 'Rahul S.',
    deviceModel: 'iPad Air',
  },
  {
    id: 5,
    title: 'Neha M. - Dell XPS',
    start: new Date(new Date().getTime() + 4 * 60 * 60000),
    end: new Date(new Date().getTime() + 4.5 * 60 * 60000),
    engineer: 'Eng. Meena',
    status: 'Paid',
    mode: 'Telephonic',
    customerName: 'Neha M.',
    deviceModel: 'Dell XPS',
  },
];

const BookingSchedule = () => {
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('calendar');
  const [appointmentType, setAppointmentType] = useState('All');
  const [date, setDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('');

  const [appointments, setAppointments] = useState(mockAppointments);

  const [visibleEngineers, setVisibleEngineers] = useState([
    { id: 1, name: 'Eng. Alok', show: true },
    { id: 2, name: 'Eng. Sneha', show: true },
    { id: 3, name: 'Eng. Priya', show: true },
    { id: 4, name: 'Eng. Rohit', show: true },
    { id: 5, name: 'Eng. Meena', show: true },
  ]);

  const toggleEngineer = (id) => {
    setVisibleEngineers((prev) =>
      prev.map((eng) => (eng.id === id ? { ...eng, show: !eng.show } : eng))
    );
  };

  const handleAppointmentSubmit = (data) => {
    const newEvent = {
      id: appointments.length + 1,
      title: `${data.customerName} - ${data.deviceModel}`,
      start: new Date(data.preferredTime),
      end: new Date(new Date(data.preferredTime).getTime() + data.duration * 60000),
      engineer: data.engineer,
      status: 'Upcoming',
      mode: data.mode,
      customerName: data.customerName,
      deviceModel: data.deviceModel,
    };
    setAppointments([...appointments, newEvent]);
    toast.success('Appointment Created Successfully!');
    setShowModal(false);
  };

  const onEventDrop = ({ event, start, end }) => {
    setAppointments((prev) =>
      prev.map((e) => (e.id === event.id ? { ...e, start, end } : e))
    );
  };

  const onEventResize = ({ event, start, end }) => {
    setAppointments((prev) =>
      prev.map((e) => (e.id === event.id ? { ...e, start, end } : e))
    );
  };

  const handleSelectEvent = (event) => {
    toast.info(`Selected Appointment: ${event.title}`);
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      const matchSearch =
        a.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.deviceModel.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = appointmentType === 'All' || a.mode === appointmentType;
      const matchPayment = !paymentStatus || a.status === paymentStatus;
      const matchStatus = !appointmentStatus || a.status === appointmentStatus;
      const matchDate = !date || isSameDay(new Date(a.start), new Date(date));
      return matchSearch && matchType && matchPayment && matchStatus && matchDate;
    });
  }, [appointments, searchTerm, appointmentType, paymentStatus, appointmentStatus, date]);

  const columns = [
    { name: 'Time', selector: (row) => new Date(row.start).toLocaleTimeString(), sortable: true },
    { name: 'Customer', selector: (row) => row.customerName },
    { name: 'Device', selector: (row) => row.deviceModel },
    { name: 'Engineer', selector: (row) => row.engineer },
    { name: 'Mode', selector: (row) => row.mode },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => (
        <span className={`badge ${
          row.status === 'Paid' ? 'bg-success' :
          row.status === 'Pending' ? 'bg-warning text-dark' :
          row.status === 'Completed' ? 'bg-info' :
          row.status === 'Cancelled' ? 'bg-danger' :
          'bg-secondary'
        }`}>
          {row.status}
        </span>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => console.log('View clicked', row)}
          >
            <Eye size={14} className="me-1" />
            View
          </Button>
          <Dropdown.Toggle split size="sm" variant="outline-primary" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => console.log('Edit', row)}>
              <Pencil size={14} className="me-2 text-warning" />
              Edit
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log('Cancel', row)}>
              <XCircle size={14} className="me-2 text-danger" />
              Cancel
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log('Mark Done', row)}>
              <CheckCircle size={14} className="me-2 text-success" />
              Mark Done
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log('Send WhatsApp', row)}>
              <Send size={14} className="me-2 text-info" />
              Send WhatsApp
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      button: true,
    },
  ];

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        <CalendarIcon size={20} className="me-2 text-primary" /> Booking Schedule
        <Button
          variant="outline-secondary"
          size="sm"
          className="ms-auto d-flex align-items-center"
          onClick={() => setViewMode(viewMode === 'calendar' ? 'table' : 'calendar')}
        >
          {viewMode === 'calendar' ? <List size={16} className="me-1" /> : <CalendarIcon size={16} className="me-1" />}
          {viewMode === 'calendar' ? 'Table View' : 'Calendar View'}
        </Button>
      </h5>

      <Row className="g-3 mb-4">
        <Col md={2}>
          <Form.Select value={appointmentType} onChange={(e) => setAppointmentType(e.target.value)}>
            <option>All</option>
            <option>Telephonic</option>
            <option>Video</option>
            <option>Walk-in</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Col>
        <Col md={3}>
          <Form.Control placeholder="Search Customer or Device" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </Col>
        <Col md={2}>
          <Form.Select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
            <option value="">Payment Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select value={appointmentStatus} onChange={(e) => setAppointmentStatus(e.target.value)}>
            <option value="">Status</option>
            <option>Upcoming</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </Form.Select>
        </Col>
        <Col md="auto">
          <Button variant="outline-primary" onClick={() => setShowModal(true)}>
            <PlusCircle size={16} className="me-2" /> Create Appointment
          </Button>
        </Col>
      </Row>

      {viewMode === 'calendar' ? (
        <Row>
          <Col md={2}>
            <div className="border rounded bg-white p-2">
              <strong>Engineers</strong>
              <ul className="list-unstyled mt-2">
                {visibleEngineers.map((eng) => (
                  <li key={eng.id} className="d-flex align-items-center mb-2">
                    <Form.Check
                      type="switch"
                      id={`toggle-${eng.id}`}
                      label={eng.name}
                      checked={eng.show}
                      onChange={() => toggleEngineer(eng.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col md={10}>
            <div className="calendar-view border rounded bg-light p-2">
              <BigCalendar
                localizer={localizer}
                events={filteredAppointments.filter((e) =>
                  visibleEngineers.find((v) => v.name === e.engineer && v.show)
                )}
                defaultView="week"
                views={['week']}
                step={15}
                timeslots={2}
                style={{ height: '60vh' }}
                resizable
                selectable
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                draggableAccessor={() => true}
                onSelectEvent={handleSelectEvent}
              />
            </div>
          </Col>
        </Row>
      ) : (
        <DataTable
          columns={columns}
          data={filteredAppointments}
          pagination
          highlightOnHover
          striped
        />
      )}

      <CreateAppointmentModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleAppointmentSubmit}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default BookingSchedule;
