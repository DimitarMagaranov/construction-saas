import React from "react";
import type { Permission, UserProfile } from "../models/types";
import { hasPermission } from "./hasPermission";

type Props = {
  profile: UserProfile | null | undefined;
  permission: Permission;
  projectId?: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export default function RequirePermission({ profile, permission, projectId, fallback = null, children }: Props) {
  if (!hasPermission(profile, permission, projectId)) return <>{fallback}</>;
  return <>{children}</>;
}