import { Link } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { getDictLabel, getDictColor } from "@/lib/dict";
import type { Visitor } from "@/types/visitor";
import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  gray: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
  emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
};

interface VisitorTableProps {
  data: Visitor[];
  onEdit: (v: Visitor) => void;
  onDelete: (id: string) => void;
}

export function VisitorTable({ data, onEdit, onDelete }: VisitorTableProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="text-sm">暂无访客记录</p>
      </div>
    );
  }

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden shadow-sm">
      {/* Desktop table - horizontal scroll on mobile */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-10 font-medium">#</TableHead>
              <TableHead className="font-medium">访客姓名</TableHead>
              <TableHead className="font-medium">公司</TableHead>
              <TableHead className="font-medium">访问类型</TableHead>
              <TableHead className="font-medium">被访人</TableHead>
              <TableHead className="font-medium">访问时间</TableHead>
              <TableHead className="font-medium">状态</TableHead>
              <TableHead className="w-12 text-right font-medium">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((v) => (
              <TableRow key={v.id} className="hover:bg-muted/20 transition-colors">
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {v.id}
                </TableCell>
                <TableCell>
                  <div className="font-medium text-foreground">{v.name}</div>
                  <div className="text-xs text-muted-foreground">{v.phone}</div>
                </TableCell>
                <TableCell className="text-sm">{v.company}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "rounded-full text-xs",
                      colorMap[getDictColor("dict-visit-type", v.visitType) ?? "gray"]
                    )}
                  >
                    {getDictLabel("dict-visit-type", v.visitType)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{v.employeeId}</TableCell>
                <TableCell className="text-sm">
                  <div>{v.visitDate}</div>
                  <div className="text-xs text-muted-foreground">{v.visitTime}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "rounded-full text-xs",
                      colorMap[getDictColor("dict-visitor-status", v.status) ?? "gray"]
                    )}
                  >
                    {getDictLabel("dict-visitor-status", v.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          to="/visitor/$id"
                          params={{ id: v.id }}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          查看详情
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(v)} className="flex items-center gap-2">
                        <Pencil className="h-4 w-4" />
                        编辑
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(v.id)}
                        className="text-destructive flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        删除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-border/50">
        {data.map((v) => (
          <div key={v.id} className="p-4 hover:bg-muted/20">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="font-medium text-foreground">{v.name}</div>
                <div className="text-xs text-muted-foreground">{v.phone}</div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/visitor/$id"
                      params={{ id: v.id }}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      查看详情
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(v)} className="flex items-center gap-2">
                    <Pencil className="h-4 w-4" />
                    编辑
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(v.id)}
                    className="text-destructive flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    删除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">公司：</span>
                <span>{v.company}</span>
              </div>
              <div>
                <span className="text-muted-foreground">被访人：</span>
                <span>{v.employeeId}</span>
              </div>
              <div>
                <span className="text-muted-foreground">访问时间：</span>
                <span>{v.visitDate} {v.visitTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">类型：</span>
                <Badge
                  className={cn(
                    "rounded-full text-xs",
                    colorMap[getDictColor("dict-visit-type", v.visitType) ?? "gray"]
                  )}
                >
                  {getDictLabel("dict-visit-type", v.visitType)}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">状态：</span>
                <Badge
                  className={cn(
                    "rounded-full text-xs",
                    colorMap[getDictColor("dict-visitor-status", v.status) ?? "gray"]
                  )}
                >
                  {getDictLabel("dict-visitor-status", v.status)}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
