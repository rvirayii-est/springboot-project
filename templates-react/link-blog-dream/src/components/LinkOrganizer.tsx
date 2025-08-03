import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trash2, Plus, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Link {
  id: string;
  title: string;
  url: string;
  category: string;
  createdAt: Date;
}

export const LinkOrganizer = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [newLink, setNewLink] = useState({ title: "", url: "", category: "" });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();

  const addLink = () => {
    if (!newLink.title || !newLink.url) {
      toast({
        title: "Missing information",
        description: "Please fill in both title and URL.",
        variant: "destructive",
      });
      return;
    }

    const link: Link = {
      id: crypto.randomUUID(),
      title: newLink.title,
      url: newLink.url,
      category: newLink.category || "General",
      createdAt: new Date(),
    };

    setLinks([link, ...links]);
    setNewLink({ title: "", url: "", category: "" });
    toast({
      title: "Link saved!",
      description: "Your link has been added to the collection.",
    });
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
    toast({
      title: "Link deleted",
      description: "Link removed from your collection.",
    });
  };

  const categories = Array.from(new Set(links.map(link => link.category)));
  const filteredLinks = selectedCategory === "all" 
    ? links 
    : links.filter(link => link.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-card p-6 rounded-lg shadow-card">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Link Collection
        </h2>
        
        <div className="space-y-3 mb-4">
          <Input
            value={newLink.title}
            onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Link title..."
          />
          <Input
            value={newLink.url}
            onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
            placeholder="URL (https://...)..."
            type="url"
          />
          <div className="flex gap-2">
            <Input
              value={newLink.category}
              onChange={(e) => setNewLink(prev => ({ ...prev, category: e.target.value }))}
              placeholder="Category (optional)..."
              className="flex-1"
            />
            <Button onClick={addLink} className="bg-gradient-primary hover:shadow-glow transition-all">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="h-8"
            >
              All ({links.length})
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="h-8"
              >
                <Tag className="h-3 w-3 mr-1" />
                {category} ({links.filter(l => l.category === category).length})
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {filteredLinks.map((link) => (
          <Card key={link.id} className="p-4 bg-gradient-card shadow-card hover:shadow-glow transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{link.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{link.url}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {link.category}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(link.url, '_blank')}
                  className="text-primary hover:text-primary hover:bg-primary/10"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteLink(link.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        
        {filteredLinks.length === 0 && (
          <Card className="p-8 text-center bg-gradient-accent">
            <p className="text-muted-foreground">
              {selectedCategory === "all" 
                ? "No links saved yet. Add one above to get started!"
                : `No links in "${selectedCategory}" category.`
              }
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};