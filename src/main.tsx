import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './app/theme';
import App from './App';
import { I18nProvider } from './app/i18n/i18n';
import { AuthProvider } from './core/auth/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    '#__firebase_auth_emulator_warning__': {
                        display: 'none !important',
                        pointerEvents: 'none !important',
                    },
                    '#__firebase_auth_emulator_warning__ *': {
                        pointerEvents: 'none !important',
                    },
                }}
            />
            <BrowserRouter>
                <I18nProvider>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </I18nProvider>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);
