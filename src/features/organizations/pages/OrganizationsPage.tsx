import { Alert, Box, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../core/auth/AuthProvider';
import { getOrganization } from '../../../core/organizations/getOrganization';
import { useUserOrganizationMembers } from '../../../core/organizations/useUserOrganizationMembers';
import type { Organization } from '../../../core/models/types';

export default function OrganizationsPage() {
    const { user } = useAuth();
    const { members, loading, error } = useUserOrganizationMembers(user?.uid);
    const [organizationsById, setOrganizationsById] = useState<Record<string, Organization | null>>({});
    const [organizationsLoading, setOrganizationsLoading] = useState(false);

    useEffect(() => {
        if (members.length === 0) {
            setOrganizationsById({});
            setOrganizationsLoading(false);
            return;
        }

        let cancelled = false;

        async function loadOrganizations() {
            setOrganizationsLoading(true);

            try {
                const entries = await Promise.all(
                    members.map(async (member) => {
                        const organization = await getOrganization(member.organizationId);
                        return [member.organizationId, organization] as const;
                    })
                );

                if (cancelled) return;

                setOrganizationsById(Object.fromEntries(entries));
            } finally {
                if (!cancelled) {
                    setOrganizationsLoading(false);
                }
            }
        }

        loadOrganizations();

        return () => {
            cancelled = true;
        };
    }, [members]);

    return (
        <Box>
            <Stack spacing={2}>
                <Typography variant="h4">Organizations</Typography>

                {loading && <Typography>Loading organizations...</Typography>}

                {!loading && organizationsLoading && <Typography>Loading organization details...</Typography>}

                {error && <Alert severity="error">{error}</Alert>}

                {!loading && !error && members.length === 0 && <Typography>You do not belong to any organizations yet.</Typography>}

                {!loading && !error && members.length > 0 && (
                    <List>
                        {members.map((member) => (
                            <ListItem key={`${member.organizationId}-${member.uid}`} disablePadding>
                                <ListItemText
                                    primary={organizationsById[member.organizationId]?.name ?? member.organizationId}
                                    secondary={member.roles.join(', ')}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Stack>
        </Box>
    );
}
