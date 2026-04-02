import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Employee } from "@/types/employee";

interface EmployeeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: Employee;
  onSubmit: (v: Omit<Employee, "id" | "createdAt">) => void;
}

const departments = ["技术部", "产品部", "人力资源部", "行政部", "市场部", "财务部"];

const emptyForm = (): Omit<Employee, "id" | "createdAt"> => ({
  name: "",
  department: departments[0],
  position: "",
  phone: "",
  email: "",
  status: "active",
});

export function EmployeeFormDialog({
  open,
  onOpenChange,
  data,
  onSubmit,
}: EmployeeFormDialogProps) {
  const [form, setForm] = useState<Omit<Employee, "id" | "createdAt">>(emptyForm());

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name,
        department: data.department,
        position: data.position,
        phone: data.phone,
        email: data.email,
        status: data.status,
      });
    } else {
      setForm(emptyForm());
    }
  }, [data, open]);

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.email) return;
    onSubmit(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{data ? "编辑员工" : "新建员工"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="emp-name">
                姓名 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="emp-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="请输入员工姓名"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="emp-phone">
                联系电话 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="emp-phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="188-xxxx-xxxx"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="emp-email">
              邮箱 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="emp-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="name@company.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>部门</Label>
              <Select
                value={form.department}
                onValueChange={(v) => setForm({ ...form, department: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="emp-position">职位</Label>
              <Input
                id="emp-position"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                placeholder="请输入职位"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>员工状态</Label>
            <Select
              value={form.status}
              onValueChange={(v) =>
                setForm({ ...form, status: v as "active" | "inactive" })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">在职</SelectItem>
                <SelectItem value="inactive">离职</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit}>
            {data ? "保存修改" : "确认创建"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
