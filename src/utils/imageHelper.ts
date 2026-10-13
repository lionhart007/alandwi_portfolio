/**
 * Helper to normalize image URLs.
 * If the URL is a Google Drive share link, converts it to a direct CDN image link:
 * - https://drive.google.com/file/d/FILE_ID/view... -> https://lh3.googleusercontent.com/d/FILE_ID
 * - https://drive.google.com/open?id=FILE_ID -> https://lh3.googleusercontent.com/d/FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID -> https://lh3.googleusercontent.com/d/FILE_ID
 */
export function formatImageUrl(url: string | undefined): string {
  if (!url) return '';
  
  // Google Drive format 1: /file/d/{id}/...
  const driveFileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}`;
  }

  // Google Drive format 2: id={id}
  const driveIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveIdMatch && driveIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveIdMatch[1]}`;
  }

  // Google Drive format 3: drive.google.com/open?id={id}
  if (url.includes('drive.google.com')) {
    const rawMatch = url.match(/([a-zA-Z0-9_-]{25,})/);
    if (rawMatch && rawMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${rawMatch[1]}`;
    }
  }

  return url;
}
