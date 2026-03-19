import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { UserProfile } from '../models/types';
import { useAuth } from '../auth/AuthProvider';
import { useUserProfile } from './useUserProfile';

type UserProfileContextValue = {
    profile: UserProfile | null;
    isLoading: boolean;
    resolved: boolean;
    resolvedUid: string | null;
    error: string | null;
};

const UserProfileContext = createContext<UserProfileContextValue | undefined>(undefined);

type UserProfileProviderProps = {
    children: ReactNode;
};

export function UserProfileProvider({ children }: UserProfileProviderProps) {
    const { user, isLoading: isAuthLoading } = useAuth();
    const { profile, loading: isProfileLoading, resolved, resolvedUid, error } = useUserProfile(user?.uid);

    const value = useMemo<UserProfileContextValue>(
        () => ({
            profile,
            isLoading: isAuthLoading || isProfileLoading,
            resolved,
            resolvedUid,
            error,
        }),
        [profile, isAuthLoading, isProfileLoading, error]
    );

    return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
}

export function useUserProfileContext() {
    const context = useContext(UserProfileContext);

    if (!context) {
        throw new Error('useUserProfileContext must be used within UserProfileProvider');
    }

    return context;
}
