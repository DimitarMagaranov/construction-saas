import React, { useState } from 'react';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { readSmokeDoc, writeSmokeDoc } from '../../../core/firestore/smokeTest';
import { useAuth } from '../../../core/auth/AuthProvider';
import { useI18n } from '../../../app/i18n/i18n';
import RequirePermission from '../../../core/rbac/RequirePermission';
import { PERMISSIONS } from '../../../core/rbac/permissions';
import { MOCK_PROFILE } from '../../../core/rbac/mockProfile';

export default function TransportRequestsPage() {
    const { user } = useAuth();
    const { t } = useI18n();

    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    async function onWrite() {
        setBusy(true);
        setError(null);
        setResult(null);
        try {
            await writeSmokeDoc(user?.uid ?? null);
            setResult({ ok: true, action: 'write' });
        } catch (e: any) {
            setError(e?.message ?? String(e));
        } finally {
            setBusy(false);
        }
    }

    async function onRead() {
        setBusy(true);
        setError(null);
        setResult(null);
        try {
            const res = await readSmokeDoc();
            setResult({ ok: true, action: 'read', ...res });
        } catch (e: any) {
            setError(e?.message ?? String(e));
        } finally {
            setBusy(false);
        }
    }

    return (
        <Box>
            <Box sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
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

            <RequirePermission profile={MOCK_PROFILE} permission={PERMISSIONS.TRANSPORT_REQUESTS_APPROVE}>
                <Button variant="contained">Approve (visible only with permission)</Button>
            </RequirePermission>

            {/* TODO: тук може да върне стария placeholder/таблица за Transport requests */}
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {t.pages.transport}
            </Typography>
        </Box>
    );
}
