"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Download,
  Link as LinkIcon,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  title: string;
  titleGu: string;
  description: string;
  type: "pdf" | "video" | "link" | "doc";
  subject: string;
  class: string;
  url: string;
  uploadedAt: string;
}

const demoResources: Resource[] = [
  {
    id: "1",
    title: "Quadratic Equations Notes",
    titleGu: "દ્વિઘાત સમીકરણોની નોંધો",
    description: "Complete notes on solving quadratic equations",
    type: "pdf",
    subject: "Mathematics",
    class: "Class 10",
    url: "#",
    uploadedAt: "આજે",
  },
  {
    id: "2",
    title: "Photosynthesis Video",
    titleGu: "પ્રકાશસંશ્લેષણ વિડિયો",
    description: "Animated explanation of photosynthesis process",
    type: "video",
    subject: "Science",
    class: "Class 9",
    url: "#",
    uploadedAt: "ગઈકાલે",
  },
];

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>(demoResources);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );

  const [newResource, setNewResource] = useState({
    title: "",
    titleGu: "",
    description: "",
    type: "pdf" as Resource["type"],
    subject: "",
    class: "",
    url: "",
  });

  const [editResource, setEditResource] = useState({
    title: "",
    titleGu: "",
    description: "",
    type: "pdf" as Resource["type"],
    subject: "",
    class: "",
    url: "",
  });

  const handleCreateResource = async () => {
    if (!newResource.title || !newResource.subject || !newResource.class) {
      alert("કૃપા કરીને બધી જરૂરી વિગતો ભરો");
      return;
    }

    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const resource: Resource = {
      id: Date.now().toString(),
      ...newResource,
      uploadedAt: "હમણાં જ",
    };

    setResources([resource, ...resources]);
    setShowCreateDialog(false);
    setIsCreating(false);
    setNewResource({
      title: "",
      titleGu: "",
      description: "",
      type: "pdf",
      subject: "",
      class: "",
      url: "",
    });
  };

  const handleEditClick = (resource: Resource) => {
    setSelectedResource(resource);
    setEditResource({
      title: resource.title,
      titleGu: resource.titleGu,
      description: resource.description,
      type: resource.type,
      subject: resource.subject,
      class: resource.class,
      url: resource.url,
    });
    setShowEditDialog(true);
  };

  const handleUpdateResource = async () => {
    if (!selectedResource || !editResource.title) {
      alert("કૃપા કરીને બધી જરૂરી વિગતો ભરો");
      return;
    }

    setIsEditing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setResources(
      resources.map((r) =>
        r.id === selectedResource.id ? { ...r, ...editResource } : r
      )
    );

    setShowEditDialog(false);
    setIsEditing(false);
    setSelectedResource(null);
  };

  const handleDeleteClick = (resource: Resource) => {
    setSelectedResource(resource);
    setShowDeleteDialog(true);
  };

  const handleDeleteResource = async () => {
    if (!selectedResource) return;

    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setResources(resources.filter((r) => r.id !== selectedResource.id));
    setShowDeleteDialog(false);
    setIsDeleting(false);
    setSelectedResource(null);
  };

  const getTypeIcon = (type: Resource["type"]) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5" />;
      case "video":
        return <BookOpen className="w-5 h-5" />;
      case "link":
        return <LinkIcon className="w-5 h-5" />;
      case "doc":
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: Resource["type"]) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-700";
      case "video":
        return "bg-purple-100 text-purple-700";
      case "link":
        return "bg-blue-100 text-blue-700";
      case "doc":
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
          <p className="text-gray-600 font-gujarati mt-1">શૈક્ષણિક સંસાધનો</p>
        </div>
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          નવો સંસાધન ઉમેરો
        </Button>
      </div>

      {resources.length === 0 ? (
        <Card className="p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">હજુ સુધી કોઈ સંસાધનો નથી</p>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            પ્રથમ સંસાધન ઉમેરો
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, idx) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        getTypeColor(resource.type)
                      )}
                    >
                      {getTypeIcon(resource.type)}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(resource)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(resource)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-3">
                    {resource.titleGu || resource.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {resource.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">વિષય:</span>
                      <span className="font-medium">{resource.subject}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">વર્ગ:</span>
                      <span className="font-medium">{resource.class}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">અપલોડ:</span>
                      <span className="font-medium">{resource.uploadedAt}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    ડાઉનલોડ કરો
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>નવો સંસાધન ઉમેરો</DialogTitle>
            <DialogDescription>શૈક્ષણિક સંસાધન અપલોડ કરો</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>શીર્ષક (English) *</Label>
                <Input
                  value={newResource.title}
                  onChange={(e) =>
                    setNewResource({ ...newResource, title: e.target.value })
                  }
                  placeholder="Quadratic Equations"
                />
              </div>
              <div className="space-y-2">
                <Label>શીર્ષક (ગુજરાતી)</Label>
                <Input
                  value={newResource.titleGu}
                  onChange={(e) =>
                    setNewResource({ ...newResource, titleGu: e.target.value })
                  }
                  placeholder="દ્વિઘાત સમીકરણો"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>વર્ણન</Label>
              <Textarea
                value={newResource.description}
                onChange={(e) =>
                  setNewResource({
                    ...newResource,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>પ્રકાર *</Label>
                <Select
                  value={newResource.type}
                  onValueChange={(value: Resource["type"]) =>
                    setNewResource({ ...newResource, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="doc">Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>વિષય *</Label>
                <Input
                  value={newResource.subject}
                  onChange={(e) =>
                    setNewResource({ ...newResource, subject: e.target.value })
                  }
                  placeholder="Mathematics"
                />
              </div>
              <div className="space-y-2">
                <Label>વર્ગ *</Label>
                <Input
                  value={newResource.class}
                  onChange={(e) =>
                    setNewResource({ ...newResource, class: e.target.value })
                  }
                  placeholder="Class 10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>URL/Link</Label>
              <Input
                value={newResource.url}
                onChange={(e) =>
                  setNewResource({ ...newResource, url: e.target.value })
                }
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
              disabled={isCreating}
            >
              રદ કરો
            </Button>
            <Button onClick={handleCreateResource} disabled={isCreating}>
              {isCreating ? "ઉમેરી રહ્યા છીએ..." : "સંસાધન ઉમેરો"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>સંસાધન સુધારો</DialogTitle>
            <DialogDescription>સંસાધનની વિગતો સુધારો</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>શીર્ષક (English) *</Label>
                <Input
                  value={editResource.title}
                  onChange={(e) =>
                    setEditResource({ ...editResource, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>શીર્ષક (ગુજરાતી)</Label>
                <Input
                  value={editResource.titleGu}
                  onChange={(e) =>
                    setEditResource({
                      ...editResource,
                      titleGu: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>વર્ણન</Label>
              <Textarea
                value={editResource.description}
                onChange={(e) =>
                  setEditResource({
                    ...editResource,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>પ્રકાર *</Label>
                <Select
                  value={editResource.type}
                  onValueChange={(value: Resource["type"]) =>
                    setEditResource({ ...editResource, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="doc">Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>વિષય *</Label>
                <Input
                  value={editResource.subject}
                  onChange={(e) =>
                    setEditResource({
                      ...editResource,
                      subject: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>વર્ગ *</Label>
                <Input
                  value={editResource.class}
                  onChange={(e) =>
                    setEditResource({ ...editResource, class: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>URL/Link</Label>
              <Input
                value={editResource.url}
                onChange={(e) =>
                  setEditResource({ ...editResource, url: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              disabled={isEditing}
            >
              રદ કરો
            </Button>
            <Button onClick={handleUpdateResource} disabled={isEditing}>
              {isEditing ? "સુધારી રહ્યા છીએ..." : "સંસાધન સુધારો"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteResource}
        title="સંસાધન કાઢી નાખો?"
        description={`શું તમે ખરેખર "${selectedResource?.title}" સંસાધન કાઢી નાખવા માંગો છો?`}
        confirmText={isDeleting ? "કાઢી રહ્યા છીએ..." : "હા, કાઢી નાખો"}
        cancelText="ના, રહેવા દો"
        variant="danger"
      />
    </div>
  );
}
