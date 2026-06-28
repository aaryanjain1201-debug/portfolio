export function getDriveImageUrl(url: string): string {
  if (!url) return url;

  // Already a direct image URL
  if (url.startsWith("http") && !url.includes("drive.google.com")) {
    return url;
  }

  // Google Drive share link: https://drive.google.com/file/d/FILE_ID/view?...
  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}=w1200`;
  }

  // Google Drive open link: https://drive.google.com/open?id=FILE_ID
  const openIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (openIdMatch) {
    return `https://lh3.googleusercontent.com/d/${openIdMatch[1]}=w1200`;
  }

  // Google Drive uc?export=download link
  const ucMatch = url.match(/\/uc\?.*id=([a-zA-Z0-9_-]+)/);
  if (ucMatch) {
    return `https://lh3.googleusercontent.com/d/${ucMatch[1]}=w1200`;
  }

  return url;
}

export function isGoogleDriveLink(url: string): boolean {
  return url.includes("drive.google.com");
}

export function getDrivePreviewUrl(url: string): string {
  const directUrl = getDriveImageUrl(url);
  if (directUrl !== url) {
    return directUrl;
  }
  // For thumbnail/preview
  if (isGoogleDriveLink(url)) {
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}=w400`;
    }
  }
  return url;
}
