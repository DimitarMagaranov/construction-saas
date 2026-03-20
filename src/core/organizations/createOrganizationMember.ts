import { doc, serverTimestamp, setDoc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import type { OrganizationMember, Role } from '../models/types';

type CreateOrganizationMemberInput = {
    organizationId: string;
    uid: string;
    roles: Role[];
};

export async function createOrganizationMember({ organizationId, uid, roles }: CreateOrganizationMemberInput) {
    const member: OrganizationMember = {
        organizationId,
        uid,
        roles,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };

    const batch = writeBatch(db);

    // canonical org membership
    batch.set(doc(db, 'organizations', organizationId, 'members', uid), member);

    // user-side membership index
    batch.set(doc(db, 'users', uid, 'memberships', organizationId), member);

    await batch.commit();
}
