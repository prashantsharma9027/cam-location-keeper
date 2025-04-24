
import React from 'react';
import { PhotoProvider } from '@/context/PhotoContext';
import Layout from '@/components/Layout';

const Index = () => {
  return (
    <PhotoProvider>
      <Layout />
    </PhotoProvider>
  );
};

export default Index;
