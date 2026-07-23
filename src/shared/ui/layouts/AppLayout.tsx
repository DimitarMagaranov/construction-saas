import { useEffect, useMemo, useState } from 'react';
import { Navigate, Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Box, Button, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { signOut } from 'firebase/auth';

import { useI18n } from '../../../app/i18n/i18n';
import { useAuth } from '../../../core/auth/AuthProvider';
import { auth } from '../../../core/firebase/firebase';
import { getOrganization } from '../../../core/organizations/getOrganization';
import { useSelectedOrganization } from '../../../core/organizations/SelectedOrganizationProvider';
import type { Organization } from '../../../core/models/types';
import { useUserProfileContext } from '../../../core/users/UserProfileProvider';

const drawerWidth = 260;

export default function AppLayout() {
    const location = useLocation();
    const { lang, setLang, t } = useI18n();
    const { user } = useAuth();
    const { profile, isLoading, resolved, resolvedUid, error } = useUserProfileContext();
    const { selectedOrganizationId, isLoading: selectedOrganizationStateLoading } = useSelectedOrganization();

    const [organizationsById, setOrganizationsById] = useState<Record<string, Organization | null>>({});
    const [loadingOrganizationId, setLoadingOrganizationId] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedOrganizationId) {
            setLoadingOrganizationId(null);
            return;
        }

        const currentOrganizationId = selectedOrganizationId;
        const cachedOrganization = organizationsById[currentOrganizationId];

        if (cachedOrganization) {
            setLoadingOrganizationId(null);
            return;
        }

        let cancelled = false;
        setLoadingOrganizationId(currentOrganizationId);

        async function loadOrganization() {
            try {
                const organization = await getOrganization(currentOrganizationId);

                if (cancelled) return;

                setOrganizationsById((prev) => ({
                    ...prev,
                    [currentOrganizationId]: organization,
                }));
            } finally {
                if (!cancelled) {
                    setLoadingOrganizationId((prev) => (prev === currentOrganizationId ? null : prev));
                }
            }
        }

        loadOrganization();

        return () => {
            cancelled = true;
        };
    }, [selectedOrganizationId, organizationsById]);

    const currentOrganization = useMemo(
        () => (selectedOrganizationId ? organizationsById[selectedOrganizationId] ?? null : null),
        [selectedOrganizationId, organizationsById]
    );

    const shouldShowOrganizationName =
        Boolean(selectedOrganizationId) &&
        !selectedOrganizationStateLoading &&
        loadingOrganizationId !== selectedOrganizationId &&
        Boolean(currentOrganization);

    const navItems = [
        { label: t.nav.dashboard, path: '/dashboard', icon: <DashboardIcon /> },
        { label: t.nav.projects, path: '/projects', icon: <BusinessIcon /> },
        { label: t.nav.transport, path: '/transport', icon: <LocalShippingIcon /> },
        { label: 'Organizations', path: '/organizations', icon: <BusinessIcon /> },
        { label: t.nav.createOrganization, path: '/organizations/create', icon: <BusinessIcon /> },
    ];

    if (!isLoading && user && resolved && resolvedUid === user.uid && !profile && location.pathname !== '/profile-setup') {
        return <Navigate to="/profile-setup" replace />;
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {t.appName}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    {shouldShowOrganizationName && (
                        <Typography variant="body2" sx={{ mr: 2, opacity: 0.9 }}>
                            Org: {currentOrganization?.name}
                        </Typography>
                    )}

                    {user?.email && (
                        <Typography variant="body2" sx={{ mr: 2, opacity: 0.9 }}>
                            {user.email}
                        </Typography>
                    )}

                    {isLoading && (
                        <Typography variant="body2" sx={{ mr: 2, opacity: 0.8 }}>
                            Profile: loading...
                        </Typography>
                    )}

                    {error && (
                        <Typography variant="body2" sx={{ mr: 2, color: 'error.main' }}>
                            Profile error
                        </Typography>
                    )}

                    {!isLoading && user && !profile && (
                        <Typography variant="body2" sx={{ mr: 2, color: 'warning.main' }}>
                            Profile missing
                        </Typography>
                    )}

                    <Button color="inherit" onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')} sx={{ minWidth: 56 }}>
                        {lang === 'bg' ? 'EN' : 'BG'}
                    </Button>

                    <Button color="inherit" onClick={() => signOut(auth)} sx={{ minWidth: 80 }}>
                        {t.common.logout}
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {navItems.map((item) => {
                            const selected = location.pathname === item.path;

                            return (
                                <ListItemButton key={item.path} component={RouterLink} to={item.path} selected={selected}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            );
                        })}
                    </List>
                    <Divider />
                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}
