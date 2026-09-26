import Image from "next/image";
import { siteConfig } from "@/lib/site";

const videoSrc = process.env.NEXT_PUBLIC_HOME_VIDEO_URL?.trim();

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
              aria-label="Watch SoftNest cleaning videos on Instagram"
            >
              <Image
                src="/images/blog/how-to-remove-stain-from-couch/controlled-sofa-extraction.webp"
                alt="Professional upholstery extraction on a cream sofa"
                fill
                sizes="(max-width: 900px) 92vw, 960px"
              />
              <span className="home-video-fallback__action">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m10 8 6 4-6 4Z" fill="currentColor" stroke="none" />
                </svg>
              </span>
            </a>
          )}
        </div>

        <div className="home-video-copy">
          <p className="home-video-copy__kicker">See SoftNest in action</p>
          <h2 id="cleaning-video-heading">See How We Clean</h2>
          <p>
            Proven methods and professional extraction equipment, used with care in your home.
          </p>
        </div>

      </div>
    </section>
  );
}
