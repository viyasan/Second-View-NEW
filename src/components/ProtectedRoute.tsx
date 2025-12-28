// components/ProtectedRoute.tsx
// Component to protect routes that require authentication

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireOnboarding = true,
}) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="w-8 h-8 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in - redirect to sign up
  if (!user) {
    return <Navigate to="/signup" state={{ from: location.pathname }} replace />;
  }

  // Logged in but hasn't completed onboarding
  if (requireOnboarding && profile && !profile.onboarding_completed) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};
