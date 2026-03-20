import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import type { Organization } from '../models/types';

type CreateOrganizationInput = {
    name: string;
    createdBy: string;
};

export async function createOrganization({ name, createdBy }: CreateOrganizationInput) {
    const organizationRef = doc(collection(db, 'organizations'));

    const organization: Organization = {
        id: organizationRef.id,
        name,
        createdAt: serverTimestamp(),
        createdBy,
    };

    await setDoc(organizationRef, organization);

    return organization;
}
