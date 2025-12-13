import { getLatestSongs } from '@/lib/supabase/server';
import { SongData } from '@/types/song';
import SongImage from './SongImage';

export default async function SongList({ genre }: { genre?: string }) {
    const songs: SongData[] = await getLatestSongs(10, genre);
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
        </div>
    );
}