export interface Track {
  id: string | number;
  title: string;
  artist: string;
  src: string;          // public/audio/ altındaki mp3 yolu veya URL
  cover?: string | null;       // Opsiyonel kapak URL veya resmi
  spotifyUrl: string;   // Spotify şarkı / playlist linki
  category?: string | null;
  order?: number;
}

export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export const defaultPlaylist: Track[] = [];
