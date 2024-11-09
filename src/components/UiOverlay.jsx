import React from "react";

const UiOverlay = ({
  currentMediaItem,
  showProducts,
  handleViewProducts,
  handleProductClick,
}) => {
  return (
    <div className="ui-overlay">
      <div className="top-bar">
        <button
          className="icon-button"
          onClick={() => window.history.back()}
          aria-label="Back"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="top-bar-title">Products</div>
      </div>

      {currentMediaItem &&
        currentMediaItem?.products?.map((product) => (
          <button
            key={product.id}
            className="product-dot"
            style={{
              left: `${product.position.x}%`,
              top: `${product.position.y}%`,
            }}
            onClick={() => handleProductClick()}
            aria-label={`View ${product.name}`}
          />
        ))}

      <div className="bottom-bar">
        <div className="action-buttons">
          <button className="view-products-button" onClick={handleViewProducts}>
            {showProducts ? "Hide Products" : "View Products"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UiOverlay;
