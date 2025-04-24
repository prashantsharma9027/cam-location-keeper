
import React, { useState } from 'react';
import { Camera, MapPin, Trash2, Edit } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePhotoContext } from '@/context/PhotoContext';
import { formatDate, getGoogleMapsUrl } from '@/utils/helpers';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

const Gallery: React.FC = () => {
  const { photos, deletePhoto, updatePhoto, setActiveView } = usePhotoContext();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // Handle photo click to view full image
  const handlePhotoClick = (id: string) => {
    setSelectedPhoto(id);
  };

  // Handle photo edit click
  const handleEditClick = (id: string, currentTitle: string) => {
    setEditingPhoto(id);
    setEditTitle(currentTitle);
  };

  // Handle photo update
  const handleUpdatePhoto = () => {
    if (editingPhoto) {
      updatePhoto(editingPhoto, { title: editTitle });
      setEditingPhoto(null);
    }
  };

  // Handle open location in Google Maps
  const handleOpenLocation = (latitude: number, longitude: number) => {
    window.open(getGoogleMapsUrl(latitude, longitude), '_blank');
  };

  // Return to camera view
  const handleReturnToCamera = () => {
    setActiveView('camera');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Photo Gallery</h1>
        <Button onClick={handleReturnToCamera} className="flex items-center gap-2">
          <Camera size={18} />
          <span>Camera</span>
        </Button>
      </div>

      {photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted rounded-full p-6 mb-4">
            <Camera size={48} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No photos yet</h2>
          <p className="text-muted-foreground mb-4">
            Capture your first photo with location by using the camera.
          </p>
          <Button onClick={handleReturnToCamera}>
            Open Camera
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <div 
                className="w-full h-48 bg-cover bg-center cursor-pointer" 
                style={{ backgroundImage: `url(${photo.imageData})` }}
                onClick={() => handlePhotoClick(photo.id)}
              />
              
              <CardContent className="p-4">
                <h3 className="font-medium truncate">{photo.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {formatDate(photo.timestamp)}
                </p>
                
                <div 
                  className="preview-map mt-2 mb-2 cursor-pointer border flex items-center justify-center"
                  onClick={() => handleOpenLocation(photo.location.latitude, photo.location.longitude)}
                >
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin size={18} />
                    <span className="text-sm">
                      {photo.location.latitude.toFixed(6)}, {photo.location.longitude.toFixed(6)}
                    </span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="px-4 py-3 border-t flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditClick(photo.id, photo.title)}
                >
                  <Edit size={16} className="mr-1" /> Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => deletePhoto(photo.id)}
                >
                  <Trash2 size={16} className="mr-1" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Full Image Dialog */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-3xl w-full p-0 overflow-hidden">
            <ScrollArea className="max-h-[80vh]">
              <img 
                src={photos.find(p => p.id === selectedPhoto)?.imageData} 
                alt="Full size" 
                className="w-full h-auto"
              />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Dialog */}
      {editingPhoto && (
        <Dialog open={!!editingPhoto} onOpenChange={() => setEditingPhoto(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Photo Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setEditingPhoto(null)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleUpdatePhoto}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Gallery;
