// Public integration identifiers and optional public media URLs.
// These values are safe to expose in the browser; private credentials must never live here.
const publicValue = (value: string | undefined) => value?.trim() ?? "";

export const integrations = {
  googleAdsId: publicValue(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID) || "AW-18294967541",
  googleAdsQuoteConversion: publicValue(
    process.env.NEXT_PUBLIC_GOOGLE_ADS_QUOTE_CONVERSION,
  ),
  googleAdsPhoneConversion: publicValue(
    process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION,
  ),
  web3formsAccessKey:
    publicValue(process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY) ||
    "c204f6bb-0402-4dfe-8981-fc5080ce3ac4",
  homeVideoUrl: publicValue(process.env.NEXT_PUBLIC_HOME_VIDEO_URL),
  youtubeUrl: publicValue(process.env.NEXT_PUBLIC_YOUTUBE_URL),
};
