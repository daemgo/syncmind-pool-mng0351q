import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { visitorMock } from "@/mock/visitor";
import { employeeMock } from "@/mock/employee";
import { getDictLabel } from "@/lib/dict";
import { cn } from "@/lib/utils";
import {
  UserCheck,
  Clock,
  CheckCircle2,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

// Mock trend data
const trendData = [
  { month: "11月", visitors: 42 },
  { month: "12月", visitors: 58 },
  { month: "1月", visitors: 51 },
  { month: "2月", visitors: 67 },
  { month: "3月", visitors: 79 },
  { month: "4月", visitors: 63 },
];

const chartConfig = {
  visitors: {
    label: "访客数",
    color: "var(--color-chart-1)",
  },
} as const;

const colorMap: Record<string, string> = {
  green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  gray: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
  emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
};

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-1.5">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1.5">{description}</p>
            )}
          </div>
          <div className={cn("p-2.5 rounded-xl", iconBg)}>
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardPage() {
  const todayStr = new Date().toISOString().split("T")[0];
  const todayVisitors = visitorMock.filter((v) => v.visitDate === todayStr);
  const pendingVisitors = visitorMock.filter((v) => v.status === "pending");
  const checkedIn = visitorMock.filter((v) => v.status === "checked_in");
  const recentVisitors = [...visitorMock]
    .sort((a, b) => b.visitDate.localeCompare(a.visitDate))
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">数据概览</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          欢迎回来，以下是访客系统实时数据
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="今日访客"
          value={todayVisitors.length}
          description="已预约今日访问的访客数"
          icon={UserCheck}
          iconBg="bg-blue-100 dark:bg-blue-900/30"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="待处理预约"
          value={pendingVisitors.length}
          description="尚未签到的访客预约"
          icon={Clock}
          iconBg="bg-amber-100 dark:bg-amber-900/30"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <StatCard
          title="当前在场"
          value={checkedIn.length}
          description="已签到尚未签退的访客"
          icon={CheckCircle2}
          iconBg="bg-emerald-100 dark:bg-emerald-900/30"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          title="累计记录"
          value={visitorMock.length}
          description={`共 ${employeeMock.length} 名被访员工`}
          icon={Users}
          iconBg="bg-violet-100 dark:bg-violet-900/30"
          iconColor="text-violet-600 dark:text-violet-400"
        />
      </div>

      {/* Chart + Recent Visitors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Trend Chart */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-medium">
                  访问趋势
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  近6个月访客数量统计
                </CardDescription>
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={32}
                />
                <Bar
                  dataKey="visitors"
                  fill="var(--color-chart-1)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Visitors */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">最近访客</CardTitle>
              <Link
                to="/visitor"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                查看全部 <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-transparent">
                  <TableHead className="text-xs font-medium text-muted-foreground py-2">
                    访客
                  </TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground py-2">
                    状态
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentVisitors.map((v) => (
                  <TableRow key={v.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="py-2">
                      <div className="font-medium text-sm text-foreground">
                        {v.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {v.company}
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <Badge
                        className={cn(
                          "rounded-full text-xs",
                          colorMap[getDictLabel("dict-visitor-status", v.status) === "待签到" ? "amber" :
                            getDictLabel("dict-visitor-status", v.status) === "已签到" ? "blue" :
                            getDictLabel("dict-visitor-status", v.status) === "已签退" ? "green" : "gray"] ?? "gray"
                        )}
                      >
                        {getDictLabel("dict-visitor-status", v.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
