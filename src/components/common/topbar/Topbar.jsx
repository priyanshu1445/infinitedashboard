import React, { useEffect, useState } from 'react';
import {
  Navbar,
  Container,
  Button,
  Dropdown,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { Menu, Bell, Moon, Sun, User, LogOut, Settings, FileText, UserCircle2 } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Topbar = ({ onToggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <Navbar
      fixed="top"
      bg="white"
      className="shadow-sm border-bottom px-3"
      style={{ zIndex: 1060, height: '56px' }}
    >
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Left side */}
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onToggleSidebar}
            className="d-flex align-items-center"
          >
            <Menu size={20} />
          </Button>
          <span className="fw-bold text-primary">Admin Panel</span>
        </div>

        {/* Right side */}
        <div className="d-flex align-items-center gap-3">
          {/* Global Search */}
          <InputGroup size="sm" className="d-none d-md-flex" style={{ width: '250px' }}>
            <FormControl placeholder="Search..." />
          </InputGroup>

          {/* Notifications */}
          <Button variant="outline-secondary" size="sm"  className="text-dark position-relative">
            <Bell size={18} />
            <span
              className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
              style={{ fontSize: '0.5rem' }}
            ></span>
          </Button>

          {/* Theme Toggle */}
          <Button variant="outline-secondary" size="sm" onClick={handleThemeToggle}>
            {darkMode ? <Sun size={20} /> : <Moon size={18} />}
          </Button>

          {/* Profile Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              <User size={18} />
            </Dropdown.Toggle>

            <Dropdown.Menu data-aos="fade-down">
              <Dropdown.Header>
                <strong>Super Admin</strong>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item href="/admin/profile">
                <UserCircle2 size={16} className="me-2" />
                View Profile
              </Dropdown.Item>
              <Dropdown.Item href="/admin/settings">
                <Settings size={16} className="me-2" />
                Account Settings
              </Dropdown.Item>
              <Dropdown.Item href="/admin/activity-log">
                <FileText size={16} className="me-2" />
                Activity Log
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/logout" className="text-danger">
                <LogOut size={16} className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default Topbar;
