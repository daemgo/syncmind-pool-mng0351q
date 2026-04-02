import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { getDictOptions } from "@/lib/dict";
import type { VisitorStatus, VisitType } from "@/types/visitor";
import { useState } from "react";

interface VisitorFilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  status: VisitorStatus | "all";
  onStatusChange: (v: VisitorStatus | "all") => void;
  visitType: VisitType | "all";
  onVisitTypeChange: (v: VisitType | "all") => void;
}

export function VisitorFilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  visitType,
  onVisitTypeChange,
}: VisitorFilterBarProps) {
  const [open, setOpen] = useState(false);
  const statusOptions = getDictOptions("dict-visitor-status");
  const visitTypeOptions = getDictOptions("dict-visit-type");

  const activeFilters = [status !== "all", visitType !== "all"].filter(Boolean).length;

  return (
    <>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 p-4 bg-card rounded-xl border border-border/50 shadow-sm">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索访客..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          筛选
          {activeFilters > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeFilters}
            </span>
          )}
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="rounded-t-xl">
          <SheetHeader>
            <SheetTitle>筛选条件</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">状态</label>
              <Select
                value={status}
                onValueChange={(v) => onStatusChange(v as VisitorStatus | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  {statusOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">访问类型</label>
              <Select
                value={visitType}
                onValueChange={(v) => onVisitTypeChange(v as VisitType | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  {visitTypeOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <SheetFooter>
            <Button
              variant="outline"
              onClick={() => {
                onStatusChange("all");
                onVisitTypeChange("all");
              }}
            >
              重置
            </Button>
            <Button onClick={() => setOpen(false)}>应用</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
