import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export function ProtectedRoute() {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) return null; // по-късно можем да сложим spinner
    if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

    return <Outlet />;
}
