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
- canonical membership records are stored under `organizations/{organizationId}/members/{uid}`
- a user-side membership index may also be stored under `users/{uid}/memberships/{organizationId}`
  for easier reads of "all organizations for current user"

## Multi-tenant rule
Every document that belongs to an organization MUST contain `organizationId`.