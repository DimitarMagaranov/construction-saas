import { Alert, Box, Button, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../core/auth/AuthProvider';
import { getOrganization } from '../../../core/organizations/getOrganization';
import { useSelectedOrganization } from '../../../core/organizations/SelectedOrganizationProvider';
import { useUserOrganizationMembers } from '../../../core/organizations/useUserOrganizationMembers';
import type { Organization } from '../../../core/models/types';

export default function OrganizationsPage() {
    const { user } = useAuth();
    const { members, loading, error } = useUserOrganizationMembers(user?.uid);
    const { selectedOrganizationId, setSelectedOrganizationId } = useSelectedOrganization();

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

    if (loading) {
        return (
            <Box>
                <Stack spacing={2}>
                    <Typography variant="h4">Organizations</Typography>
                    <Typography>Loading organizations...</Typography>
                </Stack>
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <Stack spacing={2}>
                    <Typography variant="h4">Organizations</Typography>
                    <Alert severity="error">{error}</Alert>
                </Stack>
            </Box>
        );
    }

    if (members.length === 0) {
        return (
            <Box>
                <Stack spacing={2}>
                    <Typography variant="h4">Organizations</Typography>
                    <Typography>You do not belong to any organizations yet.</Typography>
                </Stack>
            </Box>
        );
    }

    if (organizationsLoading) {
        return (
            <Box>
                <Stack spacing={2}>
                    <Typography variant="h4">Organizations</Typography>
                    <Typography>Loading organization details...</Typography>
                </Stack>
            </Box>
        );
    }

    return (
        <Box>
            <Stack spacing={2}>
                <Typography variant="h4">Organizations</Typography>

                <List>
                    {members.map((member) => {
                        const organization = organizationsById[member.organizationId];

                        if (!organization) return null;

                        const isSelected = selectedOrganizationId === member.organizationId;

                        return (
                            <ListItem key={`${member.organizationId}-${member.uid}`} disablePadding>
                                <ListItemText primary={organization.name} secondary={member.roles.join(', ')} />

                                <Button
                                    variant={isSelected ? 'contained' : 'outlined'}
                                    size="small"
                                    onClick={() => setSelectedOrganizationId(member.organizationId)}
                                >
                                    {isSelected ? 'Selected' : 'Select'}
                                </Button>
                            </ListItem>
                        );
                    })}
                </List>
            </Stack>
        </Box>
    );
}
