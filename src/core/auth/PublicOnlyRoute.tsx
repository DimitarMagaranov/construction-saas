import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import FullPageLoader from '../../shared/ui/FullPageLoader';

export function PublicOnlyRoute() {
    const { user, isLoading } = useAuth();

    if (isLoading) return <FullPageLoader />;
    if (user) return <Navigate to="/dashboard" replace />;

    return <Outlet />;
}
