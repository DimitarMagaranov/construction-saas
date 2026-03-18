# Data Model (MVP Skeleton)

## Multi-tenant rule
Every document that belongs to an organization MUST contain `organizationId`.

## Collections (planned)
- `organizations/{orgId}`
  - name, createdAt, createdBy
- `projects/{projectId}`
  - organizationId, name, location?, createdAt, createdBy
- `users/{uid}`
  - organizationId, email, displayName?
  - roles: Role[]
  - projectRoles: { [projectId]: Role[] }

## Notes
- Project-scoped roles are stored in `users/{uid}.projectRoles[projectId]`.
- One project can have multiple Technical Managers (supported by projectRoles mapping).