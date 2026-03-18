import type { UserProfile } from "../models/types";

export const MOCK_PROFILE: UserProfile = {
  uid: "mock-uid",
  organizationId: "mock-org",
  email: "mock@local.dev",
  roles: ["OrganizationOwner"],
  projectRoles: {
    "project-1": ["TechnicalManager"],
  },
  createdAt: null,
  updatedAt: null,
};