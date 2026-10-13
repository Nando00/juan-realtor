"use client";

import { useState } from "react";
import { Icon } from "./icons";

const photoDescriptions: Record<string, string> = {
  "IMG_1184.JPEG":
    "Cream and brick home with a front lawn and three-car garage",
  "IMG_1185.JPEG":
    "Bright open living area with wood flooring and a white kitchen",
  "IMG_1186.JPEG":
    "White kitchen with a gray island and windows looking onto trees",
  "IMG_1187.JPEG":
    "Aerial view of a stone home surrounded by a green lawn and trees",
  "IMG_1188.JPEG":
    "Aerial view of a spacious residential area with wooded lots",
  "IMG_1189.JPEG":
    "Open-plan living room with white sofas and a kitchen island",
  "IMG_1190.JPEG":
    "Dark-sided home with a landscaped front yard and mature trees",
  "IMG_1191.JPEG": "Warm white kitchen with pendant lights and a large island",
  "IMG_1192.JPEG":
    "Bathroom with a freestanding tub, double vanity, and natural light",
  "IMG_1193.JPEG":
    "Overhead view of a home with a long driveway and generous lawn",
  "IMG_1194.JPEG": "Home with glowing windows beneath a colorful evening sky",
  "IMG_1195.JPEG": "White kitchen with a breakfast island and dark bar stools",
  "IMG_1196.JPEG":
    "Living room with a fireplace, exposed ceiling beam, and sectional sofa",
};

function describePhoto(image: string) {
  return photoDescriptions[image.split("/").pop() ?? ""] ?? "Home photograph";
}

export function PhotoGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentImage = images[activeIndex];

  function movePhoto(direction: number) {
    setActiveIndex(
      (current) => (current + direction + images.length) % images.length,
    );
  }

  return (
    <section className="photo-gallery" aria-label={`${title} photo gallery`}>
      <div className="gallery-main">
        <img
          className="gallery-image"
          src={currentImage}
          alt={describePhoto(currentImage)}
        />
        <button
          className="gallery-arrow gallery-previous"
          onClick={() => movePhoto(-1)}
          aria-label="Previous photo"
        >
          <Icon name="arrow" size={19} />
        </button>
        <button
          className="gallery-arrow gallery-next"
          onClick={() => movePhoto(1)}
          aria-label="Next photo"
        >
          <Icon name="arrow" size={19} />
        </button>
        <span className="gallery-counter" aria-live="polite">
          {activeIndex + 1} / {images.length}
        </span>
      </div>
      <div className="gallery-thumbnails" aria-label="Choose a photo">
        {images.map((image, index) => (
          <button
            key={image}
            className={activeIndex === index ? "active" : ""}
            onClick={() => setActiveIndex(index)}
            aria-label={`View photo ${index + 1}: ${describePhoto(image)}`}
            aria-pressed={activeIndex === index}
          >
            <img src={image} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </section>
  );
}
