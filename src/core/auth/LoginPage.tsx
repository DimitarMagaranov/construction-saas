import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useI18n } from '../../app/i18n/i18n';

export default function LoginPage() {
    const { t } = useI18n();

    return (
        <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
            <Paper sx={{ p: 3, width: '100%', maxWidth: 420 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    {t.pages.login}
                </Typography>

                <TextField fullWidth label={t.pages.email} type="email" sx={{ mb: 2 }} />
                <TextField fullWidth label={t.pages.password} type="password" sx={{ mb: 2 }} />

                <Button fullWidth variant="contained">
                    {t.pages.signIn}
                </Button>
            </Paper>
        </Box>
    );
}
