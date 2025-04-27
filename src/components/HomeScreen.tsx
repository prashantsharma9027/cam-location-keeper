import React, { useState } from 'react';
import { usePhotoContext } from '@/context/PhotoContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, BookOpen, Database } from 'lucide-react';

interface EfflorescenceType {
  type: string;
  causes: string;
  appearance: string;
}

const EFFLORESCENCE_TYPES: EfflorescenceType[] = [
  {
    type: "Primary Efflorescence",
    causes: "Excess water during curing; high salt content in raw materials.",
    appearance: "Uniform white deposits."
  },
  {
    type: "Secondary Efflorescence",
    causes: "External moisture (rain, groundwater); poor construction practices.",
    appearance: "Irregular white patches or streaks."
  },
  {
    type: "White Efflorescence",
    causes: "Calcium, sodium, or potassium salts.",
    appearance: "Fine, powder white deposits."
  },
  {
    type: "Green Efflorescence",
    causes: "Copper salts.",
    appearance: "Greenish or Bluish deposits."
  },
  {
    type: "Brown/Yellow Efflorescence",
    causes: "Iron salts.",
    appearance: "Brownish or yellowish deposits."
  },
  {
    type: "Crypto florescence",
    causes: "Salts crystallize within brick pores.",
    appearance: "Invisible; causes spalling."
  },
  {
    type: "Vanishing Efflorescence",
    causes: "Highly soluble salts; mild environmental conditions.",
    appearance: "Light, powdery deposits that fade."
  }
];

const HomeScreen: React.FC = () => {
  const { setActiveView, setCameraMode } = usePhotoContext();
  const [scienceModalOpen, setScienceModalOpen] = useState(false);
  const [typesModalOpen, setTypesModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<EfflorescenceType | null>(null);

  const handleOpenCamera = () => {
    setActiveView('camera');
    setCameraMode('active');
  };

  return (
    <div className="space-y-8 px-4 sm:px-6">
      <Card className="p-4 sm:p-6 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Brick Efflorescence Study</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Button 
            onClick={() => setScienceModalOpen(true)} 
            className="h-auto py-4 sm:py-6 flex flex-col items-center space-y-2 sm:space-y-3"
            variant="outline"
          >
            <BookOpen size={24} />
            <div className="text-center">
              <p className="font-semibold">Science Behind Efflorescence</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Learn about the process</p>
            </div>
          </Button>
          
          <Button 
            onClick={() => setTypesModalOpen(true)} 
            className="h-auto py-4 sm:py-6 flex flex-col items-center space-y-2 sm:space-y-3"
            variant="outline"
          >
            <Database size={24} />
            <div className="text-center">
              <p className="font-semibold">Types of Efflorescence</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Explore classifications</p>
            </div>
          </Button>
          
          <Button 
            onClick={handleOpenCamera} 
            className="h-auto py-4 sm:py-6 flex flex-col items-center space-y-2 sm:space-y-3 sm:col-span-2 lg:col-span-1"
            variant="default"
          >
            <Camera size={24} />
            <div className="text-center">
              <p className="font-semibold">Capture Sample</p>
              <p className="text-xs sm:text-sm">Take a photo with location</p>
            </div>
          </Button>
        </div>
      </Card>
      
      {/* Science Behind Efflorescence Modal */}
      <Dialog open={scienceModalOpen} onOpenChange={setScienceModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold">Science Behind Efflorescence</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 py-4">
            <div className="space-y-2">
              <div className="flex items-start space-x-4">
                <div className="min-w-6 mt-1">a.</div>
                <div>
                  <p className="font-medium">Water absorption in porous bricks</p>
                  <img src="/a.png" alt="Water absorption" className="mt-2 rounded-md w-full" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start space-x-4">
                <div className="min-w-6 mt-1">b.</div>
                <div>
                  <p className="font-medium">Dissolution of soluble salts</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">(e.g., calcium sulfate, sodium sulfate)</p>
                  <img src="/b.png" alt="Dissolution of salts" className="mt-2 rounded-md w-full" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start space-x-4">
                <div className="min-w-6 mt-1">c.</div>
                <div>
                  <p className="font-medium">Salt migration through capillary action</p>
                  <img src="/c.png" alt="Salt migration" className="mt-2 rounded-md w-full" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start space-x-4">
                <div className="min-w-6 mt-1">d.</div>
                <div>
                  <p className="font-medium">Crystallization on the surface after evaporation</p>
                  <img src="/d.png" alt="Crystallization" className="mt-2 rounded-md w-full" />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Types of Efflorescence Modal */}
      <Dialog open={typesModalOpen} onOpenChange={(open) => {
        setTypesModalOpen(open);
        if (!open) setSelectedType(null);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold">
              {selectedType ? selectedType.type : "Types of Efflorescence"}
            </DialogTitle>
          </DialogHeader>
          
          {!selectedType ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
              {EFFLORESCENCE_TYPES.map((type) => (
                <Button
                  key={type.type}
                  variant="outline"
                  className="h-auto py-3 sm:py-4 px-2 sm:px-3 text-center justify-center"
                  onClick={() => setSelectedType(type)}
                >
                  <span className="text-sm sm:text-base">{type.type}</span>
                </Button>
              ))}
            </div>
          ) : (
            <div className="py-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-orange-600">Causes</h3>
                  <p className="text-sm sm:text-base">{selectedType.causes}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-orange-600">Appearance</h3>
                  <p className="text-sm sm:text-base">{selectedType.appearance}</p>
                </div>
              </div>
              
              <Button
                onClick={() => setSelectedType(null)}
                variant="outline"
                className="w-full"
              >
                Back to All Types
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeScreen;
