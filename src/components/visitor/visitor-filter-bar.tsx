import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDictOptions } from "@/lib/dict";
import type { VisitorStatus, VisitType } from "@/types/visitor";

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
  const statusOptions = getDictOptions("dict-visitor-status");
  const visitTypeOptions = getDictOptions("dict-visit-type");

  return (
    <div className="flex flex-wrap gap-3 p-4 bg-card rounded-xl border border-border/50 shadow-sm">
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索访客姓名、公司..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select
        value={status}
        onValueChange={(v) => onStatusChange(v as VisitorStatus | "all")}
      >
        <SelectTrigger className="w-36">
          <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
          <SelectValue placeholder="访客状态" />
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
      <Select
        value={visitType}
        onValueChange={(v) => onVisitTypeChange(v as VisitType | "all")}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="访问类型" />
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
  );
}
