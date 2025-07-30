import { getLatestSongs } from '@/lib/supabase/server';
import { SongData } from '@/lib/supabase/song/songService';
import { availableGenre } from '@/schemas/songSchema';
import Image from 'next/image';
import Link from 'next/link';

export default async function SongList({ genre }: { genre?: string }) {
    const songs: SongData[] = await getLatestSongs(10, genre);
    return (
        <div>
            <div className="flex space-x-2 mb-4">
                <Link href="/recommend">
                    <button className={`px-3 py-1 rounded-lg text-sm ${!genre ? 'bg-neutral-700 text-white' : 'bg-neutral-200 text-neutral-700'}`}>전체</button>
                </Link>
                {availableGenre.map((g) => (
                    <Link key={g} href={`/recommend?genre=${encodeURIComponent(g)}`}>
                        <button className={`px-2 py-1 rounded-lg text-sm ${genre === g ? 'bg-neutral-700 text-white' : 'bg-neutral-200 text-neutral-700'}`}>{g}</button>
                    </Link>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-2 mt-4">
                {songs.length > 0 ? (
                    songs.map((song) => (
                        <div key={song.video_id} className="flex items-center justify-between duration-100 hover:bg-neutral-200">
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
                    ))
                ) : (
                    <p>등록된 노래가 없습니다.</p>
                )}
            </div>
        </div>
    );
}