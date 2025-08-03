import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit3, Trash2, Plus, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  createdAt: Date;
  updatedAt: Date;
}

export const BlogCreator = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const { toast } = useToast();

  const generateExcerpt = (content: string) => {
    return content.slice(0, 150) + (content.length > 150 ? "..." : "");
  };

  const saveBlogPost = () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Missing content",
        description: "Please fill in both title and content.",
        variant: "destructive",
      });
      return;
    }

    const now = new Date();
    
    if (editingId) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === editingId 
          ? {
              ...post,
              title: formData.title,
              content: formData.content,
              excerpt: generateExcerpt(formData.content),
              updatedAt: now,
            }
          : post
      ));
      toast({
        title: "Post updated!",
        description: "Your blog post has been saved.",
      });
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: crypto.randomUUID(),
        title: formData.title,
        content: formData.content,
        excerpt: generateExcerpt(formData.content),
        createdAt: now,
        updatedAt: now,
      };
      setPosts([newPost, ...posts]);
      toast({
        title: "Post created!",
        description: "Your blog post has been published.",
      });
    }

    setFormData({ title: "", content: "" });
    setIsWriting(false);
    setEditingId(null);
  };

  const editPost = (post: BlogPost) => {
    setFormData({ title: post.title, content: post.content });
    setEditingId(post.id);
    setIsWriting(true);
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Post deleted",
      description: "Blog post removed from your collection.",
    });
  };

  const cancelEditing = () => {
    setFormData({ title: "", content: "" });
    setIsWriting(false);
    setEditingId(null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isWriting) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-card p-6 rounded-lg shadow-card">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {editingId ? "Edit Blog Post" : "Write New Post"}
          </h2>
          
          <div className="space-y-4">
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Post title..."
              className="text-lg font-medium"
            />
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Write your blog post content here..."
              className="min-h-[300px] resize-none"
            />
            <div className="flex gap-2">
              <Button 
                onClick={saveBlogPost}
                className="bg-gradient-primary hover:shadow-glow transition-all"
              >
                {editingId ? "Update Post" : "Publish Post"}
              </Button>
              <Button variant="outline" onClick={cancelEditing}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-card p-6 rounded-lg shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            My Blog Posts
          </h2>
          <Button 
            onClick={() => setIsWriting(true)}
            className="bg-gradient-primary hover:shadow-glow transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
        
        {posts.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
          </p>
        )}
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-6 bg-gradient-card shadow-card hover:shadow-glow transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold mb-2 truncate">{post.title}</h3>
                <p className="text-muted-foreground mb-3 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Created {formatDate(post.createdAt)}
                  </div>
                  {post.updatedAt.getTime() !== post.createdAt.getTime() && (
                    <Badge variant="outline" className="text-xs">
                      Updated {formatDate(post.updatedAt)}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editPost(post)}
                  className="text-primary hover:text-primary hover:bg-primary/10"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deletePost(post.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        
        {posts.length === 0 && (
          <Card className="p-8 text-center bg-gradient-accent">
            <p className="text-muted-foreground mb-4">No blog posts yet. Start writing your first post!</p>
            <Button 
              onClick={() => setIsWriting(true)}
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Write First Post
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};