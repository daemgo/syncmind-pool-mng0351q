import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EmployeeFilterBar } from "@/components/employee/employee-filter-bar";
import { EmployeeTable } from "@/components/employee/employee-table";
import { EmployeeFormDialog } from "@/components/employee/employee-form-dialog";
import { employeeMock } from "@/mock/employee";
import type { Employee } from "@/types/employee";

export const Route = createFileRoute("/employee/")({
  component: EmployeeIndexPage,
});

function EmployeeIndexPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(employeeMock);

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchSearch =
        !search ||
        e.name.includes(search) ||
        e.id.includes(search);
      const matchDept = department === "all" || e.department === department;
      const matchStatus = status === "all" || e.status === status;
      return matchSearch && matchDept && matchStatus;
    });
  }, [employees, search, department, status]);

  const handleCreate = (data: Omit<Employee, "id" | "createdAt">) => {
    const newId = String(Math.max(...employees.map((e) => Number(e.id))) + 1);
    setEmployees([
      ...employees,
      { ...data, id: newId, createdAt: new Date().toISOString().split("T")[0] },
    ]);
  };

  const handleEdit = (data: Omit<Employee, "id" | "createdAt">) => {
    if (!editingEmployee) return;
    setEmployees(
      employees.map((e) =>
        e.id === editingEmployee.id ? { ...e, ...data } : e
      )
    );
    setEditingEmployee(undefined);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setEmployees(employees.filter((e) => e.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="pl-9 sm:pl-0">
          <h1 className="text-xl md:text-2xl font-semibold text-foreground">员工管理</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            共 {employees.length} 条记录
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingEmployee(undefined);
            setFormOpen(true);
          }}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          新建员工
        </Button>
      </div>

      {/* Filter */}
      <EmployeeFilterBar
        search={search}
        onSearchChange={setSearch}
        department={department}
        onDepartmentChange={setDepartment}
        status={status}
        onStatusChange={setStatus}
      />

      {/* Table */}
      <EmployeeTable
        data={filtered}
        onEdit={(e) => {
          setEditingEmployee(e);
          setFormOpen(true);
        }}
        onDelete={(id) => setDeleteId(id)}
      />

      {/* Form Dialog */}
      <EmployeeFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingEmployee(undefined);
        }}
        data={editingEmployee}
        onSubmit={editingEmployee ? handleEdit : handleCreate}
      />

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              删除后数据无法恢复，是否确定删除该员工记录？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
