export const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

export const attributionStorageKey = "softnest_marketing_attribution";

export function sanitizeAttribution(input: unknown): Record<string, string> {
  if (!input || typeof input !== "object") return {};
  const values = input as Record<string, unknown>;
  return attributionKeys.reduce<Record<string, string>>((safe, key) => {
    const value = values[key];
    if (typeof value === "string" && value.length > 0 && value.length <= 500 &&
      !/[\u0000-\u001f\u007f]/.test(value)) {
      safe[key] = value;
    }
    return safe;
  }, {});
}

export function readAttribution(search: string) {
  const params = new URLSearchParams(search);
  return sanitizeAttribution(
    Object.fromEntries(attributionKeys.map((key) => [key, params.get(key)?.trim() ?? ""])),
  );
}
