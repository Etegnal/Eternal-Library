export interface Track {
  id: string | number;
  title: string;
  artist: string;
  src: string;          // public/audio/ altındaki mp3 yolu veya URL
  cover?: string | null;       // Opsiyonel kapak URL veya resmi
  spotifyUrl: string;   // Spotify şarkı / playlist linki
  order?: number;
}

export const defaultPlaylist: Track[] = [];
