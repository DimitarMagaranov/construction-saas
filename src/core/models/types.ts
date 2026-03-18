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
  organizationId: Id;
  email: string;
  displayName?: string;

  roles: Role[]; // org-level roles (e.g. OrganizationOwner, OfficeAdmin, TransportManager)
  projectRoles?: Record<Id, Role[]>; // projectId -> roles (e.g. TechnicalManager on project)
  createdAt: unknown;
  updatedAt: unknown;
};

// RBAC
export type Role =
  | "SuperAdmin"
  | "OrganizationOwner"
  | "OfficeAdmin"
  | "TechnicalManager"
  | "SubcontractorAdmin"
  | "SubcontractorWorker"
  | "Investor"
  | "TransportManager"
  | "Driver";

export type Permission = string;