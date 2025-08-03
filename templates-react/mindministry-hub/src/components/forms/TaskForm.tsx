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
import { CalendarIcon, CheckSquare, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const taskSchema = z.object({
  title: z.string().min(3, "Task title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  assignedTo: z.string().min(2, "Assignee is required"),
  dueDate: z.date(),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  status: z.enum(["todo", "in-progress", "review", "completed"]).default("todo"),
  category: z.enum(["ministry", "admin", "outreach", "maintenance", "event", "other"]),
  estimatedHours: z.string().optional(),
  ministry: z.string().optional(),
  relatedEvent: z.string().optional(),
  notes: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

export function TaskForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: "todo"
    }
  });

  const watchedDueDate = watch("dueDate");
  const watchedPriority = watch("priority");

  const onSubmit = async (data: TaskFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Task data:", data);
      
      toast({
        title: "Task Created Successfully",
        description: `Task "${data.title}" has been assigned to ${data.assignedTo}.`,
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "text-red-600 bg-red-50";
      case "high": return "text-orange-600 bg-orange-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "";
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5" />
          Create New Task
        </CardTitle>
        <CardDescription>
          Assign a new task to team members and track progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Task Information */}
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="e.g., Prepare Sunday bulletin"
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
              placeholder="Describe what needs to be done..."
              rows={3}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          {/* Assignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To *</Label>
              <Input
                id="assignedTo"
                {...register("assignedTo")}
                placeholder="Person responsible for this task"
                className={errors.assignedTo ? "border-destructive" : ""}
              />
              {errors.assignedTo && (
                <p className="text-sm text-destructive">{errors.assignedTo.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedHours">Estimated Hours</Label>
              <Input
                id="estimatedHours"
                type="number"
                step="0.5"
                {...register("estimatedHours")}
                placeholder="Hours to complete"
              />
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label>Due Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !watchedDueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watchedDueDate ? format(watchedDueDate, "PPP") : "Select due date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={watchedDueDate}
                  onSelect={(date) => setValue("dueDate", date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            {errors.dueDate && (
              <p className="text-sm text-destructive">{errors.dueDate.message}</p>
            )}
          </div>

          {/* Priority and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priority *</Label>
              <Select onValueChange={(value) => setValue("priority", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Low Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      Medium Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      High Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="urgent">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      Urgent
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select onValueChange={(value) => setValue("status", value as any)} defaultValue="todo">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category and Ministry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select onValueChange={(value) => setValue("category", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ministry">Ministry Work</SelectItem>
                  <SelectItem value="admin">Administrative</SelectItem>
                  <SelectItem value="outreach">Outreach</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="event">Event Related</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ministry">Related Ministry</Label>
              <Input
                id="ministry"
                {...register("ministry")}
                placeholder="e.g., Youth Ministry"
              />
            </div>
          </div>

          {/* Related Event */}
          <div className="space-y-2">
            <Label htmlFor="relatedEvent">Related Event</Label>
            <Input
              id="relatedEvent"
              {...register("relatedEvent")}
              placeholder="If this task is for a specific event"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Any additional instructions or information..."
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            variant="ministry"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Task..." : "Create Task"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}