// pages/DashboardPage.tsx
// New dashboard page that displays after blood test upload

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dashboard } from '../components/dashboard';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth();

  const { biomarkers, testDate, labName } = location.state || {};

  useEffect(() => {
    if (!biomarkers || !testDate) {
      navigate('/upload');
      return;
    }
  }, [biomarkers, testDate, navigate]);

  // If no data, show nothing while redirecting
  if (!biomarkers || !testDate) {
    return null;
  }

  return (
    <Dashboard
      biomarkers={biomarkers}
      testDate={testDate}
      labName={labName}
      userName={profile?.name || undefined}
    />
  );
};

export default DashboardPage;
