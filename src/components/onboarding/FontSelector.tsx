"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function FontSelector({ value, onChange }: FontSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="font-select">Store Font</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="font-select" className="w-full">
          <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="inter" className="font-sans">Inter (Modern & Clean)</SelectItem>
          <SelectItem value="merriweather" className="font-serif">Merriweather (Classic)</SelectItem>
          <SelectItem value="roboto" className="font-[roboto]">Roboto (Neutral)</SelectItem>
          <SelectItem value="playfair" className="font-serif">Playfair Display (Elegant)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}