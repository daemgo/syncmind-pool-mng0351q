export type VisitorStatus = "pending" | "checked_in" | "checked_out" | "cancelled";
export type VisitType = "business" | "interview" | "delivery" | "meeting";

export interface Visitor {
  id: string;
  name: string;
  phone: string;
  company: string;
  visitType: VisitType;
  employeeId: string;
  visitDate: string;
  visitTime: string;
  reason: string;
  status: VisitorStatus;
  checkInTime?: string;
  checkOutTime?: string;
  createdAt: string;
}
