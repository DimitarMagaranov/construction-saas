import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../core/auth/AuthProvider';
import { createUserProfile } from '../../../core/users/createUserProfile';
import { useUserProfileContext } from '../../../core/users/UserProfileProvider';

export default function ProfileSetupPage() {
    const { user } = useAuth();
    const { profile, isLoading } = useUserProfileContext();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onCreateProfile() {
        if (!user?.uid || !user.email) {
            setError('Missing authenticated user data.');
            return;
        }

        setBusy(true);
        setError(null);

        try {
            await createUserProfile({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            });
        } catch (e: any) {
            setError(e?.message ?? String(e));
        } finally {
            setBusy(false);
        }
    }

    if (!isLoading && profile) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <Box>
            <Stack spacing={2}>
                <Typography variant="h4">Complete your account</Typography>

                <Typography variant="body1">Your account is authenticated, but your user profile is missing.</Typography>

                <Button variant="contained" onClick={onCreateProfile} disabled={busy}>
                    {busy ? 'Creating account profile...' : 'Create account profile'}
                </Button>

                {error && <Alert severity="error">{error}</Alert>}
            </Stack>
        </Box>
    );
}
