frontend/
│
├── 📁 public/                           # Static assets
│   ├── favicon.ico                      # Site favicon
│   ├── logo.svg                         # AGM logo
│   ├── logo-white.svg                   # White version for dark bg
│   ├── og-image.png                     # Open Graph image (1200x630)
│   ├── apple-touch-icon.png             # iOS home screen icon
│   ├── manifest.json                    # PWA manifest
│   ├── robots.txt                       # SEO robots file
│   │
│   ├── 📁 images/                       # Static images
│   │   ├── hero-banner.jpg
│   │   ├── features-1.png
│   │   ├── features-2.png
│   │   ├── testimonial-bg.jpg
│   │   └── 404-illustration.svg
│   │
│   └── 📁 templates/                    # Template preview images
│       ├── products-template.png
│       ├── bookings-template.png
│       ├── portfolio-template.png
│       ├── products-mobile.png
│       ├── bookings-mobile.png
│       └── portfolio-mobile.png
│
├── 📁 src/
│   │
│   ├── 📁 app/                          # Next.js 14 App Router
│   │   │
│   │   ├── layout.tsx                   # Root layout with providers
│   │   ├── page.tsx                     # Landing page (/)
│   │   ├── globals.css                  # Global styles & Tailwind
│   │   ├── loading.tsx                  # Root loading state
│   │   ├── error.tsx                    # Root error boundary
│   │   ├── not-found.tsx                # 404 page
│   │   │
│   │   ├── 📁 (marketing)/              # Marketing pages group
│   │   │   ├── layout.tsx               # Marketing layout (navbar + footer)
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx
│   │   │   ├── features/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   └── blog/
│   │   │       ├── page.tsx
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   │
│   │   ├── 📁 (auth)/                   # Authentication routes
│   │   │   ├── layout.tsx               # Auth layout (centered card)
│   │   │   │
│   │   │   ├── login/
│   │   │   │   ├── page.tsx             # Login form
│   │   │   │   └── loading.tsx
│   │   │   │
│   │   │   ├── signup/
│   │   │   │   ├── page.tsx             # Signup form
│   │   │   │   └── loading.tsx
│   │   │   │
│   │   │   ├── verify/
│   │   │   │   └── page.tsx             # OTP verification
│   │   │   │
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx             # Request reset link
│   │   │   │
│   │   │   └── reset-password/
│   │   │       └── page.tsx             # Reset password form
│   │   │
│   │   ├── 📁 (dashboard)/              # Dashboard routes (protected)
│   │   │   ├── layout.tsx               # Dashboard layout (sidebar + header)
│   │   │   ├── loading.tsx              # Dashboard loading
│   │   │   ├── error.tsx                # Dashboard error boundary
│   │   │   │
│   │   │   ├── dashboard/               # Main dashboard
│   │   │   │   ├── page.tsx             # Analytics overview
│   │   │   │   ├── loading.tsx
│   │   │   │   └── error.tsx
│   │   │   │
│   │   │   ├── orders/                  # Orders management
│   │   │   │   ├── page.tsx             # Orders list
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── error.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx         # Order details
│   │   │   │       └── loading.tsx
│   │   │   │
│   │   │   ├── products/                # Products management
│   │   │   │   ├── page.tsx             # Products list
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── error.tsx
│   │   │   │   ├── new/
│   │   │   │   │   ├── page.tsx         # Create product
│   │   │   │   │   └── loading.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx         # Product details
│   │   │   │       ├── loading.tsx
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx     # Edit product
│   │   │   │
│   │   │   ├── customers/               # Customers list
│   │   │   │   ├── page.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx         # Customer details
│   │   │   │
│   │   │   ├── analytics/               # Advanced analytics
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   │
│   │   │   ├── reviews/                 # Customer reviews
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── settings/                # Store settings
│   │   │       ├── page.tsx             # Settings overview
│   │   │       ├── loading.tsx
│   │   │       │
│   │   │       ├── store/               # Store customization
│   │   │       │   └── page.tsx
│   │   │       │
│   │   │       ├── payment/             # Payment settings
│   │   │       │   └── page.tsx
│   │   │       │
│   │   │       ├── domain/              # Custom domain (premium)
│   │   │       │   └── page.tsx
│   │   │       │
│   │   │       ├── notifications/       # Notification preferences
│   │   │       │   └── page.tsx
│   │   │       │
│   │   │       ├── team/                # Team members (future)
│   │   │       │   └── page.tsx
│   │   │       │
│   │   │       └── profile/             # User profile
│   │   │           └── page.tsx
│   │   │
│   │   ├── 📁 onboarding/               # Store setup wizard
│   │   │   ├── layout.tsx               # Wizard layout with steps
│   │   │   │
│   │   │   ├── step-1-name/
│   │   │   │   └── page.tsx             # Choose store name/username
│   │   │   │
│   │   │   ├── step-2-template/
│   │   │   │   └── page.tsx             # Select template
│   │   │   │
│   │   │   ├── step-3-customize/
│   │   │   │   └── page.tsx             # Brand customization
│   │   │   │
│   │   │   ├── step-4-products/
│   │   │   │   └── page.tsx             # Add first products
│   │   │   │
│   │   │   ├── step-5-payment/
│   │   │   │   └── page.tsx             # Bank account setup
│   │   │   │
│   │   │   └── complete/
│   │   │       └── page.tsx             # Success page
│   │   │
│   │   ├── 📁 store/                    # Dynamic store pages (subdomain)
│   │   │   └── [username]/
│   │   │       ├── page.tsx             # Store homepage (SSR)
│   │   │       ├── layout.tsx           # Store layout
│   │   │       ├── loading.tsx          # Store loading
│   │   │       ├── error.tsx            # Store error
│   │   │       ├── not-found.tsx        # Store 404
│   │   │       │
│   │   │       ├── products/            # Product pages
│   │   │       │   └── [id]/
│   │   │       │       ├── page.tsx     # Product detail (SSR)
│   │   │       │       └── loading.tsx
│   │   │       │
│   │   │       ├── checkout/            # Checkout flow
│   │   │       │   ├── page.tsx         # Checkout form
│   │   │       │   └── success/
│   │   │       │       └── page.tsx     # Payment instructions
│   │   │       │
│   │   │       ├── track/               # Order tracking
│   │   │       │   └── [orderNumber]/
│   │   │       │       └── page.tsx
│   │   │       │
│   │   │       ├── book/                # Booking page (for bookings template)
│   │   │       │   └── page.tsx
│   │   │       │
│   │   │       └── about/               # Store about page
│   │   │           └── page.tsx
│   │   │
│   │   ├── 📁 api/                      # API routes (optional, for webhooks)
│   │   │   ├── health/
│   │   │   │   └── route.ts             # Health check endpoint
│   │   │   │
│   │   │   ├── revalidate/
│   │   │   │   └── route.ts             # ISR revalidation
│   │   │   │
│   │   │   └── webhooks/
│   │   │       └── clerk/               # If using Clerk for auth
│   │   │           └── route.ts
│   │   │
│   │   └── middleware.ts                # CRITICAL: Subdomain routing logic
│   │
│   ├── 📁 components/                   # React components
│   │   │
│   │   ├── 📁 ui/                       # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── label.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── switch.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── 📁 auth/                     # Authentication components
│   │   │   ├── LoginForm.tsx            # Email/phone login
│   │   │   ├── SignupForm.tsx           # Registration form
│   │   │   ├── OTPInput.tsx             # 6-digit OTP input
│   │   │   ├── OTPVerification.tsx      # OTP verification flow
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   ├── ResetPasswordForm.tsx
│   │   │   ├── ProtectedRoute.tsx       # Route guard HOC
│   │   │   ├── AuthProvider.tsx         # Auth context provider
│   │   │   └── SocialLogin.tsx          # Google/Facebook login
│   │   │
│   │   ├── 📁 dashboard/                # Dashboard components
│   │   │   ├── Sidebar.tsx              # Main sidebar navigation
│   │   │   ├── Header.tsx               # Dashboard header
│   │   │   ├── MobileNav.tsx            # Mobile navigation
│   │   │   ├── Breadcrumbs.tsx          # Navigation breadcrumbs
│   │   │   ├── StatsCard.tsx            # Metric display card
│   │   │   ├── RevenueChart.tsx         # Revenue line chart
│   │   │   ├── OrdersChart.tsx          # Orders bar chart
│   │   │   ├── TopProducts.tsx          # Best selling products
│   │   │   ├── RecentOrders.tsx         # Recent orders list
│   │   │   ├── QuickActions.tsx         # Quick action buttons
│   │   │   ├── NotificationBell.tsx     # Notifications dropdown
│   │   │   ├── UserMenu.tsx             # User dropdown menu
│   │   │   └── SearchBar.tsx            # Global search
│   │   │
│   │   ├── 📁 products/                 # Product components
│   │   │   ├── ProductCard.tsx          # Product grid item
│   │   │   ├── ProductGrid.tsx          # Products grid layout
│   │   │   ├── ProductList.tsx          # Products list (table)
│   │   │   ├── ProductForm.tsx          # Create/edit product form
│   │   │   ├── ProductFormBasic.tsx     # Basic info step
│   │   │   ├── ProductFormPricing.tsx   # Pricing step
│   │   │   ├── ProductFormInventory.tsx # Inventory step
│   │   │   ├── ProductFormImages.tsx    # Images step
│   │   │   ├── ImageUpload.tsx          # Drag & drop image upload
│   │   │   ├── ImageGallery.tsx         # Product image gallery
│   │   │   ├── VariationManager.tsx     # Size/color variations
│   │   │   ├── VariationRow.tsx         # Single variation item
│   │   │   ├── InventoryTracker.tsx     # Stock level indicator
│   │   │   ├── ProductFilter.tsx        # Filter sidebar
│   │   │   ├── ProductSort.tsx          # Sort dropdown
│   │   │   ├── BulkActions.tsx          # Bulk edit/delete
│   │   │   └── ProductImport.tsx        # CSV import (future)
│   │   │
│   │   ├── 📁 orders/                   # Order components
│   │   │   ├── OrderCard.tsx            # Order summary card
│   │   │   ├── OrderList.tsx            # Orders table
│   │   │   ├── OrderDetails.tsx         # Full order view
│   │   │   ├── OrderStatusBadge.tsx     # Status indicator
│   │   │   ├── OrderTimeline.tsx        # Order history timeline
│   │   │   ├── OrderItems.tsx           # Order line items
│   │   │   ├── OrderCustomer.tsx        # Customer info card
│   │   │   ├── OrderActions.tsx         # Action buttons
│   │   │   ├── UpdateStatusDialog.tsx   # Change status modal
│   │   │   ├── RefundDialog.tsx         # Refund modal
│   │   │   ├── OrderFilter.tsx          # Filter by status/date
│   │   │   ├── OrderExport.tsx          # Export orders (CSV/PDF)
│   │   │   └── PrintInvoice.tsx         # Print invoice button
│   │   │
│   │   ├── 📁 store/                    # Storefront components
│   │   │   ├── StoreHeader.tsx          # Store header/nav
│   │   │   ├── StoreFooter.tsx          # Store footer
│   │   │   ├── StoreLayout.tsx          # Store wrapper layout
│   │   │   ├── StoreBanner.tsx          # Hero banner
│   │   │   ├── ProductListing.tsx       # Product grid on store
│   │   │   ├── ProductQuickView.tsx     # Quick view modal
│   │   │   ├── AddToCartButton.tsx      # Add to cart CTA
│   │   │   ├── Cart.tsx                 # Shopping cart sidebar
│   │   │   ├── CartItem.tsx             # Cart line item
│   │   │   ├── CartSummary.tsx          # Cart totals
│   │   │   ├── CheckoutForm.tsx         # Customer checkout form
│   │   │   ├── CheckoutSummary.tsx      # Order summary
│   │   │   ├── PaymentInstructions.tsx  # Bank transfer details
│   │   │   ├── OrderConfirmation.tsx    # Success page
│   │   │   ├── SearchProducts.tsx       # Store search
│   │   │   ├── CategoryFilter.tsx       # Category sidebar
│   │   │   └── StoreContact.tsx         # Contact section
│   │   │
│   │   ├── 📁 onboarding/               # Onboarding wizard components
│   │   │   ├── StepIndicator.tsx        # Progress bar
│   │   │   ├── WizardNav.tsx            # Next/back buttons
│   │   │   ├── UsernameInput.tsx        # Username availability check
│   │   │   ├── TemplateSelector.tsx     # Template cards
│   │   │   ├── TemplatePreview.tsx      # Template preview modal
│   │   │   ├── ColorPicker.tsx          # Brand color picker
│   │   │   ├── FontSelector.tsx         # Font dropdown
│   │   │   ├── LogoUpload.tsx           # Logo uploader
│   │   │   ├── QuickProductForm.tsx     # Simplified product add
│   │   │   ├── BankAccountForm.tsx      # Bank details form
│   │   │   ├── BankVerification.tsx     # Paystack verification
│   │   │   └── OnboardingSuccess.tsx    # Completion screen
│   │   │
│   │   ├── 📁 settings/                 # Settings components
│   │   │   ├── StoreSettingsForm.tsx    # Store name, description
│   │   │   ├── BrandingSettings.tsx     # Colors, fonts, logo
│   │   │   ├── DomainSettings.tsx       # Custom domain (premium)
│   │   │   ├── PaymentSettings.tsx      # Bank accounts
│   │   │   ├── NotificationSettings.tsx # Email/SMS preferences
│   │   │   ├── ProfileSettings.tsx      # User profile
│   │   │   ├── SecuritySettings.tsx     # Password, 2FA
│   │   │   ├── TeamSettings.tsx         # Team members (future)
│   │   │   ├── BillingSettings.tsx      # Subscription (Phase 2)
│   │   │   └── DangerZone.tsx           # Delete account
│   │   │
│   │   ├── 📁 analytics/                # Analytics components
│   │   │   ├── RevenueCard.tsx          # Total revenue
│   │   │   ├── OrdersCard.tsx           # Total orders
│   │   │   ├── CustomersCard.tsx        # Total customers
│   │   │   ├── ConversionCard.tsx       # Conversion rate
│   │   │   ├── SalesChart.tsx           # Sales over time
│   │   │   ├── TopProductsChart.tsx     # Best sellers
│   │   │   ├── TrafficSources.tsx       # Traffic breakdown
│   │   │   ├── CustomerGrowth.tsx       # Customer growth
│   │   │   ├── DateRangePicker.tsx      # Filter by date
│   │   │   └── ExportReport.tsx         # Export analytics
│   │   │
│   │   ├── 📁 marketing/                # Marketing page components
│   │   │   ├── Hero.tsx                 # Landing hero
│   │   │   ├── Features.tsx             # Features section
│   │   │   ├── HowItWorks.tsx           # Steps explanation
│   │   │   ├── Testimonials.tsx         # Customer reviews
│   │   │   ├── Pricing.tsx              # Pricing tiers
│   │   │   ├── FAQ.tsx                  # FAQ accordion
│   │   │   ├── CTA.tsx                  # Call to action
│   │   │   ├── Navbar.tsx               # Marketing navbar
│   │   │   └── Footer.tsx               # Marketing footer
│   │   │
│   │   └── 📁 shared/                   # Shared/common components
│   │       ├── Logo.tsx                 # AGM logo component
│   │       ├── LoadingSpinner.tsx       # Loading indicator
│   │       ├── LoadingSkeleton.tsx      # Content placeholder
│   │       ├── EmptyState.tsx           # Empty list placeholder
│   │       ├── ErrorBoundary.tsx        # Error boundary wrapper
│   │       ├── ErrorMessage.tsx         # Error display
│   │       ├── SuccessMessage.tsx       # Success toast
│   │       ├── ConfirmDialog.tsx        # Confirmation modal
│   │       ├── DataTable.tsx            # Reusable data table
│   │       ├── Pagination.tsx           # Pagination controls
│   │       ├── FileUploader.tsx         # Generic file uploader
│   │       ├── RichTextEditor.tsx       # WYSIWYG editor
│   │       ├── CopyButton.tsx           # Copy to clipboard
│   │       ├── BackButton.tsx           # Browser back button
│   │       ├── PageHeader.tsx           # Page title + actions
│   │       └── Container.tsx            # Max-width wrapper
│   │
│   ├── 📁 lib/                          # Utility functions
│   │   ├── api.ts                       # API client (axios wrapper)
│   │   ├── auth.ts                      # Auth utilities
│   │   ├── utils.ts                     # General utilities
│   │   ├── cn.ts                        # className utility (shadcn)
│   │   ├── constants.ts                 # App constants
│   │   ├── validators.ts                # Zod validation schemas
│   │   ├── format.ts                    # Date/currency formatters
│   │   ├── storage.ts                   # localStorage wrapper
│   │   ├── seo.ts                       # SEO utilities
│   │   └── analytics.ts                 # Analytics helpers
│   │
│   ├── 📁 hooks/                        # Custom React hooks
│   │   ├── useAuth.ts                   # Auth state & actions
│   │   ├── useUser.ts                   # User data hook
│   │   ├── useStore.ts                  # Store data hook
│   │   ├── useProducts.ts               # Products CRUD
│   │   ├── useOrders.ts                 # Orders management
│   │   ├── useCart.ts                   # Shopping cart
│   │   ├── useCheckout.ts               # Checkout flow
│   │   ├── useUpload.ts                 # File upload
│   │   ├── useDebounce.ts               # Debounce input
│   │   ├── useMediaQuery.ts             # Responsive breakpoints
│   │   ├── useLocalStorage.ts           # Persist to localStorage
│   │   ├── useInfiniteScroll.ts         # Infinite scroll
│   │   ├── useCopyToClipboard.ts        # Copy helper
│   │   └── useToast.ts                  # Toast notifications
│   │
│   ├── 📁 store/                        # Zustand state management
│   │   ├── index.ts                     # Store exports
│   │   ├── authStore.ts                 # Auth state
│   │   ├── cartStore.ts                 # Cart state
│   │   ├── uiStore.ts                   # UI state (sidebar, modals)
│   │   └── notificationStore.ts         # Notifications
│   │
│   ├── 📁 types/                        # TypeScript definitions
│   │   ├── index.ts                     # Type exports
│   │   ├── api.ts                       # API response types
│   │   ├── user.ts                      # User types
│   │   ├── store.ts                     # Store types
│   │   ├── product.ts                   # Product types
│   │   ├── order.ts                     # Order types
│   │   ├── payment.ts                   # Payment types
│   │   ├── analytics.ts                 # Analytics types
│   │   └── global.d.ts                  # Global type declarations
│   │
│   ├── 📁 styles/                       # Additional styles
│   │   ├── globals.css                  # Global styles
│   │   ├── variables.css                # CSS variables
│   │   └── animations.css               # Custom animations
│   │
│   └── middleware.ts                    # CRITICAL: Subdomain routing
│
├── 📁 tests/                            # Frontend tests
│   ├── 📁 components/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── products/
│   │   └── store/
│   │
│   ├── 📁 pages/
│   │   ├── dashboard.test.tsx
│   │   ├── onboarding.test.tsx
│   │   └── store.test.tsx
│   │
│   ├── 📁 utils/
│   │   ├── api.test.ts
│   │   └── format.test.ts
│   │
│   └── setup.ts                         # Test setup
│
├── 📄 package.json                      # Dependencies
├── 📄 package-lock.json
├── 📄 tsconfig.json                     # TypeScript config
├── 📄 next.config.js                    # Next.js config
├── 📄 tailwind.config.ts                # Tailwind config
├── 📄 postcss.config.js                 # PostCSS config
├── 📄 components.json                   # shadcn/ui config
├── 📄 .env.local                        # Local environment variables
├── 📄 .env.example                      # Environment template
├── 📄 .eslintrc.json                    # ESLint config
├── 📄 .prettierrc                       # Prettier config
├── 📄 .gitignore                        # Git ignore
├── 📄 vercel.json                       # Vercel config (IMPORTANT)
└── 📄 README.md                         # Frontend docs