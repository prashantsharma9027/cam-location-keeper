
import React, { createContext, useState, useContext, useEffect } from 'react';
import { AppContextType, PhotoData } from '../types';
import { toast } from '../components/ui/sonner';

const initialState: AppContextType = {
  photos: [],
  addPhoto: () => {},
  updatePhoto: () => {},
  deletePhoto: () => {},
  activeView: 'camera',
  setActiveView: () => {},
};

const PhotoContext = createContext<AppContextType>(initialState);

export const usePhotoContext = () => useContext(PhotoContext);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [activeView, setActiveView] = useState<'camera' | 'gallery'>('camera');

  // Load photos from localStorage on initial render
  useEffect(() => {
    const savedPhotos = localStorage.getItem('cameraLocationPhotos');
    if (savedPhotos) {
      try {
        setPhotos(JSON.parse(savedPhotos));
      } catch (error) {
        console.error('Failed to parse saved photos', error);
      }
    }
  }, []);

  // Save photos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cameraLocationPhotos', JSON.stringify(photos));
  }, [photos]);

  const addPhoto = (photo: PhotoData) => {
    setPhotos((prev) => [photo, ...prev]);
    toast('Photo captured successfully!');
  };

  const updatePhoto = (id: string, updatedPhoto: Partial<PhotoData>) => {
    setPhotos((prev) => 
      prev.map((photo) => 
        photo.id === id ? { ...photo, ...updatedPhoto } : photo
      )
    );
    toast('Photo updated successfully!');
  };

  const deletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    toast('Photo deleted successfully!');
  };

  return (
    <PhotoContext.Provider 
      value={{ 
        photos, 
        addPhoto, 
        updatePhoto, 
        deletePhoto,
        activeView,
        setActiveView
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
