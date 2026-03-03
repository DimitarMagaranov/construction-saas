import { Typography } from '@mui/material';
import { useI18n } from '../i18n/i18n';

export default function DashboardPage() {
    const { t } = useI18n();
    return <Typography variant="h4">{t.pages.dashboard}</Typography>;
}
