"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Heading1, 
  Heading2,
  Quote
} from "lucide-react";

interface RichTextEditorProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  description?: string;
}

const ToolbarButton = ({ 
  icon: Icon, 
  onClick, 
  label 
}: { 
  icon: any; 
  onClick: () => void; 
  label: string 
}) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    onClick={onClick}
    className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-500"
    title={label}
  >
    <Icon className="h-4 w-4" />
    <span className="sr-only">{label}</span>
  </Button>
);

export const RichTextEditor = React.forwardRef<HTMLTextAreaElement, RichTextEditorProps>(
  ({ className, label, error, description, onChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null);

    // Merge refs to allow both internal manipulation and external form registration
    const setRefs = (element: HTMLTextAreaElement | null) => {
      internalRef.current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = element;
      }
    };

    const insertFormat = (startTag: string, endTag: string = "") => {
      const textarea = internalRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const before = text.substring(0, start);
      const selection = text.substring(start, end);
      const after = text.substring(end);

      const newValue = `${before}${startTag}${selection}${endTag}${after}`;
      
      // Update value
      textarea.value = newValue;
      
      // Trigger onChange event for React Hook Form
      if (onChange) {
        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);
        // We also need to call the passed onChange directly to ensure state updates
        const syntheticEvent = {
          ...event,
          target: textarea,
          currentTarget: textarea,
        } as unknown as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(syntheticEvent);
      }

      // Restore focus and selection
      textarea.focus();
      textarea.setSelectionRange(start + startTag.length, end + startTag.length);
    };

    return (
      <div className={cn("w-full space-y-2", className)}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        
        <div className={cn(
          "rounded-md border border-input bg-transparent shadow-sm focus-within:ring-1 focus-within:ring-ring",
          error && "border-red-500 focus-within:ring-red-500"
        )}>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1 border-b bg-gray-50/50 p-1">
            <ToolbarButton 
              icon={Bold} 
              label="Bold" 
              onClick={() => insertFormat("**", "**")} 
            />
            <ToolbarButton 
              icon={Italic} 
              label="Italic" 
              onClick={() => insertFormat("_", "_")} 
            />
            <div className="w-px h-4 bg-gray-300 mx-1" />
            <ToolbarButton 
              icon={Heading1} 
              label="Heading 1" 
              onClick={() => insertFormat("# ")} 
            />
            <ToolbarButton 
              icon={Heading2} 
              label="Heading 2" 
              onClick={() => insertFormat("## ")} 
            />
            <div className="w-px h-4 bg-gray-300 mx-1" />
            <ToolbarButton 
              icon={List} 
              label="Bullet List" 
              onClick={() => insertFormat("- ")} 
            />
            <ToolbarButton 
              icon={ListOrdered} 
              label="Ordered List" 
              onClick={() => insertFormat("1. ")} 
            />
            <div className="w-px h-4 bg-gray-300 mx-1" />
            <ToolbarButton 
              icon={Quote} 
              label="Quote" 
              onClick={() => insertFormat("> ")} 
            />
            <ToolbarButton 
              icon={LinkIcon} 
              label="Link" 
              onClick={() => insertFormat("[", "](url)")} 
            />
          </div>

          <Textarea
            ref={setRefs}
            className="min-h-[150px] border-0 focus-visible:ring-0 rounded-t-none resize-y font-mono text-sm"
            onChange={onChange}
            {...props}
          />
          
          <div className="flex justify-between items-center px-3 py-2 bg-gray-50/30 text-xs text-gray-500 border-t">
            <span>Markdown Supported</span>
            <span>
              {props.value ? String(props.value).length : 0} chars
            </span>
          </div>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        
        {error && (
          <p className="text-sm font-medium text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";