/* eslint-disable no-unused-vars */
import React from "react";

const Carousel = ({ Element, Items }) => {
  const circularItems = [...Items, ...Items, ...Items];
  return (
    <div>
      <div className="carousel">
        <div className="group">
          {circularItems.map((item, index) => (
            <Element key={index} props={item} />
          ))}
        </div>
        <style>
          {`
    .carousel {
      margin: 0 auto;
      padding: 30px 0;
      max-width: 100vh;
      overflow:hidden ;
      display: flex;
    }

    .carousel > * {
      flex: 0 0 100%;
    }

    .group {
      display: flex;
      gap: 30px;
      padding-right: 20px;
      will-change: transform;
      animation: scrolling 100s linear infinite;
    }

    @keyframes scrolling {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }

    .carousel:hover .group {
      animation-play-state: paused;
    }
  `}
        </style>
      </div>
    </div>
  );
};

export default Carousel;
