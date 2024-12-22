import React from 'react';
import './App.css';
import { UserProvider } from '@/context/UserContext';
import { ThemeProvider } from 'next-themes';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/login';
import { ADMIN_ROUTES } from './routes/admin/adminpanel';

const App: React.FC = () => {
  return (
    <UserProvider>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Routes>
          <Route path="/login" element={<Login />} />
          {ADMIN_ROUTES}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
