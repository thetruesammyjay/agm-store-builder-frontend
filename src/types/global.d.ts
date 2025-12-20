/**
 * Global Type Declarations
 * TypeScript global types and augmentations
 */

/**
 * Environment variables
 */
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_GA_ID?: string;
    NEXT_PUBLIC_FB_PIXEL_ID?: string;
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?: string;
  }
}

/**
 * Window object extensions for analytics
 */
interface Window {
  gtag?: (...args: any[]) => void;
  fbq?: (...args: any[]) => void;
  dataLayer?: any[];
}

/**
 * Extend File type for custom properties
 */
interface File {
  preview?: string;
}

/**
 * Custom fetch response types
 */
interface FetchResponse<T = any> {
  data?: T;
  error?: Error;
  status: number;
}

/**
 * AGM-specific constants
 */
declare const AGM_CONSTANTS: {
  readonly FEE_PERCENTAGE: 0.01;
  readonly RESERVED_USERNAMES: readonly string[];
  readonly MAX_FILE_SIZE: 5242880;
  readonly OTP_EXPIRY_MINUTES: 10;
  readonly PAYMENT_EXPIRY_MINUTES: 30;
};

/**
 * React children types
 */
export type ReactChildren = 
  | React.ReactElement
  | React.ReactElement[]
  | React.ReactNode
  | React.ReactNode[];

/**
 * Async component type
 */
export type AsyncComponent<P = {}> = (props: P) => Promise<JSX.Element>;

/**
 * Layout component type
 */
export type LayoutComponent = React.FC<{
  children: React.ReactNode;
  params?: Record<string, string>;
}>;

/**
 * Page component type
 */
export type PageComponent<P = {}> = React.FC<{
  params: P;
  searchParams?: Record<string, string | string[]>;
}>;

/**
 * Error component type
 */
export type ErrorComponent = React.FC<{
  error: Error;
  reset: () => void;
}>;

/**
 * Loading component type
 */
export type LoadingComponent = React.FC;

/**
 * Not found component type
 */
export type NotFoundComponent = React.FC;

/**
 * API route handler type
 */
export type RouteHandler = (
  request: Request,
  context: { params: Record<string, string> }
) => Promise<Response>;

/**
 * Middleware function type
 */
export type MiddlewareFunction = (
  request: Request
) => Promise<Response | undefined>;

/**
 * Custom hook return type helper
 */
export type UseHookReturn<T> = {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

/**
 * Mutation hook return type helper
 */
export type UseMutationReturn<TData, TVariables> = {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  data: TData | undefined;
  reset: () => void;
};

/**
 * Form field value type
 */
export type FormFieldValue = string | number | boolean | null | undefined;

/**
 * Form values type
 */
export type FormValues = Record<string, FormFieldValue | FormFieldValue[]>;

/**
 * Table column type
 */
export type TableColumn<T = any> = {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
};

/**
 * Filter option type
 */
export type FilterOption = {
  label: string;
  value: string | number;
};

/**
 * Select option type
 */
export type SelectOption<T = string> = {
  label: string;
  value: T;
  disabled?: boolean;
};

/**
 * Breadcrumb item type
 */
export type BreadcrumbItem = {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
};

/**
 * Navigation item type
 */
export type NavigationItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavigationItem[];
};

/**
 * Toast notification type
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Modal props type
 */
export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

/**
 * Drawer props type
 */
export type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  children: React.ReactNode;
};

/**
 * Chart data point type
 */
export type ChartDataPoint = {
  label: string;
  value: number;
  color?: string;
};

/**
 * Time period type
 */
export type TimePeriod = '24h' | '7d' | '30d' | '90d' | '1y' | 'all';

/**
 * Sort direction type
 */
export type SortDirection = 'asc' | 'desc';

/**
 * File type enum
 */
export type FileType = 'image' | 'video' | 'document' | 'audio' | 'other';

/**
 * Upload status type
 */
export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

/**
 * Theme type
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Language type
 */
export type Language = 'en' | 'yo' | 'ig' | 'ha';

/**
 * Currency type
 */
export type Currency = 'NGN' | 'USD' | 'GBP' | 'EUR';

/**
 * Nigerian state type
 */
export type NigerianState =
  | 'Abia'
  | 'Adamawa'
  | 'Akwa Ibom'
  | 'Anambra'
  | 'Bauchi'
  | 'Bayelsa'
  | 'Benue'
  | 'Borno'
  | 'Cross River'
  | 'Delta'
  | 'Ebonyi'
  | 'Edo'
  | 'Ekiti'
  | 'Enugu'
  | 'FCT'
  | 'Gombe'
  | 'Imo'
  | 'Jigawa'
  | 'Kaduna'
  | 'Kano'
  | 'Katsina'
  | 'Kebbi'
  | 'Kogi'
  | 'Kwara'
  | 'Lagos'
  | 'Nasarawa'
  | 'Niger'
  | 'Ogun'
  | 'Ondo'
  | 'Osun'
  | 'Oyo'
  | 'Plateau'
  | 'Rivers'
  | 'Sokoto'
  | 'Taraba'
  | 'Yobe'
  | 'Zamfara';

/**
 * Utility type: Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Utility type: Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Utility type: Deep partial
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Utility type: Deep readonly
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Utility type: Nullable
 */
export type Nullable<T> = T | null;

/**
 * Utility type: Optional
 */
export type Optional<T> = T | undefined;

/**
 * Utility type: Maybe (nullable or undefined)
 */
export type Maybe<T> = T | null | undefined;

/**
 * Utility type: Awaited (unwrap Promise)
 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/**
 * Utility type: Function with typed arguments
 */
export type Fn<Args extends any[] = any[], Return = void> = (...args: Args) => Return;

/**
 * Utility type: Async function
 */
export type AsyncFn<Args extends any[] = any[], Return = any> = (
  ...args: Args
) => Promise<Return>;

/**
 * Module augmentation for better IDE support
 */
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

/**
 * JSON module support
 */
declare module '*.json' {
  const value: any;
  export default value;
}

/**
 * Extend global JSX namespace for custom elements
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Add custom elements here if needed
    }
  }
}

export {};