import { createFileRoute } from "@tanstack/react-router";
import { visitorMock } from "@/mock/visitor";
import { VisitorDetail } from "@/components/visitor/visitor-detail";

export const Route = createFileRoute("/visitor/$id")({
  component: VisitorDetailPage,
});

function VisitorDetailPage() {
  const params = Route.useParams();
  const visitor = visitorMock.find((v) => v.id === params.id);

  if (!visitor) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">访客记录不存在</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <VisitorDetail visitor={visitor} />
    </div>
  );
}
