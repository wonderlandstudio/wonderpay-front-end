import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CapitalApplication } from "@/types/capital";
import { Loader2 } from "lucide-react";

interface ApplicationsListProps {
  applications?: CapitalApplication[];
  isLoading: boolean;
}

export const ApplicationsList = ({ applications, isLoading }: ApplicationsListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!applications?.length) {
    return <p className="text-center text-gray-500">No applications yet</p>;
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <Card key={app.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">
                  {app.product === 'wonderflex' ? 'WonderFlex' : 'WonderAdvance'}
                </h3>
                <p className="text-sm text-gray-500">
                  Requested: ${app.requested_amount?.toLocaleString()}
                </p>
                {app.approved_amount && (
                  <p className="text-sm text-green-600">
                    Approved: ${app.approved_amount.toLocaleString()}
                  </p>
                )}
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  app.status === 'approved' ? 'bg-green-100 text-green-800' :
                  app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(app.created_at!).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};