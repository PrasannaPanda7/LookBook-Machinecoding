import React from "react";

const NavButtons = ({ handlePreviousMedia, handleNextMedia }) => {
  return (
    <div className="media-nav-buttons">
      <button
        onClick={handlePreviousMedia}
        aria-label="Previous media"
        className="nav-button"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button
        onClick={handleNextMedia}
        aria-label="Next media"
        className="nav-button"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M10 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  );
};

export default NavButtons;
