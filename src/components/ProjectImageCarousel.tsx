"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";

function altFromSrc(src: string) {
  const filename = src.split("/").pop() ?? "";
  const name = filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function ProjectImageCarousel({
  images,
  className = "",
  aspect = "aspect-4/3",
}: {
  images: readonly string[];
  className?: string;
  aspect?: string;
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = (i: number) =>
    setIndex(((i % images.length) + images.length) % images.length);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className={`relative touch-pan-y ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images[index].startsWith("/") ? (
        <div className={`relative w-full ${aspect} overflow-hidden bg-zinc-100`}>
          <Image
            src={images[index]}
            alt={altFromSrc(images[index])}
            fill
            className="object-contain"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      ) : (
        <ImagePlaceholder aspect={aspect} label={images[index]} className="border-0" />
      )}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-300 bg-white/90 text-zinc-600 transition-colors hover:bg-white hover:text-zinc-900"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-300 bg-white/90 text-zinc-600 transition-colors hover:bg-white hover:text-zinc-900"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1} of ${images.length}`}
                aria-current={i === index}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? "bg-zinc-700" : "bg-zinc-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
