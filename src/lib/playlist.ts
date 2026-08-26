export interface Track {
  id: string | number;
  title: string;
  artist: string;
  src: string;          // public/audio/ altındaki mp3 yolu veya URL
  cover?: string;       // Opsiyonel kapak URL veya resmi
  spotifyUrl: string;   // Spotify şarkı / playlist linki
  order?: number;
}

export const defaultPlaylist: Track[] = [
  {
    id: 1,
    title: "Nocturne in C-Sharp Minor",
    artist: "Frédéric Chopin",
    src: "/audio/chopin.mp3",
    cover: "/assets/logo.png",
    spotifyUrl: "https://open.spotify.com"
  },
  {
    id: 2,
    title: "Midnight Rain & Jazz",
    artist: "Eternal Lo-Fi",
    src: "/audio/rain-jazz.mp3",
    cover: "/assets/logo.png",
    spotifyUrl: "https://open.spotify.com"
  }
];
