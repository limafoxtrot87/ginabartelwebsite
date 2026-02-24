"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type RotatingImageItem = {
  src: string;
  alt: string;
};

type RotatingImageProps = {
  images: RotatingImageItem[];
  startIndex?: number;
  intervalMs?: number;
  className?: string;
  priority?: boolean;
};

export function RotatingImage({
  images,
  startIndex = 0,
  intervalMs = 5600,
  className,
  priority = false
}: RotatingImageProps) {
  const safeImages = images.length > 0 ? images : [{ src: "/assets/agent/gina-headshot.png", alt: "Gina Bartel" }];
  const initial = useMemo(() => (startIndex >= 0 ? startIndex % safeImages.length : 0), [startIndex, safeImages.length]);
  const [index, setIndex] = useState(initial);

  useEffect(() => {
    if (safeImages.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % safeImages.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [safeImages.length, intervalMs]);

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={safeImages[index].src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={safeImages[index].src}
            alt={safeImages[index].alt}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
