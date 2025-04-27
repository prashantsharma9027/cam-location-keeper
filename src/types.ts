export interface PhotoData {
  id: string;
  imageData: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  timestamp: number;
  title: string;
}

export interface AppContextType {
  photos: PhotoData[];
  addPhoto: (photo: PhotoData) => void;
  updatePhoto: (id: string, updatedPhoto: Partial<PhotoData>) => void;
  deletePhoto: (id: string) => void;
  activeView: 'camera' | 'gallery' | 'home';
  setActiveView: (view: 'camera' | 'gallery' | 'home') => void;
  cameraMode: 'home' | 'active';
  setCameraMode: (mode: 'home' | 'active') => void;
}
