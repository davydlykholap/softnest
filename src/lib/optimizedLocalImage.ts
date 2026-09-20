const optimizedImages: Record<string, string> = {
  "/img/sofa.png": "/img/sofa.webp",
  "/img/sectional.png": "/img/sectional.webp",
  "/img/sectional_sofa.png": "/img/sectional_sofa.webp",
  "/img/gray_sofa_stain.png": "/img/gray_sofa_stain.webp",
};

export function optimizedLocalImage(path: string) {
  return optimizedImages[path] ?? path;
}
