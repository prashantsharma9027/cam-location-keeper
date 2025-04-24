
import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/sonner';

interface CameraOptions {
  facingMode?: 'user' | 'environment';
}

interface UseCamera {
  videoRef: React.RefObject<HTMLVideoElement>;
  photoRef: React.RefObject<HTMLCanvasElement>;
  startCamera: (options?: CameraOptions) => Promise<void>;
  stopCamera: () => void;
  capturePhoto: () => Promise<{ dataUrl: string; width: number; height: number } | null>;
  isLoading: boolean;
  error: string | null;
  isCameraActive: boolean;
}

export const useCamera = (): UseCamera => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = useCallback(async (options: CameraOptions = { facingMode: 'environment' }) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser doesn't support camera access");
      }

      // If there's an existing stream, stop it
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: options.facingMode,
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);

        // Ensure video is playing
        await videoRef.current.play();
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError(err instanceof Error ? err.message : 'Failed to access camera');
      toast.error('Failed to access camera. Please check permissions.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCameraActive(false);
  }, []);

  const capturePhoto = useCallback(async () => {
    if (!videoRef.current || !photoRef.current) {
      toast.error('Camera not ready');
      return null;
    }

    const video = videoRef.current;
    const canvas = photoRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      toast.error('Canvas context not available');
      return null;
    }

    // Set canvas size to match video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0);

    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/jpeg');

    return {
      dataUrl,
      width: canvas.width,
      height: canvas.height,
    };
  }, []);

  return {
    videoRef,
    photoRef,
    startCamera,
    stopCamera,
    capturePhoto,
    isLoading,
    error,
    isCameraActive,
  };
};
