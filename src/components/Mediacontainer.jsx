import React from "react";

const Mediacontainer = ({
  isVideo,
  videoRef,
  currentMediaItem,
  handleNextMedia,
  isMuted,
}) => {
  return (
    <div className="media-container">
      {isVideo ? (
        <video
          ref={videoRef}
          src={currentMediaItem.url}
          className="media-content"
          muted={isMuted}
          playsInline
          onEnded={handleNextMedia}
          aria-label="Product video"
        />
      ) : (
        <img
          src={currentMediaItem?.url}
          alt="Product look"
          className="media-content"
        />
      )}
    </div>
  );
};

export default Mediacontainer;
