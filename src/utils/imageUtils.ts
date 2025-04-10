import { IMAGE_DIRECTORIES } from '../config/images';

/**
 * Ensures all required image directories exist
 */
export const setupImageDirectories = () => {
  IMAGE_DIRECTORIES.forEach(dir => {
    const fullPath = `public${dir}`;
    if (!window.fs?.existsSync(fullPath)) {
      window.fs?.mkdirSync(fullPath, { recursive: true });
    }
  });
};

/**
 * Gets the full path for an image
 */
export const getImagePath = (path: string) => {
  if (path.startsWith('http')) {
    return path;
  }
  return path.startsWith('/') ? path : `/${path}`;
};

/**
 * Validates if a file is an image
 */
export const isValidImageFile = (file: File) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
};