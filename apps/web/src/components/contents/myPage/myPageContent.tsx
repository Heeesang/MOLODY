import { Song } from '@/types/song';
import SongImage from '@/components/contents/recommend/songList/SongImage';

interface MyPageContentProps {
  songs: Song[];
}

export default function MyPageContent({ songs }: MyPageContentProps) {
  return (
    <div className="max-w-[1140px] mx-auto">
      <h1 className="text-4xl font-bold mb-5 pt-24 text-neutral-700">내가 등록한 노래</h1>
      {songs && songs.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 mt-4">
          {songs.map((song) => (
            <div key={song.id} className="flex items-center justify-between duration-100 hover:bg-card-foreground/10 p-2 rounded-md">
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
                  className="font-medium text-md w-sm hover:underline truncate"
                >
                  {song.title}
                </a>
              </div>
              <div className="flex items-center space-x-4 mr-4">
                <span
                  className={`px-2 py-1 rounded-sm text-xs font-semibold
                    ${song.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${song.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                    ${song.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                  `}
                >
                  {song.status === 'pending' && '대기중'}
                  {song.status === 'approved' && '승인됨'}
                  {song.status === 'rejected' && '거절됨'}
                </span>
                <span
                  key={song.genre}
                  className="hidden px-2 py-1 md:block rounded-sm text-xs bg-secondary text-secondary-foreground"
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
