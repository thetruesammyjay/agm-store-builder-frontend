"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

// Pre-defined curated palettes for quick selection
const PRESETS = [
  { name: "Ocean Blue", value: "#3b82f6" },
  { name: "Royal Purple", value: "#7c3aed" },
  { name: "Forest Green", value: "#10b981" },
  { name: "Sunset Orange", value: "#f97316" },
  { name: "Berry Red", value: "#ef4444" },
  { name: "Midnight", value: "#111827" },
];

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base">Brand Primary Color</Label>
      
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {PRESETS.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => onChange(color.value)}
            className={cn(
              "group relative h-12 w-full rounded-lg border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
              value === color.value ? "border-black ring-2 ring-black ring-offset-1" : "border-transparent"
            )}
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            {value === color.value && (
              <span className="absolute inset-0 flex items-center justify-center text-white">
                <Check className="h-6 w-6 drop-shadow-sm" />
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="pt-2">
        <Label className="text-sm text-gray-500 mb-2 block">Or enter custom hex code</Label>
        <div className="flex gap-2 items-center">
          <div 
            className="w-10 h-10 rounded border shadow-sm shrink-0"
            style={{ backgroundColor: value }}
          />
          <Input 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            placeholder="#000000"
            className="font-mono uppercase max-w-[120px]"
            maxLength={7}
          />
        </div>
      </div>
    </div>
  );
}