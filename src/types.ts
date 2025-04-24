
export interface PhotoData {
  id: string;
  imageData: string;
  location: {
    latitude: number;
    longitude: number;
  };
  timestamp: number;
  title: string;
}

export interface AppContextType {
  photos: PhotoData[];
  addPhoto: (photo: PhotoData) => void;
  updatePhoto: (id: string, updatedPhoto: Partial<PhotoData>) => void;
  deletePhoto: (id: string) => void;
  activeView: 'camera' | 'gallery';
  setActiveView: (view: 'camera' | 'gallery') => void;
}
