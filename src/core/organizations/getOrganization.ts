import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import type { Organization } from '../models/types';

export async function getOrganization(organizationId: string) {
    const snapshot = await getDoc(doc(db, 'organizations', organizationId));

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.data() as Organization;
}