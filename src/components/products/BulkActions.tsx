"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Archive, CheckCircle } from "lucide-react";

interface BulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
  onArchive: () => void;
}

export function BulkActions({ selectedCount, onDelete, onArchive }: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-primary-100 bg-primary-50 p-2 text-sm text-primary-700 animate-in slide-in-from-top-2">
      <span className="px-2 font-medium">{selectedCount} selected</span>
      <div className="h-4 w-px bg-primary-200 mx-2" />
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 hover:bg-primary-100 hover:text-primary-800"
        onClick={onArchive}
      >
        <Archive className="mr-2 h-3.5 w-3.5" /> Archive
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 text-red-600 hover:bg-red-50 hover:text-red-700"
        onClick={onDelete}
      >
        <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
      </Button>
    </div>
  );
}