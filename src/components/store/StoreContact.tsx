import { Mail, Phone, MapPin } from "lucide-react";
import type { Store } from "@/types";

export function StoreContact({ store }: { store: Store }) {
  // Assuming contact info might be in store settings in future, 
  // or using user details if public. For now placeholders based on schema.
  return (
    <div className="bg-gray-50 p-8 rounded-2xl text-center space-y-6">
      <h2 className="text-2xl font-bold">Contact Us</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Mail className="h-5 w-5 text-primary-600" />
          </div>
          <span className="text-sm text-gray-600">Contact via Email</span>
        </div>
        {/* Add more contact methods if available in store data */}
      </div>
    </div>
  );
}