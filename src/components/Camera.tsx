
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCamera } from '@/hooks/useCamera';
import { useLocation } from '@/hooks/useLocation';
import { usePhotoContext } from '@/context/PhotoContext';
import { generateId } from '@/utils/helpers';
import { Camera, Image } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const CameraComponent: React.FC = () => {
  const { videoRef, photoRef, startCamera, stopCamera, capturePhoto, isLoading: cameraLoading, isCameraActive } = useCamera();
  const { getCurrentLocation, isLoading: locationLoading } = useLocation();
  const { addPhoto, setActiveView } = usePhotoContext();
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  useEffect(() => {
    // Start camera on component mount
    startCamera({ facingMode });
    
    // Clean up on component unmount
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera, facingMode]);

  const handleCapture = async () => {
    try {
      // Capture photo
      const photoData = await capturePhoto();
      if (!photoData) {
        return;
      }

      // Get location
      const location = await getCurrentLocation();
      if (!location) {
        toast.error('Unable to get your location. Please check permissions and try again.');
        return;
      }

      // Add to context
      addPhoto({
        id: generateId(),
        imageData: photoData.dataUrl,
        location,
        timestamp: Date.now(),
        title: `Photo ${new Date().toLocaleString()}`,
      });
    } catch (error) {
      console.error('Error capturing photo:', error);
      toast.error('Failed to capture photo. Please try again.');
    }
  };

  const toggleCamera = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
    startCamera({ facingMode: newMode });
  };

  const isLoading = cameraLoading || locationLoading;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
      <Card className="w-full overflow-hidden bg-black relative">
        <div className="relative w-full h-0 pb-[125%] bg-gray-900">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <canvas ref={photoRef} className="hidden" />
      </Card>

      <div className="mt-6 w-full flex flex-col items-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            className="rounded-full w-12 h-12 p-0"
            onClick={toggleCamera}
          >
            <Camera className="h-6 w-6" />
          </Button>
          
          <Button 
            onClick={handleCapture}
            disabled={!isCameraActive || isLoading}
            className="capture-button"
            aria-label="Take photo"
          />
          
          <Button
            variant="outline"
            className="rounded-full w-12 h-12 p-0"
            onClick={() => setActiveView('gallery')}
          >
            <Image className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CameraComponent;
