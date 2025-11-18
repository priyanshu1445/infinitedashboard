import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 600, // animation duration in ms
      once: true,     // animation only happens once
      easing: 'ease-in-out',
    });
  }, []);

  return <AppRoutes />;
};

export default App;
