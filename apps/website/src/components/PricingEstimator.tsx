"use client";

import { useEffect, useRef, useState } from "react";
import { bookingGroups, downtownExtra, minimumVisit, multiItemDiscount, type BookingItem } from "@/content/bookingPrices";
import { siteConfig } from "@/lib/site";
import styles from "./pricing-estimator.module.css";

const money = (value: number) => `$${Number.isInteger(value) ? value : value.toFixed(2)}`;
const range = (min: number, max: number) => (min === max ? money(min) : `${money(min)} – ${money(max)}`);
const priceLabel = (item: BookingItem) => {
  if (item.unit) return item.note ?? "";
  return range(item.min, item.max);
};

export default function PricingEstimator() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [downtown, setDowntown] = useState(false);
  const [cushion, setCushion] = useState<Record<string, "fixed" | "removable">>({});
  const summaryRef = useRef<HTMLElement>(null);
  const timeRef = useRef<HTMLElement>(null);
  const [summaryVisible, setSummaryVisible] = useState(true);
  const [pastItems, setPastItems] = useState(false);

  // The page clips overflow, so a sticky summary cannot work. Instead a fixed bar keeps the total in view.
  useEffect(() => {
    const summary = summaryRef.current;
    const time = timeRef.current;
    if (!summary || !time) return;
    const summaryObserver = new IntersectionObserver(([entry]) => setSummaryVisible(entry.isIntersecting));
    const timeObserver = new IntersectionObserver(([entry]) =>
      setPastItems(entry.isIntersecting || entry.boundingClientRect.top < 0),
    );
    summaryObserver.observe(summary);
    timeObserver.observe(time);
    return () => {
      summaryObserver.disconnect();
      timeObserver.disconnect();
    };
  }, []);

  const toggleCushion = (id: string, value: "fixed" | "removable") =>
    setCushion((current) => {
      const next = { ...current };
      if (next[id] === value) delete next[id];
      else next[id] = value;
      return next;
    });
  const lowPrice = (item: BookingItem) => (item.cushions && cushion[item.id] === "removable" ? item.max : item.min);
  const highPrice = (item: BookingItem) => (item.cushions && cushion[item.id] === "fixed" ? item.min : item.max);

  const allItems = bookingGroups.flatMap((group) => group.items);
  const selected = allItems.filter((item) => (quantities[item.id] ?? 0) > 0);

  const change = (item: BookingItem, direction: 1 | -1) => {
    const step = item.step ?? 1;
    const limit = item.maxQty ?? 20;
    setQuantities((current) => {
      const next = Math.min(limit, Math.max(0, (current[item.id] ?? 0) + direction * step));
      return { ...current, [item.id]: next };
    });
  };

  // Every piece counts as an item; a staircase or an area rug counts as one. The priciest piece is full price.
  const withDiscount = (price: (item: BookingItem) => number) => {
    const pieces = selected
      .flatMap((item) => {
        const qty = quantities[item.id] ?? 0;
        return item.unit ? [price(item) * qty] : Array<number>(qty).fill(price(item));
      })
      .sort((a, b) => b - a);
    const full = pieces.reduce((sum, value) => sum + value, 0);
    const discounted = pieces.reduce((sum, value, index) => {
      const rate = index === 0 ? 0 : index === 1 ? multiItemDiscount.second : multiItemDiscount.thirdAndMore;
      return sum + Math.round(value * (1 - rate));
    }, 0);
    return { full, discounted };
  };
  const low = withDiscount(lowPrice);
  const high = withDiscount(highPrice);
  const subtotalMin = low.discounted;
  const subtotalMax = high.discounted;
  const savedMin = Math.max(0, Math.round(low.full) - subtotalMin);
  const savedMax = Math.max(0, Math.round(high.full) - subtotalMax);
  const hasDiscount = savedMin > 0 || savedMax > 0;
  const extra = downtown ? downtownExtra : 0;
  const totalMin = Math.max(subtotalMin, minimumVisit) + extra;
  const totalMax = Math.max(subtotalMax, minimumVisit) + extra;
  const belowMinimum = selected.length > 0 && subtotalMax < minimumVisit;

  const lineText = (item: BookingItem) => {
    const qty = quantities[item.id] ?? 0;
    const kind = item.cushions && cushion[item.id] ? ` (${cushion[item.id]} cushions)` : "";
    return item.unit ? `${item.label}: ${qty} ${item.unit}` : `${item.label} x ${qty}${kind}`;
  };

  const notes = selected.length
    ? [
        "Items:",
        ...selected.map((item) => `- ${lineText(item)}`),
        downtown ? "Downtown Toronto: yes" : "",
        hasDiscount ? "Multi-item discount (20% second item, 25% third and more) is included in the estimate" : "",
        `Estimate from the website, tax included: ${range(totalMin, totalMax)}`,
      ]
        .filter(Boolean)
        .join("\n")
    : "";
  const bookingUrl = notes ? `${siteConfig.bookingHref}?notes=${encodeURIComponent(notes)}` : siteConfig.bookingHref;
  const embedUrl = `${siteConfig.bookingHref}?embed=true&layout=month_view${notes ? `&notes=${encodeURIComponent(notes)}` : ""}`;

  // The calendar reloads when the list changes, so wait until the customer stops tapping.
  const [frameUrl, setFrameUrl] = useState(embedUrl);
  useEffect(() => {
    const timer = window.setTimeout(() => setFrameUrl(embedUrl), 700);
    return () => window.clearTimeout(timer);
  }, [embedUrl]);

  return (
    <>
    <div className={styles.layout}>
      <div className={styles.groups}>
        {bookingGroups.map((group) => (
          <section key={group.id} className={styles.group} aria-labelledby={`${group.id}-heading`}>
            <h2 id={`${group.id}-heading`}>{group.title}</h2>
            {group.lead ? <p className={styles.groupLead}>{group.lead}</p> : null}
            {group.guide ? (
              <div className={styles.guide}>
                {group.guide.map((tile, index) => (
                  <div key={tile.badge} className={index === 0 ? styles.guideLow : styles.guideHigh}>
                    <span className={styles.guideBadge}>{tile.badge}</span>
                    <span className={styles.guideText}>
                      <strong>{tile.title}.</strong> {tile.text}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
            <ul>
              {group.items.map((item) => {
                const qty = quantities[item.id] ?? 0;
                return (
                  <li key={item.id} className={qty > 0 ? styles.itemOn : undefined}>
                    <div className={styles.itemText}>
                      <span className={styles.itemName}>{item.label}</span>
                      <span className={styles.itemPrice}>
                        {item.cushions ? (
                          <>
                            <span className={styles.priceLow}>{money(item.min)}</span>
                            {" – "}
                            <span className={styles.priceHigh}>{money(item.max)}</span>
                          </>
                        ) : (
                          priceLabel(item)
                        )}
                        {!item.unit && item.note ? <small> · {item.note}</small> : null}
                      </span>
                      {item.cushions && qty > 0 ? (
                        <span className={styles.choices} role="group" aria-label={`Cushions of ${item.label}`}>
                          <button
                            type="button"
                            className={`${styles.choice} ${styles.choiceFixed}`}
                            aria-pressed={cushion[item.id] === "fixed"}
                            onClick={() => toggleCushion(item.id, "fixed")}
                          >
                            Fixed cushions · {money(item.min)}
                          </button>
                          <button
                            type="button"
                            className={`${styles.choice} ${styles.choiceRemovable}`}
                            aria-pressed={cushion[item.id] === "removable"}
                            onClick={() => toggleCushion(item.id, "removable")}
                          >
                            Removable cushions · {money(item.max)}
                          </button>
                        </span>
                      ) : null}
                    </div>
                    <div className={styles.stepper}>
                      <button type="button" onClick={() => change(item, -1)} aria-label={`Remove one: ${item.label}`} disabled={qty === 0}>
                        −
                      </button>
                      <output aria-live="polite">{qty}</output>
                      <button type="button" onClick={() => change(item, 1)} aria-label={`Add one: ${item.label}`}>
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            {group.note ? <p className={styles.groupNote}>{group.note}</p> : null}
          </section>
        ))}
      </div>

      <aside ref={summaryRef} className={styles.summary} aria-label="Your estimate">
        <h2>Your estimate</h2>
        {selected.length === 0 ? (
          <p className={styles.empty}>Add an item to see your estimate. Not sure what to pick? Just choose a time and tell us in the notes.</p>
        ) : (
          <>
            <ul className={styles.lines}>
              {selected.map((item) => (
                <li key={item.id}>{lineText(item)}</li>
              ))}
            </ul>
            <label className={styles.downtown}>
              <input type="checkbox" checked={downtown} onChange={(event) => setDowntown(event.target.checked)} />
              <span>
                Downtown Toronto or other downtown areas
                <small>Adds {money(downtownExtra)} (minimum visit {money(minimumVisit + downtownExtra)})</small>
              </span>
            </label>
            {hasDiscount ? (
              <p className={styles.saving}>
                <span>Multi-item discount included</span>
                <strong>−{range(Math.min(savedMin, savedMax), Math.max(savedMin, savedMax))}</strong>
                <small>20% off the second item, 25% off the third and any after.</small>
              </p>
            ) : null}
            <p className={styles.total}>
              <span>Estimated total, tax included</span>
              <strong>{range(totalMin, totalMax)}</strong>
            </p>
            <p className={styles.confirmNote}>We confirm the exact amount with you before we start, and a small difference is possible.</p>
            {belowMinimum ? <p className={styles.hint}>The minimum visit is {money(minimumVisit)}. Add another item to get more from the same visit.</p> : null}
          </>
        )}
        <a className={styles.cta} href="#pick-time">
          Next: pick a time
        </a>
        <p className={styles.fine}>
          This is an estimate. The second item is 20% off and the third 25% off, and it is already included. We confirm the work and the final price in writing before we start, and you pay only after the service.
        </p>
      </aside>
    </div>

    {selected.length > 0 && !summaryVisible && !pastItems ? (
      <div className={styles.bar} role="region" aria-label="Your estimate so far">
        <p>
          <span>{selected.length === 1 ? "1 item" : `${selected.length} items`} · estimate, tax included</span>
          <strong>{range(totalMin, totalMax)}</strong>
        </p>
        <a href="#pick-time">Next: pick a time</a>
      </div>
    ) : null}

    <section ref={timeRef} id="pick-time" className={styles.timeSection} aria-labelledby="pick-time-heading">
      <h2 id="pick-time-heading">Pick a day and start time</h2>
      <p>
        Choose the time that suits you, then add your name, phone and address. Your items and estimate are filled in
        for you. We confirm every request by text message.
        {selected.length > 0 ? " If you change your items above, the calendar refreshes and you pick the time again." : ""}
      </p>
      <iframe className={styles.frame} src={frameUrl} title="Choose a day and start time" loading="lazy" />
      <a className={styles.fallback} href={bookingUrl} target="_blank" rel="noopener noreferrer">
        Calendar not showing? Open it in a new tab
      </a>
    </section>
    </>
  );
}
