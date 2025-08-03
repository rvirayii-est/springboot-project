import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { TodoList } from "@/components/TodoList";
import { LinkOrganizer } from "@/components/LinkOrganizer";
import { BlogCreator } from "@/components/BlogCreator";
import { Overview } from "@/components/Overview";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // This is a simple demo - in a real app, you'd want to use a state management solution
  // or local storage to persist data across sessions
  const [todos, setTodos] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  const completedTodos = useMemo(() => todos.filter(todo => todo.completed), [todos]);

  const renderContent = () => {
    switch (activeTab) {
      case "todos":
        return <TodoList />;
      case "links":
        return <LinkOrganizer />;
      case "blog":
        return <BlogCreator />;
      case "overview":
        return (
          <Overview
            todosCount={todos.length}
            completedTodosCount={completedTodos.length}
            linksCount={links.length}
            blogPostsCount={blogPosts.length}
          />
        );
      default:
        return <Overview 
          todosCount={0} 
          completedTodosCount={0} 
          linksCount={0} 
          blogPostsCount={0} 
        />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Productivity Hub
          </h1>
          <p className="text-lg text-muted-foreground">
            Organize your tasks, links, and blog posts in one place
          </p>
        </header>

        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="max-w-4xl mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
