import React from 'react';
import './App.css';
import { UserProvider } from '@/context/UserContext';
import { ThemeProvider } from 'next-themes';
import { Routes, Route, Navigate } from 'react-router-dom';
import { APP_ROUTES } from './routes';

const App: React.FC = () => {
  return (
    <UserProvider>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Routes>
          {APP_ROUTES}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
