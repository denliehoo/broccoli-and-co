export const getBackgroundImage = (srcSet = '') => {
  if (!srcSet.trim()) return 'image-set()';

  const imageSet = srcSet
    .split(',')
    .map((str) => {
      const [url, dpi] = str.trim().split(' ');
      return dpi ? `url("${url}") ${dpi}` : `url("${url}")`; // Avoid undefined DPI
    })
    .join(', ');

  return `image-set(${imageSet})`;
};
