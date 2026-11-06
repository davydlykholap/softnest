import Image, { type ImageProps } from "next/image";
import { responsiveImageFallback, responsiveImageSet } from "@/lib/responsiveImages";

// Native srcset for committed derivatives; retain Next's behavior for CMS/CDN
// images and other sources that are not in the local photo manifest.
export default function ResponsiveImage(props: ImageProps) {
  const { src, alt, fill, priority, preload, unoptimized, quality, loader,
    placeholder, blurDataURL, onLoadingComplete, overrideSrc, ...imageProps } = props;
  const srcSet = typeof src === "string" ? responsiveImageSet(src) : undefined;
  if (!srcSet || typeof src !== "string") return <Image {...props} alt={alt} />;
  // These optimizer-only props are intentionally consumed, never spread to img.
  void unoptimized; void quality; void loader; void placeholder;
  void blurDataURL; void onLoadingComplete; void overrideSrc;
  const eager = priority || preload || imageProps.loading === "eager";
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static-export responsive derivatives
    <img
      {...imageProps}
      src={responsiveImageFallback(src)}
      srcSet={srcSet}
      sizes={imageProps.sizes ?? "100vw"}
      alt={alt}
      loading={eager ? "eager" : (imageProps.loading ?? "lazy")}
      fetchPriority={eager ? "high" : imageProps.fetchPriority}
      decoding={imageProps.decoding ?? "async"}
      style={fill ? { position: "absolute", height: "100%", width: "100%",
        inset: 0, ...imageProps.style } : imageProps.style}
    />
  );
}
