import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function VariationManager() {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">Variations</h3>
        <p className="text-sm text-gray-500">Add options like size or color.</p>
      </div>
      
      <div className="rounded-md border border-dashed border-gray-200 p-8 text-center">
        <p className="text-sm text-gray-500 mb-4">No variations added yet.</p>
        <Button variant="outline" className="border-dashed">
          <Plus className="mr-2 h-4 w-4" /> Add Variation
        </Button>
      </div>
    </div>
  );
}