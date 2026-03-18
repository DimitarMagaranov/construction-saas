import type { Role } from "../models/types";

export const ROLES: Record<Role, Role> = {
  SuperAdmin: "SuperAdmin",
  OrganizationOwner: "OrganizationOwner",
  OfficeAdmin: "OfficeAdmin",
  TechnicalManager: "TechnicalManager",
  SubcontractorAdmin: "SubcontractorAdmin",
  SubcontractorWorker: "SubcontractorWorker",
  Investor: "Investor",
  TransportManager: "TransportManager",
  Driver: "Driver",
};