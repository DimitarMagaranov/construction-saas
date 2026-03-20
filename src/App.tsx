import { Routes, Route, Navigate } from 'react-router-dom';

import AppLayout from './shared/ui/layouts/AppLayout';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import ProjectsPage from './features/projects/pages/ProjectsPage';
import TransportRequestsPage from './features/transport/pages/TransportRequestsPage';
import LoginPage from './core/auth/LoginPage';
import { ProtectedRoute } from './core/auth/ProtectedRoute';
import { PublicOnlyRoute } from './core/auth/PublicOnlyRoute';
import ProfileSetupPage from './features/users/pages/ProfileSetupPage';
import CreateOrganizationPage from './features/organizations/pages/CreateOrganizationPage';
import OrganizationsPage from './features/organizations/pages/OrganizationsPage';

export default function App() {
    return (
        <Routes>
            <Route element={<PublicOnlyRoute />}>
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/transport" element={<TransportRequestsPage />} />
                    <Route path="/profile-setup" element={<ProfileSetupPage />} />
                    <Route path="/organizations/create" element={<CreateOrganizationPage />} />
                    <Route path="/organizations" element={<OrganizationsPage />} />
                </Route>
            </Route>
        </Routes>
    );
}
