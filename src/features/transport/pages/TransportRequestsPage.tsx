import { Typography } from '@mui/material';
import { useI18n } from '../../../app/i18n/i18n';

export default function TransportRequestsPage() {
    const { t } = useI18n();
    return <Typography variant="h4">{t.pages.transport}</Typography>;
}
