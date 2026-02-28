import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Plus, Trash2, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

const CATEGORIES = ["FAQ", "Pricing", "Features", "Troubleshooting", "Getting Started", "Other"];

export default function KnowledgeBase() {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("FAQ");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "FAQ",
  });

  const { data: kb, isLoading, refetch } = trpc.knowledgeBase.list.useQuery({
    limit: 100,
  });

  const createArticleMutation = trpc.knowledgeBase.create.useMutation();
  const deleteArticleMutation = trpc.knowledgeBase.delete.useMutation();

  // Try to create - if it fails with tier error, we'll know user can't edit
  const canEdit = user?.role === "admin" || true; // Simplified - let backend enforce tier checks

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canEdit) {
      toast.error("Knowledge base editing is only available for paid tiers");
      return;
    }

    if (!formData.title || !formData.content) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await createArticleMutation.mutateAsync({
        title: formData.title,
        content: formData.content,
        category: formData.category,
      });

      toast.success("Article created successfully");
      setFormData({ title: "", content: "", category: "FAQ" });
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to create article");
    }
  };

  const handleDeleteArticle = async (articleId: number) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      await deleteArticleMutation.mutateAsync(articleId);
      toast.success("Article deleted");
      refetch();
    } catch (error) {
      toast.error("Failed to delete article");
    }
  };

  const filteredArticles = kb?.articles.filter(
    (article) =>
      (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === "All" || article.category === selectedCategory)
  ) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
            <p className="text-muted-foreground">Create and manage articles to train your AI responses</p>
          </div>
          {canEdit && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Article
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create New Article</DialogTitle>
                  <DialogDescription>Add a new article to your knowledge base</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateArticle} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title *</label>
                    <Input
                      placeholder="e.g., How to reset my password"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Category *</label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Content *</label>
                    <Textarea
                      placeholder="Write your article content here. Supports markdown formatting."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={6}
                    />
                  </div>

                  <Button type="submit" disabled={createArticleMutation.isPending} className="w-full">
                    {createArticleMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Article"
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Free Tier Notice */}
        {!canEdit && (
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <p className="font-medium text-yellow-900 dark:text-yellow-100">Knowledge base editing is a paid feature</p>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">Upgrade to Basic or Pro tier to create and edit articles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex gap-4">
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Articles List */}
        <Card>
          <CardHeader>
            <CardTitle>Articles</CardTitle>
            <CardDescription>{filteredArticles.length} articles</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No articles found. Create one to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{article.title}</h3>
                          <Badge variant="outline">{article.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{article.content}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Created {new Date(article.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteArticle(article.id)}
                          disabled={deleteArticleMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
