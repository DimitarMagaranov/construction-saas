import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import TransportRequestsPage from './pages/TransportRequestsPage';
import LoginPage from './pages/LoginPage';

export default function App() {
    return (
        <Routes>
            {/* Public (публични) */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected (защитени) – по-късно ще сложим Auth guard (защита по вход) */}
            <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/transport" element={<TransportRequestsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}
