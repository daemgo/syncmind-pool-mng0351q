import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Employee } from "@/types/employee";

interface EmployeeTableProps {
  data: Employee[];
  onEdit: (e: Employee) => void;
  onDelete: (id: string) => void;
}

function getAvatarColor(name: string) {
  const colors = [
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

function getInitials(name: string) {
  return name.slice(0, 2);
}

export function EmployeeTable({ data, onEdit, onDelete }: EmployeeTableProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="text-sm">暂无员工记录</p>
      </div>
    );
  }

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden shadow-sm">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/40 border-b border-border/50">
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 w-10">
                #
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                姓名
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                部门
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                职位
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                联系电话
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                邮箱
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                状态
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3 w-12">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp) => (
              <tr
                key={emp.id}
                className="border-b border-border/30 hover:bg-muted/20 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {emp.id}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar className={cn("h-8 w-8 text-xs font-medium", getAvatarColor(emp.name))}>
                      <AvatarFallback className={cn("text-xs", getAvatarColor(emp.name))}>
                        {getInitials(emp.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm text-foreground">
                      {emp.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {emp.department}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {emp.position}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {emp.phone}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {emp.email}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    className={cn(
                      "rounded-full text-xs",
                      emp.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    )}
                  >
                    {emp.status === "active" ? "在职" : "离职"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          to="/employee/$id"
                          params={{ id: emp.id }}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          查看详情
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onEdit(emp)}
                        className="flex items-center gap-2"
                      >
                        <Pencil className="h-4 w-4" />
                        编辑
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(emp.id)}
                        className="text-destructive flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        删除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-border/50">
        {data.map((emp) => (
          <div key={emp.id} className="p-4 hover:bg-muted/20">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <Avatar className={cn("h-10 w-10 text-sm font-medium", getAvatarColor(emp.name))}>
                  <AvatarFallback className={cn("text-sm", getAvatarColor(emp.name))}>
                    {getInitials(emp.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{emp.name}</div>
                  <div className="text-xs text-muted-foreground">{emp.department} · {emp.position}</div>
                </div>
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
                      to="/employee/$id"
                      params={{ id: emp.id }}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      查看详情
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onEdit(emp)}
                    className="flex items-center gap-2"
                  >
                    <Pencil className="h-4 w-4" />
                    编辑
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(emp.id)}
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
                <span className="text-muted-foreground">电话：</span>
                <span className="text-foreground">{emp.phone}</span>
              </div>
              <div>
                <span className="text-muted-foreground">邮箱：</span>
                <span className="text-foreground truncate">{emp.email}</span>
              </div>
              <div>
                <Badge
                  className={cn(
                    "rounded-full text-xs",
                    emp.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  )}
                >
                  {emp.status === "active" ? "在职" : "离职"}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
