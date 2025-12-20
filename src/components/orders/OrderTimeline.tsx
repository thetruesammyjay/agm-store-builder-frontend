import { CheckCircle2, Circle, Clock, Package, XCircle } from "lucide-react";
import { formatDateTime } from "@/lib/format";
import type { OrderTimelineEvent } from "@/types";

interface OrderTimelineProps {
  timeline?: OrderTimelineEvent[];
}

export function OrderTimeline({ timeline = [] }: OrderTimelineProps) {
  const getIcon = (type: OrderTimelineEvent['type']) => {
    switch (type) {
      case 'created': return <Clock className="h-4 w-4" />;
      case 'paid': return <CheckCircle2 className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle2 className="h-4 w-4" />;
      case 'fulfilled': return <Package className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const getColor = (type: OrderTimelineEvent['type']) => {
    switch (type) {
      case 'created': return "bg-gray-100 text-gray-600";
      case 'paid': return "bg-green-100 text-green-600";
      case 'confirmed': return "bg-blue-100 text-blue-600";
      case 'fulfilled': return "bg-purple-100 text-purple-600";
      case 'cancelled': return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getColor(event.type)}`}>
                    {getIcon(event.type)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.description}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-xs text-gray-500">
                    <time dateTime={event.createdAt}>{formatDateTime(event.createdAt)}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}