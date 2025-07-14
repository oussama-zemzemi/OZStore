import React from 'react';
import ProductGrid from '../../components/product/ProductGrid';
import Footer from '../../components/common/Footer';

const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to OZStore 🛒</h1>
      <ProductGrid />
    </div>
  );
};

export default HomePage;
