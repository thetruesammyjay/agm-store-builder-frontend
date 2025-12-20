"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { ImageUpload } from "./ImageUpload";

export function ProductFormImages() {
  const { control } = useFormContext();

  return (
    <div className="space-y-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
        <p className="text-sm text-gray-500">
          Upload up to 5 images. The first image will be the cover.
        </p>
      </div>

      <FormField
        control={control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Images</FormLabel>
            <FormControl>
              <ImageUpload
                value={field.value || []}
                onChange={field.onChange}
                onRemove={(url) => {
                  const current = field.value || [];
                  field.onChange(current.filter((item: string) => item !== url));
                }}
              />
            </FormControl>
            <FormDescription>
              Drag and drop images here, or click to browse.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}