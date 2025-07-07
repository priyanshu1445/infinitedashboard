import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/sidebar/Sidebar';
import Topbar from '../components/common/topbar/Topbar';
import Footer from '../components/common/footer/Footer';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleResize = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) setSidebarOpen(false);
    else setSidebarOpen(true);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Topbar */}
      <Topbar onToggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: sidebarOpen ? 0 : '-240px', // 🔥 Always toggle with state
          width: '240px',
          height: '100vh',
          backgroundColor: '#f8f9fa',
          borderRight: '1px solid #dee2e6',
          transition: 'left 0.3s ease-in-out',
          zIndex: 1050,
        }}
      >
        <Sidebar />
      </div>

      {/* Backdrop for mobile only */}
      {isMobile && sidebarOpen && (
        <div
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 1040,
          }}
        />
      )}

      {/* Page Content */}
      <div
        style={{
          marginLeft: !isMobile && sidebarOpen ? '240px' : '0', // shift content on desktop only
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#f8f9fa',
          paddingTop: '56px',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <main style={{ padding: '1rem', minHeight: 'calc(100vh - 56px - 60px)' }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
