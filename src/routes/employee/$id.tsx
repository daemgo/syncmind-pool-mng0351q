import { createFileRoute } from "@tanstack/react-router";
import { employeeMock } from "@/mock/employee";
import { EmployeeDetail } from "@/components/employee/employee-detail";

export const Route = createFileRoute("/employee/$id")({
  component: EmployeeDetailPage,
});

function EmployeeDetailPage() {
  const params = Route.useParams();
  const employee = employeeMock.find((e) => e.id === params.id);

  if (!employee) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">员工记录不存在</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <EmployeeDetail employee={employee} />
    </div>
  );
}
