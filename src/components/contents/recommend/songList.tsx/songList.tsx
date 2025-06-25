import { getLatestSongs } from '@/lib/supabase/server';
import { SongData } from '@/lib/supabase/song/songService';
import Image from 'next/image';

export default async function SongList() {
    const songs: SongData[] = await getLatestSongs(10);
    return (
        <div className="grid grid-cols-1 gap-2 mt-4">
            {songs.length > 0 ? (
                songs.map((song) => (
                    <div key={song.video_id} className="flex items-center justify-between duration-200 hover:bg-neutral-200">
                        <div className="flex items-center space-x-4">
                            <Image
                                src={song.thumbnail_url}
                                alt={song.title}
                                width={106}
                                height={76}
                                className="rounded"
                                priority
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
                            {song.moods.map((mood) => (
                                <span
                                    key={mood}
                                    className="px-2 py-1 rounded-sm text-xs bg-neutral-100 text-neutral-400"
                                >
                                    {mood.charAt(0).toUpperCase() + mood.slice(1)}
                                </span>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>등록된 노래가 없습니다.</p>
            )}
        </div>
    );
}