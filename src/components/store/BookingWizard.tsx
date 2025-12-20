"use client";

import { useState } from "react";
import { format, addDays, startOfToday } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  ChevronRight, 
  ChevronLeft, 
  Loader2,
  MapPin,
  Phone,
  Mail,
  Edit2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import { toast } from "@/store/notificationStore";
import type { Product } from "@/types";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { post } from "@/lib/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface BookingWizardProps {
  storeUsername: string;
  services: Product[];
}

type Step = "service" | "datetime" | "details" | "review";

// Production schema for customer details
const bookingFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().min(10, "Valid phone number is required"),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

// Time slots would typically come from an API based on the selected date
const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", 
  "12:00 PM", "01:00 PM", "02:00 PM", 
  "03:00 PM", "04:00 PM", "05:00 PM"
];

export function BookingWizard({ storeUsername, services }: BookingWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("service");
  
  // Booking State
  const [selectedService, setSelectedService] = useState<Product | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string | null>(null);

  // Form handling
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  // Mutation to create booking (using generic post to avoid missing hook issues)
  const { mutate: createBooking, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await post<{ success: boolean; data: { paymentReference: string } }>(
        `/stores/${storeUsername}/orders`, 
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Booking Confirmed", "Redirecting to payment...");
      router.push(`/store/${storeUsername}/checkout/success?ref=${data.paymentReference}`);
    },
    onError: (error: any) => {
      toast.error("Booking Failed", error.response?.data?.message || "Could not schedule appointment.");
    }
  });

  const handleServiceSelect = (service: Product) => {
    setSelectedService(service);
    setStep("datetime");
  };

  const handleDateSelect = () => {
    if (date && timeSlot) {
      setStep("details");
    } else {
      toast.error("Required", "Please select a date and time.");
    }
  };

  const handleDetailsSubmit = () => {
    // Validate form before moving to review
    form.trigger().then((isValid) => {
      if (isValid) {
        setStep("review");
      }
    });
  };

  const handleFinalSubmit = () => {
    if (!selectedService || !date || !timeSlot) return;
    
    const formData = form.getValues();
    const bookingTime = `${format(date, "MMMM do, yyyy")} at ${timeSlot}`;

    createBooking({
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      items: [{
        productId: selectedService.id,
        quantity: 1,
        selectedVariations: {
            "Appointment": bookingTime
        }
      }],
      notes: `Booking Request: ${bookingTime}. ${formData.notes}`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Wizard Content */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Step 1: Service Selection */}
        {step === "service" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
            <h2 className="text-xl font-bold text-gray-900">Select a Service</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className={cn(
                    "cursor-pointer rounded-xl border p-5 transition-all hover:shadow-md active:scale-[0.98]",
                    selectedService?.id === service.id
                      ? "border-primary-600 bg-primary-50/50 ring-1 ring-primary-600"
                      : "border-gray-200 bg-white hover:border-primary-300"
                  )}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{service.name}</h3>
                    {selectedService?.id === service.id && <CheckCircle2 className="h-5 w-5 text-primary-600" />}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 min-h-[2.5rem]">
                    {service.description || "No description available."}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-lg text-primary-700">{formatCurrency(service.price)}</p>
                    <Badge variant="secondary" className="bg-white">Book Now</Badge>
                  </div>
                </div>
              ))}
            </div>
            {services.length === 0 && (
               <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed">
                 <p className="text-gray-500">No services available at the moment.</p>
               </div>
            )}
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === "datetime" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-xl font-bold text-gray-900">Choose Date & Time</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="rounded-xl border bg-white p-4 max-w-fit mx-auto md:mx-0 shadow-sm">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < startOfToday()}
                  initialFocus
                  className="rounded-md border-none"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Available Slots
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TIME_SLOTS.map((slot) => (
                        <Button
                            key={slot}
                            variant={timeSlot === slot ? "default" : "outline"}
                            className={cn(
                                "h-11 text-sm font-normal",
                                timeSlot === slot 
                                  ? "bg-primary-600 text-white shadow-md" 
                                  : "hover:border-primary-400 hover:bg-primary-50 text-gray-700"
                            )}
                            onClick={() => setTimeSlot(slot)}
                        >
                            {slot}
                        </Button>
                    ))}
                </div>
                {!timeSlot && (
                  <p className="text-xs text-muted-foreground mt-4">
                    * Please select a time slot to continue.
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between pt-4 border-t">
              <Button variant="ghost" onClick={() => setStep("service")}>Back</Button>
              <Button onClick={handleDateSelect} disabled={!date || !timeSlot}>Next Step</Button>
            </div>
          </div>
        )}

        {/* Step 3: Customer Details */}
        {step === "details" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-xl font-bold text-gray-900">Your Information</h2>
            <Card className="border-gray-200 shadow-sm">
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email (Optional)</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+234..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requests</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any specific instructions..." 
                                className="resize-none"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
            </Card>
            <div className="flex justify-between pt-4 border-t">
              <Button variant="ghost" onClick={() => setStep("datetime")}>Back</Button>
              <Button onClick={handleDetailsSubmit}>Review Booking</Button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Confirm */}
        {step === "review" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-xl font-bold text-gray-900">Review Booking</h2>
            
            <Card className="border-primary-100 bg-primary-50/20">
              <CardHeader className="pb-3 border-b border-primary-100/50">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Appointment Details</span>
                  <Button variant="ghost" size="sm" onClick={() => setStep("datetime")} className="h-8 text-xs">
                    <Edit2 className="w-3 h-3 mr-1" /> Edit
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-4 md:grid-cols-2">
                 <div className="flex items-center gap-3">
                   <CalendarIcon className="h-5 w-5 text-primary-600" />
                   <div>
                     <p className="text-xs text-gray-500">Date</p>
                     <p className="font-medium">{date ? format(date, "MMMM do, yyyy") : "-"}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <Clock className="h-5 w-5 text-primary-600" />
                   <div>
                     <p className="text-xs text-gray-500">Time</p>
                     <p className="font-medium">{timeSlot}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <CheckCircle2 className="h-5 w-5 text-primary-600" />
                   <div>
                     <p className="text-xs text-gray-500">Service</p>
                     <p className="font-medium">{selectedService?.name}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <User className="h-5 w-5 text-primary-600" />
                   <div>
                     <p className="text-xs text-gray-500">For</p>
                     <p className="font-medium">{form.getValues("name")}</p>
                   </div>
                 </div>
              </CardContent>
            </Card>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="ghost" onClick={() => setStep("details")} disabled={isPending}>Back</Button>
              <Button 
                onClick={handleFinalSubmit} 
                disabled={isPending}
                className="bg-green-600 hover:bg-green-700 text-white min-w-[140px]"
              >
                {isPending ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Confirm Booking"}
              </Button>
            </div>
          </div>
        )}

      </div>

      {/* Booking Summary Sidebar (Always Visible on Desktop) */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="sticky top-24">
            <Card className="border-gray-200 shadow-lg">
                <CardHeader className="bg-gray-50 border-b pb-4">
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Service</p>
                        <p className="font-medium text-gray-900">{selectedService?.name || "Select a service"}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total</p>
                        <p className="text-2xl font-bold text-primary-600">
                          {selectedService ? formatCurrency(selectedService.price) : "₦0.00"}
                        </p>
                    </div>

                    {(date && timeSlot) && (
                      <div className="pt-4 border-t space-y-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">When</p>
                        <p className="text-sm font-medium">
                          {format(date!, "MMM do")} • {timeSlot}
                        </p>
                      </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}