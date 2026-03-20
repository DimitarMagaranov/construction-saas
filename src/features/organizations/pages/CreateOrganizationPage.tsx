import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../core/auth/AuthProvider';
import { createOrganization } from '../../../core/organizations/createOrganization';
import { createOrganizationMember } from '../../../core/organizations/createOrganizationMember';

export default function CreateOrganizationPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [organizationName, setOrganizationName] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onCreateOrganization() {
        if (!user?.uid) {
            setError('Missing authenticated user.');
            return;
        }

        const trimmedName = organizationName.trim();

        if (!trimmedName) {
            setError('Organization name is required.');
            return;
        }

        setBusy(true);
        setError(null);

        try {
            const organization = await createOrganization({
                name: trimmedName,
                createdBy: user.uid,
            });

            await createOrganizationMember({
                organizationId: organization.id,
                uid: user.uid,
                roles: ['OrganizationOwner'],
            });

            navigate('/dashboard', { replace: true });
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setBusy(false);
        }
    }

    return (
        <Box>
            <Stack spacing={2}>
                <Typography variant="h4">Create organization</Typography>

                <Typography variant="body1">You do not belong to any organizations yet.</Typography>

                <TextField
                    label="Organization name"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    disabled={busy}
                    fullWidth
                />

                <Button variant="contained" onClick={onCreateOrganization} disabled={busy}>
                    {busy ? 'Creating organization...' : 'Create organization'}
                </Button>

                {error && <Alert severity="error">{error}</Alert>}
            </Stack>
        </Box>
    );
}
