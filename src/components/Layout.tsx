
import React from 'react';
import { usePhotoContext } from '@/context/PhotoContext';
import Camera from './Camera';
import Gallery from './Gallery';

const Layout: React.FC = () => {
  const { activeView } = usePhotoContext();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center">Brick Efflorescence Study</h1>
          <p className="text-center mt-2 text-blue-100">Effects of Chemical on Various Bricks</p>
          <p className="text-center text-sm text-blue-200 mt-1">P24CT010 - Prof. Dilip A. Patel</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {activeView === 'camera' ? <Camera /> : <Gallery />}
        </div>
      </main>

      <footer className="bg-gray-50 border-t py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>MTech: Construction Technology and Management</p>
          <p>Department of Civil Engineering</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
