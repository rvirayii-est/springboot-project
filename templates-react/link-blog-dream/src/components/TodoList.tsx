import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const { toast } = useToast();

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const todo: Todo = {
      id: crypto.randomUUID(),
      text: newTodo,
      completed: false,
      createdAt: new Date(),
    };
    
    setTodos([todo, ...todos]);
    setNewTodo("");
    toast({
      title: "Todo added!",
      description: "Your task has been added to the list.",
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast({
      title: "Todo deleted",
      description: "Task removed from your list.",
    });
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-card p-6 rounded-lg shadow-card">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          My Tasks
        </h2>
        
        <div className="flex gap-2 mb-4">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            className="flex-1"
          />
          <Button onClick={addTodo} className="bg-gradient-primary hover:shadow-glow transition-all">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {todos.length > 0 && (
          <div className="mb-4 text-sm text-muted-foreground">
            {completedCount} of {todos.length} tasks completed
          </div>
        )}
      </div>

      <div className="space-y-3">
        {todos.map((todo) => (
          <Card key={todo.id} className="p-4 bg-gradient-card shadow-card hover:shadow-glow transition-all">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span 
                className={`flex-1 ${
                  todo.completed 
                    ? "line-through text-muted-foreground" 
                    : "text-foreground"
                }`}
              >
                {todo.text}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTodo(todo.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
        
        {todos.length === 0 && (
          <Card className="p-8 text-center bg-gradient-accent">
            <p className="text-muted-foreground">No tasks yet. Add one above to get started!</p>
          </Card>
        )}
      </div>
    </div>
  );
};