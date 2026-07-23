import { useState } from 'react';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { useI18n } from '../../../app/i18n/i18n';
import { useAuth } from '../../../core/auth/AuthProvider';
import { readSmokeDoc, writeSmokeDoc } from '../../../core/firestore/smokeTest';
import type { OrganizationMember } from '../../../core/models/types';
import { PERMISSIONS } from '../../../core/rbac/permissions';
import RequirePermission from '../../../core/rbac/RequirePermission';

type SmokeTestResult = {
    ok: boolean;
    action: 'read' | 'write';
    [key: string]: unknown;
};

export default function TransportRequestsPage() {
    const { user } = useAuth();
    const { t } = useI18n();

    const [result, setResult] = useState<SmokeTestResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    // Temporary bridge until we introduce real selected/current organization member context.
    const mockMember: OrganizationMember = {
        organizationId: 'demo-org',
        uid: user?.uid ?? 'demo-user',
        roles: ['OrganizationOwner'],
        createdAt: null,
        updatedAt: null,
    };

    function startAction() {
        setBusy(true);
        setError(null);
        setResult(null);
    }

    function finishAction() {
        setBusy(false);
    }

    function handleError(error: unknown) {
        setError(error instanceof Error ? error.message : String(error));
    }

    async function onWrite() {
        startAction();

        try {
            await writeSmokeDoc(user?.uid ?? null);
            setResult({ ok: true, action: 'write' });
        } catch (error: unknown) {
            handleError(error);
        } finally {
            finishAction();
        }
    }

    async function onRead() {
        startAction();

        try {
            const response = await readSmokeDoc();
            setResult({ ok: true, action: 'read', ...response });
        } catch (error: unknown) {
            handleError(error);
        } finally {
            finishAction();
        }
    }

    return (
        <Box>
            <Box
                sx={{
                    mb: 3,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Firestore Smoke Test
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Button variant="contained" onClick={onWrite} disabled={busy}>
                        Write test doc
                    </Button>

                    <Button variant="outlined" onClick={onRead} disabled={busy}>
                        Read test doc
                    </Button>
                </Stack>

                {error && <Alert severity="error">{error}</Alert>}

                {result && (
                    <Alert severity="success">
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
                    </Alert>
                )}
            </Box>

            <RequirePermission member={mockMember} permission={PERMISSIONS.TRANSPORT_REQUESTS_APPROVE}>
                <Button variant="contained">Approve (visible only with permission)</Button>
            </RequirePermission>

            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {t.pages.transport}
            </Typography>
        </Box>
    );
}
