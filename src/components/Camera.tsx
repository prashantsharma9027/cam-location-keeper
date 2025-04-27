import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCamera } from '@/hooks/useCamera';
import { useLocation } from '@/hooks/useLocation';
import { usePhotoContext } from '@/context/PhotoContext';
import { generateId } from '@/utils/helpers';
import { Camera, Image, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import HomeScreen from './HomeScreen';

const CameraComponent: React.FC = () => {
  const { videoRef, photoRef, startCamera, stopCamera, capturePhoto, isLoading: cameraLoading, isCameraActive } = useCamera();
  const { getCurrentLocation, isLoading: locationLoading } = useLocation();
  const { addPhoto, setActiveView, cameraMode, setCameraMode } = usePhotoContext();
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  useEffect(() => {
    // Only start camera if in active recording mode
    if (cameraMode === 'active') {
      startCamera({ facingMode });
      return () => {
        stopCamera();
      };
    }
  }, [startCamera, stopCamera, facingMode, cameraMode]);

  const handleCapture = async () => {
    try {
      const photoData = await capturePhoto();
      if (!photoData) {
        return;
      }

      // Try to get location, but don't block if unavailable
      const location = await getCurrentLocation().catch(() => null);

      // Add photo with or without location
      addPhoto({
        id: generateId(),
        imageData: photoData.dataUrl,
        location: location || null,
        timestamp: Date.now(),
        title: `Brick Sample ${new Date().toLocaleString()}`,
      });

      // Show appropriate toast message
      if (!location) {
        toast.warning('Photo saved without location data');
      } else {
        toast.success('Photo captured with location');
      }

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

  // If camera mode is not active, show HomeScreen
  if (cameraMode !== 'active') {
    return <HomeScreen />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-6 px-4 sm:px-6">
      <div className="w-full flex items-center justify-between mb-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center"
          onClick={() => {
            setCameraMode('home');
            stopCamera();
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Back</span>
        </Button>
        <h2 className="text-xl sm:text-2xl font-semibold text-center flex-1">Capture Brick Sample</h2>
        <div className="w-[60px]"></div> {/* Spacer to balance the layout */}
      </div>

      <p className="text-muted-foreground text-center text-sm sm:text-base">
        Position the brick sample in frame and ensure good lighting
      </p>

      <Card className="w-full overflow-hidden bg-black relative">
        <div className="relative w-full h-0 pb-[125%] sm:pb-[100%] bg-gray-900">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <canvas ref={photoRef} className="hidden" />
      </Card>

      <div className="w-full flex flex-col items-center space-y-4">
        <div className="flex items-center justify-center space-x-6">
          <Button
            variant="outline"
            className="rounded-full w-12 h-12 p-0"
            onClick={toggleCamera}
            title="Switch camera"
          >
            <Camera className="h-6 w-6" />
          </Button>
          
          <Button 
            onClick={handleCapture}
            disabled={!isCameraActive || isLoading}
            className="capture-button rounded-full bg-primary text-white w-16 h-16 p-0 hover:bg-primary/90"
            aria-label="Take photo"
          >
            <div className="w-12 h-12 rounded-full border-2 border-white"></div>
          </Button>
          
          <Button
            variant="outline"
            className="rounded-full w-12 h-12 p-0"
            onClick={() => setActiveView('gallery')}
            title="View gallery"
          >
            <Image className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CameraComponent;
