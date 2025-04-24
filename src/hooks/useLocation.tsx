
import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/sonner';

interface LocationData {
  latitude: number;
  longitude: number;
}

interface UseLocation {
  getCurrentLocation: () => Promise<LocationData | null>;
  isLoading: boolean;
  error: string | null;
}

export const useLocation = (): UseLocation => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = useCallback(async (): Promise<LocationData | null> => {
    if (!navigator.geolocation) {
      toast.error("Your browser doesn't support geolocation");
      setError("Your browser doesn't support geolocation");
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (err) {
      console.error('Error getting location:', err);
      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to get your location';
        
      setError(errorMessage);
      toast.error('Failed to get location. Please check permissions.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getCurrentLocation, isLoading, error };
};
