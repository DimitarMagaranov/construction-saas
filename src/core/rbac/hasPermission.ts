import type { OrganizationMember, Permission, Role } from "../models/types";
import { ROLE_PERMISSIONS } from "./permissions";

function permsForRoles(roles: Role[]): Set<Permission> {
  const set = new Set<Permission>();
  for (const role of roles) {
    for (const p of ROLE_PERMISSIONS[role] ?? []) set.add(p);
  }
  return set;
}

/**
 * Check permission from organization-scoped roles.
 */
export function hasPermission(
  member: OrganizationMember | null | undefined,
  permission: Permission
): boolean {
  if (!member) return false;

  const orgPerms = permsForRoles(member.roles ?? []);
  return orgPerms.has(permission);
}