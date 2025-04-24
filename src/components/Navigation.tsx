
import { Camera, Image } from "lucide-react";
import { Button } from "./ui/button";
import { usePhotoContext } from "@/context/PhotoContext";

export const Navigation = () => {
  const { activeView, setActiveView } = usePhotoContext();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant={activeView === 'camera' ? 'default' : 'outline'}
              onClick={() => setActiveView('camera')}
              className="flex items-center gap-2"
            >
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Capture Sample</span>
            </Button>
            <Button
              variant={activeView === 'gallery' ? 'default' : 'outline'}
              onClick={() => setActiveView('gallery')}
              className="flex items-center gap-2"
            >
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">View Samples</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
