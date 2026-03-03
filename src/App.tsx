import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AppLayout from './shared/ui/layouts/AppLayout';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import ProjectsPage from './features/projects/pages/ProjectsPage';
import TransportRequestsPage from './features/transport/pages/TransportRequestsPage';
import LoginPage from './core/auth/LoginPage';
import { ProtectedRoute } from './core/auth/ProtectedRoute';

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/transport" element={<TransportRequestsPage />} />
                </Route>
            </Route>
        </Routes>
    );
}
