import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Phone,
  Mail,
  Building2,
  Briefcase,
  Calendar,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { Employee } from "@/types/employee";

interface EmployeeDetailProps {
  employee: Employee;
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

export function EmployeeDetail({ employee }: EmployeeDetailProps) {
  const infoRow = (
    icon: React.ReactNode,
    label: string,
    value: string
  ) => (
    <div className="flex items-start gap-3 py-2.5">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/employee">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-foreground">
            {employee.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            工号：{employee.id}
          </p>
        </div>
        <Badge
          className={cn(
            "rounded-full text-sm px-4 py-1",
            employee.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          )}
        >
          {employee.status === "active" ? "在职" : "离职"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Basic Info */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 px-5">
            {infoRow(
              <Briefcase className="h-4 w-4" />,
              "部门",
              employee.department
            )}
            <Separator className="my-1" />
            {infoRow(
              <Building2 className="h-4 w-4" />,
              "职位",
              employee.position
            )}
            <Separator className="my-1" />
            {infoRow(
              <Calendar className="h-4 w-4" />,
              "入职日期",
              employee.createdAt
            )}
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">联系方式</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 px-5">
            {infoRow(<Phone className="h-4 w-4" />, "联系电话", employee.phone)}
            <Separator className="my-1" />
            {infoRow(<Mail className="h-4 w-4" />, "邮箱", employee.email)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
