import Link from "next/link";
import { locations } from "@/data/locations";

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
            Professional upholstery cleaning for homes across Mississauga and
            the GTA.
          </p>
        </div>
        <div>
          <h3 className="font-serif font-bold text-forestGreen text-sm uppercase mb-4">
            Services
          </h3>
          <ul className="space-y-2 text-sm text-stone-700">
            <li>Sofa &amp; Couch Cleaning</li>
            <li>Pet Stain &amp; Odour Removal</li>
            <li>Sectional &amp; Furniture Cleaning</li>
            <li>Carpet &amp; Area Rug Cleaning</li>
          </ul>
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
            Mississauga, Ontario
            <br />
            Serving the GTA
          </p>
          <div
            className="softnest-map softnest-map--footer mt-6 h-28 border border-forestGreen/10"
            aria-label="SoftNest service radius map"
          >
            <iframe
              title="SoftNest service area mini map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=43.5890,-79.6441&z=10&output=embed"
            />
            <div className="softnest-map__static-layer" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-forestGreen/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-stone-500">
        <p>© 2026 SoftNest Upholstery Care. All rights reserved.</p>
        <p>Privacy Policy &nbsp; | &nbsp; Terms of Service</p>
      </div>
    </footer>
  );
}
