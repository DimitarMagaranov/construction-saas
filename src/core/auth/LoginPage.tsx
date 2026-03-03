import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../../app/i18n/i18n'; // <-- провери пътя при теб

export default function LoginPage() {
    const { lang, setLang, t } = useI18n(); // <-- ако hook-а ти е различен, кажи ми
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const location = useLocation() as any;
    const from = location.state?.from?.pathname ?? '/';

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err?.message ?? 'Login failed');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Container maxWidth="sm">
            {/* Language toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button size="small" onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')}>
                    {lang === 'bg' ? 'EN' : 'BG'}
                </Button>
            </Box>

            <Box component="form" onSubmit={onSubmit} sx={{ mt: 4, display: 'grid', gap: 2 }}>
                <Typography variant="h4">{t.pages?.login?.title ?? 'Login'}</Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                    label={t.pages?.login?.email ?? 'Email'}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                />

                <TextField
                    label={t.pages?.login?.password ?? 'Password'}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                />

                <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? t.pages?.login?.signingIn ?? 'Signing in...' : t.pages?.login?.signIn ?? 'Sign in'}
                </Button>
            </Box>
        </Container>
    );
}
