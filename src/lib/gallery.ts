export const galleryIndex = (current: number, offset: number, imageCount: number): number => {
  if (!Number.isInteger(imageCount) || imageCount <= 0) return 0
  return (current + offset % imageCount + imageCount) % imageCount
}
