import React from "react";

const ShowProductCard = ({ currentMediaItem, handleProductClick }) => {
  return (
    <div className="product-cards">
      <div className="product-cards-container">
        {currentMediaItem?.products?.map((product) => (
          <div
            key={product?.id}
            className="product-card"
            onClick={handleProductClick}
          >
            <p>{product.name}</p>
            <p>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProductCard;
