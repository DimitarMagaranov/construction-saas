import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useUserOrganizationMembers } from './useUserOrganizationMembers';

type SelectedOrganizationContextValue = {
    selectedOrganizationId: string | null;
    setSelectedOrganizationId: (organizationId: string) => void;
    organizationIds: string[];
    isLoading: boolean;
};

const SelectedOrganizationContext = createContext<SelectedOrganizationContextValue | undefined>(undefined);

type SelectedOrganizationProviderProps = {
    children: ReactNode;
};

function getStorageKey(uid: string) {
    return `selected-organization:${uid}`;
}

export function SelectedOrganizationProvider({ children }: SelectedOrganizationProviderProps) {
    const { user } = useAuth();
    const uid = user?.uid ?? null;
    const { members, loading } = useUserOrganizationMembers(uid);

    const [selectedOrganizationId, setSelectedOrganizationIdState] = useState<string | null>(null);
    const [selectionLoadedForUid, setSelectionLoadedForUid] = useState<string | null>(null);

    const setSelectedOrganizationId = useCallback(
        (organizationId: string) => {
            setSelectedOrganizationIdState(organizationId);

            if (uid) {
                localStorage.setItem(getStorageKey(uid), organizationId);
            }
        },
        [uid]
    );

    useEffect(() => {
        if (!uid) {
            setSelectedOrganizationIdState(null);
            setSelectionLoadedForUid(null);
            return;
        }

        const storedOrganizationId = localStorage.getItem(getStorageKey(uid));
        setSelectedOrganizationIdState(storedOrganizationId);
        setSelectionLoadedForUid(uid);
    }, [uid]);

    useEffect(() => {
        if (!uid || loading || selectionLoadedForUid !== uid) {
            return;
        }

        if (members.length === 0) {
            setSelectedOrganizationIdState(null);
            localStorage.removeItem(getStorageKey(uid));
            return;
        }

        const hasCurrentSelection = members.some((member) => member.organizationId === selectedOrganizationId);

        if (hasCurrentSelection) {
            return;
        }

        const fallbackOrganizationId = members[0].organizationId;
        setSelectedOrganizationIdState(fallbackOrganizationId);
        localStorage.setItem(getStorageKey(uid), fallbackOrganizationId);
    }, [uid, members, loading, selectedOrganizationId, selectionLoadedForUid]);

    const organizationIds = members.map((member) => member.organizationId);

    const value = useMemo<SelectedOrganizationContextValue>(
        () => ({
            selectedOrganizationId,
            setSelectedOrganizationId,
            organizationIds,
            isLoading: loading || (uid !== null && selectionLoadedForUid !== uid),
        }),
        [selectedOrganizationId, setSelectedOrganizationId, organizationIds, loading, uid, selectionLoadedForUid]
    );

    return <SelectedOrganizationContext.Provider value={value}>{children}</SelectedOrganizationContext.Provider>;
}

export function useSelectedOrganization() {
    const context = useContext(SelectedOrganizationContext);

    if (!context) {
        throw new Error('useSelectedOrganization must be used within SelectedOrganizationProvider');
    }

    return context;
}
