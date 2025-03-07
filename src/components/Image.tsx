
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

const Image = ({ 
  src, 
  alt, 
  className, 
  width, 
  height 
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        !isLoaded && "bg-muted animate-pulse",
        className
      )}
      style={{ width, height }}
    >
      {!error ? (
        <img 
          src={src} 
          alt={alt} 
          className={cn(
            "w-full h-full object-cover transition-opacity",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          width={width}
          height={height}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
          Image not found
        </div>
      )}
    </div>
  );
};

export default Image;
