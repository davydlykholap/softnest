const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590622653207",
    iconClassName: "social-platform-icon--facebook",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M13.65 21v-8.2h2.75l.41-3.2h-3.16V7.56c0-.93.26-1.56 1.59-1.56h1.7V3.14c-.29-.04-1.3-.14-2.47-.14-2.44 0-4.11 1.49-4.11 4.23V9.6H7.6v3.2h2.75V21h3.3Z"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/softnestfabriccare/",
    iconClassName: "social-platform-icon--instagram",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.3A2.7 2.7 0 0 0 4.3 7v10A2.7 2.7 0 0 0 7 19.7h10a2.7 2.7 0 0 0 2.7-2.7V7A2.7 2.7 0 0 0 17 4.3H7Zm10.1 1.55a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7ZM12 7.15A4.85 4.85 0 1 1 7.15 12 4.85 4.85 0 0 1 12 7.15Zm0 2.3A2.55 2.55 0 1 0 14.55 12 2.55 2.55 0 0 0 12 9.45Z"
        />
      </svg>
    ),
  },
] as const;

type SocialMediaLinksProps = {
  variant?: "about" | "footer" | "gallery";
};

export default function SocialMediaLinks({
  variant = "footer",
}: SocialMediaLinksProps) {
  const iconOnly = variant === "gallery";

  return (
    <div
      className={`social-media-links social-media-links--${variant}`}
      role="group"
      aria-label="SoftNest social media"
    >
      {socialLinks.map((social) => (
        <a
          className={`social-platform-link${iconOnly ? " social-platform-link--icon-only" : ""}`}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          key={social.name}
          aria-label={`Visit SoftNest Fabric Care on ${social.name}`}
          title={social.name}
        >
          <span
            className={`social-platform-icon ${social.iconClassName}`}
            aria-hidden="true"
          >
            {social.icon}
          </span>
          {!iconOnly ? <span>{social.name}</span> : null}
        </a>
      ))}
    </div>
  );
}
