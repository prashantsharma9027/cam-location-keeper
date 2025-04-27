import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Trash2, Edit, Download } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePhotoContext } from '@/context/PhotoContext';
import { formatDate, getGoogleMapsUrl } from '@/utils/helpers';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

const Gallery: React.FC = () => {
  const { photos, deletePhoto, updatePhoto, setActiveView, setCameraMode } = usePhotoContext();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);

  const handlePhotoClick = (id: string) => {
    setSelectedPhoto(id);
  };

  const handleEditClick = (id: string, currentTitle: string) => {
    setEditingPhoto(id);
    setEditTitle(currentTitle);
  };

  const handleUpdatePhoto = () => {
    if (editingPhoto) {
      updatePhoto(editingPhoto, { title: editTitle });
      setEditingPhoto(null);
    }
  };

  const handleOpenLocation = (latitude: number, longitude: number) => {
    window.open(getGoogleMapsUrl(latitude, longitude), '_blank');
  };

  const handleCaptureClick = () => {
    setActiveView('camera');
    setCameraMode('active');
  };

  return (
    <div className="space-y-6 px-4 sm:px-6">
     
      {photos.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-white rounded-lg border-2 border-dashed">
          <Camera size={36} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold mb-2">No Brick Samples Yet</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto px-4">
            Start by capturing photos of brick samples to document the effects of chemical treatments and efflorescence patterns.
          </p>
          <div className="flex justify-center">
            <Button onClick={handleCaptureClick} className="flex items-center gap-2">
              <Camera size={16} className="hidden sm:block" />
              <span>Capture First Sample</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div 
                className="aspect-video bg-cover bg-center cursor-pointer" 
                style={{ backgroundImage: `url(${photo.imageData})` }}
                onClick={() => handlePhotoClick(photo.id)}
              />
              
              
              <CardContent className="p-3 sm:p-4">
                <h3 className="font-semibold truncate text-sm sm:text-base">{photo.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {formatDate(photo.timestamp)}
                </p>
                
                {photo.location ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full text-xs sm:text-sm"
                    onClick={() => handleOpenLocation(photo.location.latitude, photo.location.longitude)}
                  >
                    <MapPin size={14} className="mr-2" />
                    View Location
                  </Button>
                ) : (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-3 text-center py-2 bg-gray-50 rounded">
                    Location not available
                  </p>
                )}
              </CardContent>
              
              <CardFooter className="px-3 sm:px-4 py-2 sm:py-3 border-t flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                  onClick={() => handleEditClick(photo.id, photo.title)}
                >
                  <Edit size={14} className="mr-1" /> <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="text-xs"
                  onClick={() => deletePhoto(photo.id)}
                >
                  <Trash2 size={14} className="mr-1" /> <span className="hidden sm:inline">Delete</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-4xl w-[95vw] p-0">
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

      {editingPhoto && (
        <Dialog open={!!editingPhoto} onOpenChange={() => setEditingPhoto(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Sample Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Sample Description</Label>
                <Input
                  id="title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="e.g., Clay Brick Sample - Day 7"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setEditingPhoto(null)} variant="outline" size="sm">
                Cancel
              </Button>
              <Button onClick={handleUpdatePhoto} size="sm">
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
