import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import type { UserProfile } from '../models/types';

type CreateUserProfileInput = {
    uid: string;
    email: string;
    displayName?: string | null;
};

export async function createUserProfile({ uid, email, displayName }: CreateUserProfileInput) {
    const userProfile: UserProfile = {
        uid,
        organizationId: 'demo-org',
        email,
        displayName: displayName ?? email,
        roles: ['OrganizationOwner'],
        projectRoles: {},
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', uid), userProfile);
}
