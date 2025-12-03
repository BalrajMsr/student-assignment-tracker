import { Card, CardContent } from "@/components/ui/card";

/**
 * Loading component for dashboard page
 * Rendered on the server during SSR
 */
export default function DashboardLoading() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-9 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

