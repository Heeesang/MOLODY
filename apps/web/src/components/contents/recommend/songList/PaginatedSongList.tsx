"use client";

import { useEffect, useState } from "react";
import { SongData } from "@/types/song";
import SongImage from "./SongImage";
import { fetchSongs } from "@/app/actions/songActions";
import { Button } from "@/components/ui/button";

const SONGS_PER_PAGE = 10;

export default function PaginatedSongList({ initialSongs, genre }: { initialSongs: SongData[], genre?: string }) {
  const [songs, setSongs] = useState<SongData[]>(initialSongs);
  const [offset, setOffset] = useState(initialSongs.length);
  const [hasMore, setHasMore] = useState(initialSongs.length === SONGS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  const loadMoreSongs = async () => {
    setLoading(true);
    const newSongs = await fetchSongs(offset, SONGS_PER_PAGE, genre);
    setSongs((prevSongs) => [...prevSongs, ...newSongs]);
    setOffset((prevOffset) => prevOffset + newSongs.length);
    setHasMore(newSongs.length === SONGS_PER_PAGE);
    setLoading(false);
  };

  useEffect(() => {
    setSongs(initialSongs);
    setOffset(initialSongs.length);
    setHasMore(initialSongs.length === SONGS_PER_PAGE);
  }, [genre, initialSongs]);


  return (
    <div>
      <div className="grid grid-cols-1 gap-2 mt-4">
        {songs.length > 0 ? (
          songs.map((song) => (
            <div key={song.video_id} className="flex items-center justify-between duration-100 hover:bg-card-foreground/10">
              <div className="flex items-center space-x-4">
                <SongImage
                  src={song.thumbnail_url}
                  alt={song.title}
                  width={106}
                  height={60}
                  className="rounded object-cover"
                />
                <a
                  href={song.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-medium text-md w-sm hover:underline truncate"
                >
                  {song.title}
                </a>
              </div>
              <div className="mr-4">
                <span
                  key={song.genre}
                  className="hidden px-2 py-1 md:block rounded-sm text-xs bg-secondary text-secondary-foreground"
                >
                  {song.genre}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">등록된 노래가 없습니다.</p>
        )}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button onClick={loadMoreSongs} disabled={loading}>
            {loading ? "로딩 중..." : "더 보기"}
          </Button>
        </div>
      )}
    </div>
  );
}
