import { getBackgroundImage } from '@/utils/get-background-image';

describe('getBackgroundImage', () => {
  it('should return correctly formatted image-set for a single image', () => {
    const srcSet = 'image1.jpg 1x';
    const result = getBackgroundImage(srcSet);
    expect(result).toBe('image-set(url("image1.jpg") 1x)');
  });

  it('should return an empty image-set when given an empty string', () => {
    const result = getBackgroundImage('');
    expect(result).toBe('image-set()');
  });

  it('should return a valid image-set when given a valid srcSet', () => {
    const srcSet = 'image1.jpg 1x, image2.jpg 2x, image3.jpg 3x';
    const result = getBackgroundImage(srcSet);
    expect(result).toBe(
      'image-set(url("image1.jpg") 1x, url("image2.jpg") 2x, url("image3.jpg") 3x)',
    );
  });
});
