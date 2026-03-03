import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import FullPageLoader from '../../shared/ui/FullPageLoader';

export function ProtectedRoute() {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) return <FullPageLoader />;
    if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

    return <Outlet />;
}
