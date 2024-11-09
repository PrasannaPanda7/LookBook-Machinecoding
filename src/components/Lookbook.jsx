import { useEffect, useRef, useState } from "react";
import { looks } from "../assets/dummyData";
import Mediacontainer from "./Mediacontainer";
import UiOverlay from "./UiOverlay";
import ShowProductCard from "./ShowProductCard";
import NavButtons from "./NavButtons";

export default function Lookbook() {
  const [currentLook, setCurrentLook] = useState(0);
  const [currentMedia, setCurrentMedia] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [showProducts, setShowProducts] = useState(false);
  const progressInterval = useRef(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const currentLookData = looks[currentLook] || looks[0];
  const currentMediaItem = currentLookData?.media[currentMedia];
  const isVideo = currentMediaItem?.type === "video";

  const randomUrls = [
    "https://example.com/product1",
    "https://example.com/product2",
    "https://example.com/product3",
  ];

  const handleViewProducts = (e) => {
    e.stopPropagation();
    setShowProducts((prev) => !prev);
  };

  const handleProductClick = () => {
    const randomUrl = randomUrls[Math.floor(Math.random() * randomUrls.length)];
    window.open(randomUrl, "_blank");
  };

  useEffect(() => {
    if (isVideo) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    } else {
      clearInterval(progressInterval.current);
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNextMedia();
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentMedia, currentLook]);

  const handleNextMedia = () => {
    if (currentMedia < currentLookData?.media?.length - 1) {
      setCurrentMedia(currentMedia + 1);
    } else if (currentLook < looks.length - 1) {
      setCurrentLook(currentLook + 1);
      setCurrentMedia(0);
    }
    setProgress(0);
  };

  const handlePreviousMedia = () => {
    if (currentMedia > 0) {
      setCurrentMedia(currentMedia - 1);
    } else if (currentLook > 0) {
      setCurrentLook(currentLook - 1);
      setCurrentMedia(looks[currentLook - 1].media.length - 1);
    }
    setProgress(0);
  };
  return (
    <div
      className="lookbook-container"
      ref={containerRef}
      onTouchStart={(e) =>
        setTouchStart({
          x: e?.touches?.[0].clientX || e?.clientX,
          y: e?.touches?.[0].clientY || e?.clientYs,
        })
      }
      onTouchEnd={(e) => {
        const deltaX = e.changedTouches?.[0].clientX - touchStart.x;
        const deltaY = e.changedTouches?.[0].clientY - touchStart.y;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          deltaX > 50 ? handlePreviousMedia() : handleNextMedia();
        } else {
          deltaY > 50
            ? setCurrentLook(currentLook - 1)
            : setCurrentLook(currentLook + 1);
        }
      }}
    >
      <Mediacontainer
        isVideo={isVideo}
        isMuted={isMuted}
        videoRef={videoRef}
        currentMediaItem={currentMediaItem}
        handleNextMedia={handleNextMedia}
      />

      <UiOverlay
        currentMediaItem={currentMediaItem}
        showProducts={showProducts}
        handleViewProducts={handleViewProducts}
        handleProductClick={handleProductClick}
      />

      {showProducts && (
        <ShowProductCard
          handleProductClick={handleProductClick}
          currentMediaItem={currentMediaItem}
        />
      )}

      {currentLookData?.media?.length > 1 && (
        <NavButtons
          handleNextMedia={handleNextMedia}
          handlePreviousMedia={handlePreviousMedia}
        />
      )}
    </div>
  );
}
