import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, UserPlus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const memberSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.date().optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  membershipStatus: z.enum(["active", "inactive", "visitor", "new"]),
  ministry: z.string().optional(),
  smallGroup: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  notes: z.string().optional(),
});

type MemberFormData = z.infer<typeof memberSchema>;

export function MemberForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
  });

  const watchedDate = watch("dateOfBirth");

  const onSubmit = async (data: MemberFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Member data:", data);
      
      toast({
        title: "Member Added Successfully",
        description: `${data.firstName} ${data.lastName} has been added to the church.`,
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add member. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add New Member
        </CardTitle>
        <CardDescription>
          Register a new church member with their details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                {...register("phone")}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !watchedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watchedDate ? format(watchedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={watchedDate}
                  onSelect={(date) => setValue("dateOfBirth", date)}
                  disabled={(date) => date > new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              {...register("address")}
              className={errors.address ? "border-destructive" : ""}
              rows={2}
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address.message}</p>
            )}
          </div>

          {/* Membership Status */}
          <div className="space-y-2">
            <Label>Membership Status *</Label>
            <Select onValueChange={(value) => setValue("membershipStatus", value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select membership status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Member</SelectItem>
                <SelectItem value="active">Active Member</SelectItem>
                <SelectItem value="visitor">Visitor</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ministry & Small Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ministry">Ministry</Label>
              <Input
                id="ministry"
                {...register("ministry")}
                placeholder="e.g., Youth Ministry, Worship Team"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smallGroup">Small Group</Label>
              <Input
                id="smallGroup"
                {...register("smallGroup")}
                placeholder="e.g., Group Alpha, Cell Group 1"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                {...register("emergencyContact")}
                placeholder="Full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Emergency Phone</Label>
              <Input
                id="emergencyPhone"
                {...register("emergencyPhone")}
                placeholder="Phone number"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Additional notes about the member..."
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            variant="ministry"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding Member..." : "Add Member"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}