/// <reference types="vite/client" />

declare module 'virtual:lina-photos' {
  import type { PhotoId } from './content/photos';

  /** Signed Cloudinary URL of every photo and size (build/photos-plugin.ts), or null without CLOUDINARY_URL. */
  export const photoUrls: Record<PhotoId, Record<'page' | 'thumb' | 'view', string>> | null;
}
