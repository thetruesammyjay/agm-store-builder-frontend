"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Store, CalendarRange, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { TemplatePreview } from "./TemplatePreview";

interface TemplateSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: "products",
      title: "Physical Products",
      description: "Best for fashion, electronics, food, and retail items.",
      icon: Store,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      id: "bookings",
      title: "Services & Bookings",
      description: "Ideal for consultants, salons, clinics, and appointments.",
      icon: CalendarRange,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      id: "portfolio",
      title: "Digital Portfolio",
      description: "Showcase for photographers, designers, and creatives.",
      icon: FolderOpen,
      color: "bg-orange-50 text-orange-600 border-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {templates.map((template) => (
          <div key={template.id} className="relative">
            {/* FIXED: Use RadioGroupItem instead of RadioGroup.Item */}
            <RadioGroupItem
              value={template.id}
              id={template.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={template.id}
              className={cn(
                "flex flex-col h-full cursor-pointer rounded-xl border-2 p-6 transition-all hover:border-primary-200 hover:bg-gray-50",
                value === template.id
                  ? "border-primary-600 bg-primary-50/20 ring-1 ring-primary-600"
                  : "border-gray-200 bg-white"
              )}
            >
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", template.color)}>
                <template.icon className="h-6 w-6" />
              </div>
              
              <div className="space-y-2 flex-1">
                <h3 className="font-bold text-gray-900">{template.title}</h3>
                <p className="text-sm text-gray-500 leading-snug">
                  {template.description}
                </p>
              </div>

              {value === template.id && (
                <div className="absolute top-4 right-4 text-primary-600">
                  <CheckCircle2 className="h-6 w-6 fill-primary-100" />
                </div>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Prevent clicking 'preview' from selecting the radio
                  setPreviewTemplate(template.id);
                }}
                className="mt-4 text-xs font-medium text-primary-600 hover:underline text-left"
              >
                Preview Template
              </button>
            </Label>
          </div>
        ))}
      </RadioGroup>

      {previewTemplate && (
        <TemplatePreview
          templateId={previewTemplate}
          open={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </div>
  );
}