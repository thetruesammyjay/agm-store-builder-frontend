import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export function TeamSettings() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" /> Team Members
          </CardTitle>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">Pro Feature</Badge>
        </div>
      </CardHeader>
      <CardContent className="text-center py-12 text-gray-500 bg-gray-50/50">
        <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <h3 className="text-lg font-medium text-gray-900">Manage Your Team</h3>
        <p className="max-w-sm mx-auto mt-2">
          Invite staff members, assign roles, and manage permissions. Coming soon to AGM Pro plans.
        </p>
      </CardContent>
    </Card>
  );
}