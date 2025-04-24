
import React from 'react';
import { usePhotoContext } from '@/context/PhotoContext';
import Camera from './Camera';
import Gallery from './Gallery';
import { Navigation } from './Navigation';

const Layout: React.FC = () => {
  const { activeView } = usePhotoContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Brick Efflorescence Study</h1>
            <p className="text-lg text-blue-100">Effects of Chemical on Various Bricks</p>
            <div className="text-sm text-blue-200 space-y-1">
              <p>P24CT010 - Vivek Patel</p>
              <p>Prof. Dilip A. Patel</p>
              <p className="text-xs">Department of Civil Engineering</p>
              <p className="text-xs">MTech: Construction Technology and Management</p>
            </div>
          </div>
        </div>
      </header>

      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {activeView === 'gallery' ? <Gallery /> : <Camera />}
        </div>
      </main>

      <footer className="bg-white border-t py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-gray-600 space-y-1">
            <p>Date of Presentation: 12-03-25</p>
            <p>MTech: Construction Technology and Management</p>
            <p>Department of Civil Engineering</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
