import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { VisitorFilterBar } from "@/components/visitor/visitor-filter-bar";
import { VisitorTable } from "@/components/visitor/visitor-table";
import { VisitorFormDialog } from "@/components/visitor/visitor-form-dialog";
import { visitorMock } from "@/mock/visitor";
import type { Visitor, VisitorStatus, VisitType } from "@/types/visitor";

export const Route = createFileRoute("/visitor/")({
  component: VisitorIndexPage,
});

function VisitorIndexPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<VisitorStatus | "all">("all");
  const [visitType, setVisitType] = useState<VisitType | "all">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingVisitor, setEditingVisitor] = useState<Visitor | undefined>();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [visitors, setVisitors] = useState<Visitor[]>(visitorMock);

  const filtered = useMemo(() => {
    return visitors.filter((v) => {
      const matchSearch =
        !search ||
        v.name.includes(search) ||
        v.company.includes(search);
      const matchStatus = status === "all" || v.status === status;
      const matchType = visitType === "all" || v.visitType === visitType;
      return matchSearch && matchStatus && matchType;
    });
  }, [visitors, search, status, visitType]);

  const handleCreate = (data: Omit<Visitor, "id" | "createdAt">) => {
    const newId = String(Math.max(...visitors.map((v) => Number(v.id))) + 1);
    setVisitors([
      ...visitors,
      { ...data, id: newId, createdAt: new Date().toISOString() },
    ]);
  };

  const handleEdit = (data: Omit<Visitor, "id" | "createdAt">) => {
    if (!editingVisitor) return;
    setVisitors(
      visitors.map((v) =>
        v.id === editingVisitor.id
          ? { ...v, ...data }
          : v
      )
    );
    setEditingVisitor(undefined);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setVisitors(visitors.filter((v) => v.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="pl-9 sm:pl-0">
          <h1 className="text-xl md:text-2xl font-semibold text-foreground">访客管理</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            共 {visitors.length} 条记录
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingVisitor(undefined);
            setFormOpen(true);
          }}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          新建访客
        </Button>
      </div>

      {/* Filter */}
      <VisitorFilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        visitType={visitType}
        onVisitTypeChange={setVisitType}
      />

      {/* Table */}
      <VisitorTable
        data={filtered}
        onEdit={(v) => {
          setEditingVisitor(v);
          setFormOpen(true);
        }}
        onDelete={(id) => setDeleteId(id)}
      />

      {/* Form Dialog */}
      <VisitorFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingVisitor(undefined);
        }}
        data={editingVisitor}
        onSubmit={editingVisitor ? handleEdit : handleCreate}
      />

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              删除后数据无法恢复，是否确定删除该访客记录？
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
