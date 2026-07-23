import type { ReactNode } from 'react';
import type { OrganizationMember, Permission } from '../models/types';
import { hasPermission } from './hasPermission';

type Props = {
    member?: OrganizationMember | null;
    permission: Permission;
    fallback?: ReactNode;
    children: ReactNode;
};

export default function RequirePermission({ member, permission, fallback = null, children }: Props) {
    const allowed = hasPermission(member, permission);

    if (!allowed) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
