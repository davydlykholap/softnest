import NextImage from "next/image";
import Image from "@/components/ResponsiveImage";
import { integrations } from "@/lib/integrations";
import { siteConfig } from "@/lib/site";

const videoSrc = integrations.homeVideoUrl;

export default function HomeVideoShowcase() {
  return (
    <section
      id="cleaning-video"
      className="home-video-section"
      aria-labelledby="cleaning-video-heading"
    >
      <div className="home-video-section__inner">
        <div className="home-video-frame">
          {videoSrc ? (
            <video
              controls
              playsInline
              preload="metadata"
              poster="/images/blog/how-to-remove-stain-from-couch/controlled-sofa-extraction.webp"
              aria-label="Watch how SoftNest professionally cleans upholstery and carpets"
            >
              <source src={videoSrc} />
              Your browser does not support embedded video.
            </video>
          ) : (
            <a
              className="home-video-fallback"
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch on Instagram. Opens our SoftNest cleaning videos in a new tab."
            >
              <Image
                src="/images/blog/how-to-remove-stain-from-couch/controlled-sofa-extraction.webp"
                alt="Professional upholstery extraction on a cream sofa"
                fill
                sizes="(max-width: 900px) 92vw, 960px"
              />
              <span className="home-video-fallback__action">
                <NextImage src="/images/brand/instagram-gradient.svg" alt="" width={44} height={44} />
              </span>
              <span className="home-video-fallback__badge">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
                Watch on Instagram
                <span aria-hidden="true">↗</span>
              </span>
            </a>
          )}
        </div>

        <div className="home-video-copy">
          <h2 id="cleaning-video-heading">See How We Clean</h2>
          <p>
            Proven methods and professional extraction equipment, used with care in your home.
          </p>
          {!videoSrc ? (
            <p className="home-video-note">
              Our cleaning videos live on Instagram. Tap the picture and you will go to our
              Instagram page, where you can watch them and say hello.
            </p>
          ) : null}
          {!videoSrc ? (
            <a
              className="home-video-link"
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on Instagram ↗
            </a>
          ) : null}
        </div>

      </div>
    </section>
  );
}
