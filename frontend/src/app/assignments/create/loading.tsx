import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Loading component for create assignment page
 * Rendered on the server during SSR
 */
export default function CreateAssignmentLoading() {
  return (
    <div className="container mx-auto max-w-2xl p-6">
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
      <Card>
        <CardHeader>
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

