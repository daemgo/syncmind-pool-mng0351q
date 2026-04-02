import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Phone, Building2, Calendar, Clock, User, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getDictLabel, getDictColor } from "@/lib/dict";
import { cn } from "@/lib/utils";
import type { Visitor } from "@/types/visitor";
import { employeeMock } from "@/mock/employee";

const colorMap: Record<string, string> = {
  green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  gray: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
  emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
};

interface VisitorDetailProps {
  visitor: Visitor;
}

export function VisitorDetail({ visitor }: VisitorDetailProps) {
  const employee = employeeMock.find((e) => e.id === visitor.employeeId);

  const infoRow = (icon: React.ReactNode, label: string, value: string) => (
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
          <Link to="/visitor">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-foreground">{visitor.name}</h1>
          <p className="text-sm text-muted-foreground">
            访客编号：{visitor.id}
          </p>
        </div>
        <Badge
          className={cn(
            "rounded-full text-sm px-4 py-1",
            colorMap[getDictColor("dict-visitor-status", visitor.status) ?? "gray"]
          )}
        >
          {getDictLabel("dict-visitor-status", visitor.status)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Basic Info */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 px-5">
            {infoRow(<Phone className="h-4 w-4" />, "联系电话", visitor.phone)}
            <Separator className="my-1" />
            {infoRow(
              <Building2 className="h-4 w-4" />,
              "公司名称",
              visitor.company
            )}
            <Separator className="my-1" />
            {infoRow(
              <MapPin className="h-4 w-4" />,
              "访问类型",
              getDictLabel("dict-visit-type", visitor.visitType)
            )}
          </CardContent>
        </Card>

        {/* Visit Info */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">访问信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 px-5">
            {infoRow(<Calendar className="h-4 w-4" />, "访问日期", visitor.visitDate)}
            <Separator className="my-1" />
            {infoRow(<Clock className="h-4 w-4" />, "预约时间", visitor.visitTime)}
            <Separator className="my-1" />
            {infoRow(<User className="h-4 w-4" />, "被访人", employee?.name ?? visitor.employeeId)}
            <Separator className="my-1" />
            {infoRow(
              <Building2 className="h-4 w-4" />,
              "被访人部门",
              employee?.department ?? "—"
            )}
          </CardContent>
        </Card>
      </div>

      {/* Reason */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">访问事由</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground leading-relaxed">{visitor.reason}</p>
        </CardContent>
      </Card>

      {/* Check-in/out */}
      {(visitor.checkInTime || visitor.checkOutTime) && (
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">签到/签退记录</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {visitor.checkInTime && (
              <div className="flex items-center gap-3">
                <Badge className="rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  已签到
                </Badge>
                <span className="text-sm text-muted-foreground">{visitor.checkInTime}</span>
              </div>
            )}
            {visitor.checkOutTime && (
              <div className="flex items-center gap-3">
                <Badge className="rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  已签退
                </Badge>
                <span className="text-sm text-muted-foreground">{visitor.checkOutTime}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
