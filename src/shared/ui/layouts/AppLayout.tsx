import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Box, Button, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useI18n } from '../../../app/i18n/i18n';
import { signOut } from 'firebase/auth';
import { auth } from '../../../core/firebase/firebase';
import { useAuth } from '../../../core/auth/AuthProvider';

const drawerWidth = 260;

export default function AppLayout() {
    const location = useLocation();
    const { lang, setLang, t } = useI18n();
    const { user } = useAuth();

    const navItems = [
        { label: t.nav.dashboard, path: '/dashboard', icon: <DashboardIcon /> },
        { label: t.nav.projects, path: '/projects', icon: <BusinessIcon /> },
        { label: t.nav.transport, path: '/transport', icon: <LocalShippingIcon /> },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {t.appName}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    {user?.email && (
                        <Typography variant="body2" sx={{ mr: 2, opacity: 0.9 }}>
                            {user.email}
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
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
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
