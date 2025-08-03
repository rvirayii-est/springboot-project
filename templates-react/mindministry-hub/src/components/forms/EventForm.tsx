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
import { CalendarIcon, Clock, MapPin, Calendar as CalendarIconAlt } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const eventSchema = z.object({
  title: z.string().min(3, "Event title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.date(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  capacity: z.string().optional(),
  category: z.enum(["service", "meeting", "conference", "social", "training", "outreach"]),
  isRecurring: z.boolean().default(false),
  recurringType: z.enum(["weekly", "monthly", "yearly"]).optional(),
  organizer: z.string().min(2, "Organizer name is required"),
  contact: z.string().optional(),
  requirements: z.string().optional(),
  notes: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

export function EventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const watchedDate = watch("date");
  const watchedRecurring = watch("isRecurring");

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Event data:", data);
      
      toast({
        title: "Event Created Successfully",
        description: `${data.title} has been scheduled for ${format(data.date, "PPP")}.`,
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
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
          <CalendarIconAlt className="w-5 h-5" />
          Create New Event
        </CardTitle>
        <CardDescription>
          Schedule a new event or activity for your ministry
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Basic Information */}
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="e.g., Sunday Morning Service"
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe the event details..."
              rows={3}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          {/* Date and Time */}
          <div className="space-y-2">
            <Label>Event Date *</Label>
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
                  onSelect={(date) => setValue("date", date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-sm text-destructive">{errors.date.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <Input
                id="startTime"
                type="time"
                {...register("startTime")}
                className={errors.startTime ? "border-destructive" : ""}
              />
              {errors.startTime && (
                <p className="text-sm text-destructive">{errors.startTime.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                id="endTime"
                type="time"
                {...register("endTime")}
                className={errors.endTime ? "border-destructive" : ""}
              />
              {errors.endTime && (
                <p className="text-sm text-destructive">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          {/* Location and Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="e.g., Main Sanctuary, Youth Center"
                className={errors.location ? "border-destructive" : ""}
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Expected Capacity</Label>
              <Input
                id="capacity"
                type="number"
                {...register("capacity")}
                placeholder="Number of attendees"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Event Category *</Label>
            <Select onValueChange={(value) => setValue("category", value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select event category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="service">Church Service</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="social">Social Event</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="outreach">Outreach</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Organizer and Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organizer">Organizer *</Label>
              <Input
                id="organizer"
                {...register("organizer")}
                placeholder="Event organizer name"
                className={errors.organizer ? "border-destructive" : ""}
              />
              {errors.organizer && (
                <p className="text-sm text-destructive">{errors.organizer.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Info</Label>
              <Input
                id="contact"
                {...register("contact")}
                placeholder="Phone or email"
              />
            </div>
          </div>

          {/* Requirements and Notes */}
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              {...register("requirements")}
              placeholder="What attendees need to bring or prepare..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Any additional information..."
              rows={2}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            variant="ministry"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Event..." : "Create Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}