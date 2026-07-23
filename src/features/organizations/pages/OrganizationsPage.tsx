import { Alert, Box, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useAuth } from '../../../core/auth/AuthProvider';
import { useUserOrganizationMembers } from '../../../core/organizations/useUserOrganizationMembers';

export default function OrganizationsPage() {
    const { user } = useAuth();
    const { members, loading, error } = useUserOrganizationMembers(user?.uid);

    return (
        <Box>
            <Stack spacing={2}>
                <Typography variant="h4">Organizations</Typography>

                {loading && <Typography>Loading organizations...</Typography>}

                {error && <Alert severity="error">{error}</Alert>}

                {!loading && !error && members.length === 0 && <Typography>You do not belong to any organizations yet.</Typography>}

                {!loading && !error && members.length > 0 && (
                    <List>
                        {members.map((member) => (
                            <ListItem key={`${member.organizationId}-${member.uid}`} disablePadding>
                                <ListItemText primary={member.organizationId} secondary={member.roles.join(', ')} />
                            </ListItem>
                        ))}
                    </List>
                )}

                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    TODO: resolve and display organization names instead of raw organization IDs.
                </Typography>
            </Stack>
        </Box>
    );
}
