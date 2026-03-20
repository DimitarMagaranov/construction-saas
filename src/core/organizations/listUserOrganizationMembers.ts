import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import type { OrganizationMember } from '../models/types';

export async function listUserOrganizationMembers(uid: string) {
    const snapshot = await getDocs(collection(db, 'users', uid, 'memberships'));

    return snapshot.docs.map((doc) => doc.data() as OrganizationMember);
}
