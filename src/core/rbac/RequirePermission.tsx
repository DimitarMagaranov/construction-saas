import React from 'react';
import type { Permission, UserProfile } from '../models/types';
import { hasPermission } from './hasPermission';
import { useUserProfileContext } from '../users/UserProfileProvider';

type Props = {
    profile?: UserProfile | null;
    permission: Permission;
    projectId?: string;
    fallback?: React.ReactNode;
    children: React.ReactNode;
};

export default function RequirePermission({ profile, permission, projectId, fallback = null, children }: Props) {
    const { profile: contextProfile } = useUserProfileContext();
    const resolvedProfile = profile ?? contextProfile;

    if (!hasPermission(resolvedProfile, permission, projectId)) return <>{fallback}</>;
    return <>{children}</>;
}
