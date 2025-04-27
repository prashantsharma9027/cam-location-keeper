import React from 'react';
import { Image, Home } from "lucide-react";
import { Button } from "./ui/button";
import { usePhotoContext } from "@/context/PhotoContext";

export const Navigation: React.FC = () => {
  const { activeView, setActiveView, setCameraMode } = usePhotoContext();

  const handleHomeClick = () => {
    setActiveView('home');
  };

  // const handleCameraClick = () => {
  //   setActiveView('camera');
  //   setCameraMode('active');
  // };

  const handleGalleryClick = () => {
    setActiveView('gallery');
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-center gap-3">
          <Button
            variant={activeView === 'home' ? 'default' : 'outline'}
            size="sm"
            className="flex items-center transition-all"
            onClick={handleHomeClick}
          >
            <Home className="h-4 w-4 mr-2" />
            <span>Home</span>
          </Button>
          
          {/* <Button
            variant={activeView === 'camera' ? 'default' : 'outline'}
            size="sm"
            className="flex items-center transition-all"
            onClick={handleCameraClick}
          >
            <Camera className="h-4 w-4 mr-2" />
            <span>Camera</span>
          </Button> */}

          <Button
            variant={activeView === 'gallery' ? 'default' : 'outline'}
            size="sm"
            className="flex items-center transition-all"
            onClick={handleGalleryClick}
          >
            <Image className="h-4 w-4 mr-2" />
            <span>Gallery</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
