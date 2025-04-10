import React from 'react';

interface ProductImage {
  id: number;
  url: string;
}

const ProductGrid = () => {
  // Create 24 images (6x4 grid)
  const productImages: ProductImage[] = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=120'
  }));

  // Split images into rows
  const rows = Array.from({ length: 4 }, (_, i) => 
    productImages.slice(i * 6, (i + 1) * 6)
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg px-4 py-3 relative">
      <div className="grid gap-1 opacity-10">
        {rows.map((row, rowIndex) => {
          // Create a new array and reverse it for even-numbered rows
          const rowImages = rowIndex % 2 === 0 ? [...row].reverse() : row;
          
          return (
            <div 
              key={rowIndex}
              className="grid grid-cols-6 gap-1"
            >
              {rowImages.map((image) => (
                <div 
                  key={image.id} 
                  className="aspect-square rounded-sm overflow-hidden bg-gray-100"
                  style={{ width: '60px', height: '60px' }}
                >
                  <img
                    src={image.url}
                    alt={`Product ${image.id}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-full shadow-md px-3 py-1.5 flex items-center gap-2 whitespace-nowrap">
        <img src="https://ph-static.imgix.net/ph-logo-2.png" alt="Product Hunt" className="h-4" />
        <span className="text-gray-900 text-sm font-medium">Trusted by 1000+ Product Hunt launchers</span>
      </div>
    </div>
  );
};

export default ProductGrid;