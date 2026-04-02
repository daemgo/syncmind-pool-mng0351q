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
import { Textarea } from "@/components/ui/textarea";
import { getDictOptions } from "@/lib/dict";
import { employeeMock } from "@/mock/employee";
import type { Visitor, VisitorStatus, VisitType } from "@/types/visitor";

interface VisitorFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: Visitor;
  onSubmit: (v: Omit<Visitor, "id" | "createdAt">) => void;
}

const emptyForm = (): Omit<Visitor, "id" | "createdAt"> => ({
  name: "",
  phone: "",
  company: "",
  visitType: "business",
  employeeId: "",
  visitDate: new Date().toISOString().split("T")[0],
  visitTime: "10:00",
  reason: "",
  status: "pending",
});

export function VisitorFormDialog({
  open,
  onOpenChange,
  data,
  onSubmit,
}: VisitorFormDialogProps) {
  const [form, setForm] = useState<Omit<Visitor, "id" | "createdAt">>(emptyForm());

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name,
        phone: data.phone,
        company: data.company,
        visitType: data.visitType,
        employeeId: data.employeeId,
        visitDate: data.visitDate,
        visitTime: data.visitTime,
        reason: data.reason,
        status: data.status,
      });
    } else {
      setForm(emptyForm());
    }
  }, [data, open]);

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.company || !form.employeeId) return;
    onSubmit(form);
    onOpenChange(false);
  };

  const statusOptions = getDictOptions("dict-visitor-status");
  const visitTypeOptions = getDictOptions("dict-visit-type");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{data ? "编辑访客" : "新建访客"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">
                访客姓名 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="请输入访客姓名"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">
                联系电话 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="138-xxxx-xxxx"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="company">
              公司名称 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="请输入公司名称"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>访问类型</Label>
              <Select
                value={form.visitType}
                onValueChange={(v) =>
                  setForm({ ...form, visitType: v as VisitType })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {visitTypeOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>被访人</Label>
              <Select
                value={form.employeeId}
                onValueChange={(v) => setForm({ ...form, employeeId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择被访人" />
                </SelectTrigger>
                <SelectContent>
                  {employeeMock.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.name}（{e.department}）
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="visitDate">访问日期</Label>
              <Input
                id="visitDate"
                type="date"
                value={form.visitDate}
                onChange={(e) =>
                  setForm({ ...form, visitDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="visitTime">预约时间</Label>
              <Input
                id="visitTime"
                type="time"
                value={form.visitTime}
                onChange={(e) =>
                  setForm({ ...form, visitTime: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="reason">访问事由</Label>
            <Textarea
              id="reason"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              placeholder="请简要描述访问目的"
              rows={3}
            />
          </div>

          <div className="space-y-1.5">
            <Label>访客状态</Label>
            <Select
              value={form.status}
              onValueChange={(v) =>
                setForm({ ...form, status: v as VisitorStatus })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
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
