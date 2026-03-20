# Data Model (MVP Skeleton)

## Core model

### UserProfile
Global user profile stored in Firestore.

Fields:
- `uid`
- `email`
- `displayName`
- `createdAt`
- `updatedAt`

Notes:
- `UserProfile` does **not** store organization roles
- `UserProfile` does **not** point to a single organization
- one user can belong to multiple organizations

### Organization
Represents a company / firm in the system.

Fields:
- `id`
- `name`
- `createdAt`
- `createdBy`

### OrganizationMember
Represents membership of a user in a specific organization.

Fields:
- `organizationId`
- `uid`
- `roles`
- `createdAt`
- `updatedAt`

Notes:
- roles are organization-scoped
- one user can have memberships in multiple organizations
- permissions should be resolved from organization membership, not from global user profile

## Multi-tenant rule
Every document that belongs to an organization MUST contain `organizationId`.