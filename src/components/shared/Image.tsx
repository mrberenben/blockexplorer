import React from "react";

// utils
import { cn } from "~/utils/cn";

interface CustomImageAttributes {
  objectFit?: "contain" | "cover" | "fill";
}

const Image = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement> & CustomImageAttributes>(
  function Image(props, ref) {
    const [loaded, setLoaded] = React.useState<boolean>(false);

    const { src, alt = "", className, hidden, objectFit, width, height, ...rest } = props;

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        className={cn(
          "opacity-0 scale-95 transition-opacity duration-150 ease-curve",
          {
            "scale-100 opacity-100": loaded,
            "w-full h-full": width === "100%" && height === "100%",
            "object-cover": objectFit === "cover",
            "object-contain": objectFit === "contain",
            "object-fill": objectFit === "fill",
            hidden: hidden
          },
          className
        )}
        onLoad={() => setLoaded(true)}
        {...rest}
      />
    );
  }
);

export default Image;
