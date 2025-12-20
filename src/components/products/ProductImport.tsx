import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function ProductImport() {
  return (
    <Button variant="outline" className="gap-2">
      <Upload className="h-4 w-4" /> Import CSV
    </Button>
  );
}