
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Brick Samples Gallery</h2>
        <Button onClick={() => setActiveView('camera')} className="flex items-center gap-2">
          <Camera size={18} />
          <span>Capture New Sample</span>
        </Button>
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
          <Camera size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Samples Yet</h3>
          <p className="text-gray-600 mb-4">Start by capturing your first brick sample.</p>
          <Button onClick={() => setActiveView('camera')}>
            Capture Sample
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div 
                className="aspect-video bg-cover bg-center cursor-pointer" 
                style={{ backgroundImage: `url(${photo.imageData})` }}
                onClick={() => handlePhotoClick(photo.id)}
              />
              
              <CardContent className="p-4">
                <h3 className="font-semibold truncate">{photo.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(photo.timestamp)}
                </p>
                
                {photo.location ? (
                  <Button
                    variant="outline"
                    className="mt-3 w-full"
                    onClick={() => handleOpenLocation(photo.location.latitude, photo.location.longitude)}
                  >
                    <MapPin size={16} className="mr-2" />
                    View Location
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground mt-3 text-center py-2 bg-gray-50 rounded">
                    Location not available
                  </p>
                )}
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

      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-4xl w-full p-0">
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
          <DialogContent>
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
