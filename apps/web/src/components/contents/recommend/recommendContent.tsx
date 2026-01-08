import { Suspense } from 'react';
import SongForm from './songForm/songForm';
import GenreSelector from './songList/GenreSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLatestSongs } from '@/lib/supabase/server';
import PaginatedSongList from './songList/PaginatedSongList';

const SONGS_PER_PAGE = 10;

export default async function RecommendContent({ genre }: { genre?: string }) {
    const initialSongs = await getLatestSongs(SONGS_PER_PAGE, 0, genre);

    return (
        <div className="flex flex-col items-center justify-center w-full px-4 py-8">
            <div className="flex flex-col-reverse lg:flex-row max-w-[1140px] w-full h-full justify-between lg:mt-20 lg:space-x-8">
                <Card className="w-full my-10 lg:mt-0 lg:w-3/5 flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-foreground">추천 음악 목록</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col h-full">
                        <GenreSelector currentGenre={genre} />
                        <Suspense fallback={<SkeletonLoader />}>
                            <PaginatedSongList initialSongs={initialSongs} genre={genre} />
                        </Suspense>
                    </CardContent>
                </Card>
                <div className="w-full lg:w-96 mt-8 lg:mt-0">
                    <SongForm />
                </div>
            </div>
        </div>
    );
}

function SkeletonLoader() {
    return (
        <div className="grid grid-cols-1 gap-2 mt-4">
            {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 animate-pulse">
                    <div className="w-[106px] h-[60px] bg-muted rounded" />
                    <div className="w-1/2 h-4 bg-muted rounded" />
                </div>
            ))}
        </div>
    );
}