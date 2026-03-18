import type { Permission, Role, UserProfile } from "../models/types";
import { ROLE_PERMISSIONS } from "./permissions";

function permsForRoles(roles: Role[]): Set<Permission> {
  const set = new Set<Permission>();
  for (const role of roles) {
    for (const p of ROLE_PERMISSIONS[role] ?? []) set.add(p);
  }
  return set;
}

/**
 * Check permission at org-level or (optionally) project-level.
 * - If projectId is provided, checks projectRoles[projectId] first, then falls back to org roles.
 */
export function hasPermission(
  profile: UserProfile | null | undefined,
  permission: Permission,
  projectId?: string
): boolean {
  if (!profile) return false;

  // project-scoped roles
  if (projectId && profile.projectRoles?.[projectId]?.length) {
    const projectPerms = permsForRoles(profile.projectRoles[projectId]);
    if (projectPerms.has(permission)) return true;
  }

  // org-level roles
  const orgPerms = permsForRoles(profile.roles ?? []);
  return orgPerms.has(permission);
}