export type Id = string;

// Tenancy
export type Organization = {
    id: Id;
    name: string;
    createdAt: unknown; // serverTimestamp()
    createdBy: Id; // uid
};

export type Project = {
    id: Id;
    organizationId: Id;
    name: string;
    location?: string;
    createdAt: unknown;
    createdBy: Id; // uid
};

// Auth profile stored in Firestore (not Firebase Auth)
export type UserProfile = {
    uid: Id; // same as Firebase Auth uid
    email: string;
    displayName?: string;
    createdAt: unknown;
    updatedAt: unknown;
};

export type OrganizationMember = {
    organizationId: Id;
    uid: Id;
    roles: Role[];
    createdAt: unknown;
    updatedAt: unknown;
};

// RBAC
export type Role =
    | 'SuperAdmin'
    | 'OrganizationOwner'
    | 'OfficeAdmin'
    | 'TechnicalManager'
    | 'SubcontractorAdmin'
    | 'SubcontractorWorker'
    | 'Investor'
    | 'TransportManager'
    | 'Driver';

export type Permission = string;
