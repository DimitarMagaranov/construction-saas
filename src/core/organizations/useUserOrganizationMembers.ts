import { useEffect, useState } from 'react';
import { listUserOrganizationMembers } from './listUserOrganizationMembers';
import type { OrganizationMember } from '../models/types';

type State = {
    members: OrganizationMember[];
    loading: boolean;
    error: string | null;
};

export function useUserOrganizationMembers(uid: string | null | undefined): State {
    const [state, setState] = useState<State>({
        members: [],
        loading: !!uid,
        error: null,
    });

    useEffect(() => {
        if (!uid) {
            setState({
                members: [],
                loading: false,
                error: null,
            });
            return;
        }

        let cancelled = false;
        const currentUid = uid;

        async function load() {
            setState((s) => ({
                ...s,
                loading: true,
                error: null,
            }));

            try {
                const members = await listUserOrganizationMembers(currentUid);

                if (cancelled) return;

                setState({
                    members,
                    loading: false,
                    error: null,
                });
            } catch (e: unknown) {
                if (cancelled) return;

                setState({
                    members: [],
                    loading: false,
                    error: e instanceof Error ? e.message : String(e),
                });
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, [uid]);

    return state;
}
