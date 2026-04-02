export interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
  createdAt: string;
}
