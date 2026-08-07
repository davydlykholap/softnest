import Link from "next/link";
import { locations } from "@/data/locations";
import { navigationServices } from "@/data/services";
import SocialMediaLinks from "@/components/SocialMediaLinks";

export default function SiteFooter() {
  return (
    <footer className="bg-white px-[6%] py-12 border-b border-forestGreen/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="font-serif font-bold text-forestGreen text-xl uppercase mb-4">
            SoftNest
          </h2>
          <p className="text-sm text-stone-700 leading-relaxed">
            Quality You Can See.
            <br />
            Care You Can Trust.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed mt-4">
            Professional upholstery and carpet cleaning for homes across the GTA.
          </p>
          <div className="footer-social-block">
            <p className="footer-social-heading">Follow our work</p>
            <SocialMediaLinks variant="footer" />
          </div>
        </div>
        <div>
          <h3 className="font-serif font-bold text-forestGreen text-sm uppercase mb-4">
            Services
          </h3>
          <ul className="footer-service-list space-y-2 text-sm text-stone-700">
            {navigationServices.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}/`}>
                  {service.menuLabel}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="footer-location-all" href="/services/">
            View all services
          </Link>
        </div>
        <div>
          <h3 className="font-serif font-bold text-forestGreen text-sm uppercase mb-4">
            Areas We Serve
          </h3>
          <ul className="footer-location-list text-sm text-stone-700">
            {locations.map((location) => (
              <li key={location.slug}>
                <Link href={`/location/${location.slug}/`}>
                  {location.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="footer-location-all" href="/location/">
            View all locations
          </Link>
        </div>
        <div>
          <h3 className="font-serif font-bold text-forestGreen text-sm uppercase mb-4">
            Contact
          </h3>
          <p className="text-sm text-stone-700 mb-2">
            <a href="tel:+14167270287">(416) 727-0287</a>
          </p>
          <p className="text-sm text-stone-700 mb-2">
            <a href="mailto:softnest.upholstery@outlook.com">
              softnest.upholstery@outlook.com
            </a>
          </p>
          <p className="text-sm text-stone-700">
            Greater Toronto Area
            <br />
            Ontario
          </p>
          <div
            className="softnest-map softnest-map--footer mt-6 h-28 border border-forestGreen/10"
            aria-label="SoftNest service radius map"
          >
            <iframe
              title="SoftNest service area map for Toronto and surrounding cities"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=43.66,-79.55&z=10&output=embed"
            />
            <div className="softnest-map__static-layer" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-forestGreen/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-stone-500">
        <p>© 2026 SoftNest Fabric Care. All rights reserved.</p>
        <p className="footer-legal-links">
          <Link href="/privacy/">Privacy Policy</Link>
          <span aria-hidden="true">|</span>
          <Link href="/terms/">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
}
