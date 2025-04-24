
import React from 'react';
import { usePhotoContext } from '@/context/PhotoContext';
import Camera from './Camera';
import Gallery from './Gallery';

const Layout: React.FC = () => {
  const { activeView } = usePhotoContext();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-center">
          <h1 className="text-xl font-bold">Camera Location Keeper</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {activeView === 'camera' ? <Camera /> : <Gallery />}
      </main>
    </div>
  );
};

export default Layout;
