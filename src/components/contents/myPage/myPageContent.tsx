import { Song } from '@/types/song';
import Image from 'next/image';

interface MyPageContentProps {
  songs: Song[];
}

export default function MyPageContent({ songs }: MyPageContentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">내가 등록한 노래</h1>
      {songs && songs.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 mt-4">
          {songs.map((song) => (
            <div key={song.id} className="flex items-center justify-between duration-100 hover:bg-neutral-200 p-2 rounded-md">
              <div className="flex items-center space-x-4">
                <Image
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
                  className="font-medium text-md w-sm hover:underline truncate"
                >
                  {song.title}
                </a>
              </div>
              <div className="mr-4">
                <span
                  key={song.genre}
                  className="hidden px-2 py-1 md:block rounded-sm text-xs bg-neutral-100 text-neutral-400"
                >
                  {song.genre}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p>아직 등록한 노래가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
