
import React from 'react';
import { usePhotoContext } from '@/context/PhotoContext';
import Camera from './Camera';
import Gallery from './Gallery';
import { Navigation } from './Navigation';

const Layout: React.FC = () => {
  const { activeView } = usePhotoContext();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1.22676%200C1.91374%200%202.45351%200.539773%202.45351%201.22676C2.45351%201.91374%201.91374%202.45351%201.22676%202.45351C0.539773%202.45351%200%201.91374%200%201.22676C0%200.539773%200.539773%200%201.22676%200Z%22%20fill%3D%22rgba(255%2C255%2C255%2C0.07)%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')] opacity-20" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="inline-block px-4 py-1.5 rounded-full text-blue-100 text-sm font-medium bg-white/10 backdrop-blur-sm mb-2">
                Mini Project CECT-108
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Brick Efflorescence Study
              </h1>
              <p className="text-xl text-blue-100">Effects of Chemical on Various Bricks</p>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-semibold">Research Scholar</p>
                  <p className="text-blue-100">Vivek Patel (P24CT010)</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-semibold">Faculty Coordinator</p>
                  <p className="text-blue-100">Prof. Dilip A. Patel</p>
                </div>
              </div>
              
              <div className="pt-4 text-sm text-blue-200 space-y-1">
                <p className="text-xs">Department of Civil Engineering</p>
                <p className="text-xs">MTech: Construction Technology and Management</p>
              </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-gray-600">
            <div className="space-y-1">
              <p className="font-medium">Presentation Date</p>
              <p>12-03-25</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Department</p>
              <p>Civil Engineering</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Program</p>
              <p>MTech: Construction Technology and Management</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
