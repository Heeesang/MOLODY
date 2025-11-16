import { Suspense } from 'react';
import SongList from './songList/songList';
import SongForm from './songForm/songForm';
import GenreSelector from './songList/GenreSelector';

export default async function RecommendContent({ genre }: { genre?: string }) {
    return (
        <div className="flex flex-col items-center justify-center w-full px-4">
            <div className="flex flex-col-reverse mt-14 lg:flex-row max-w-[1140px] w-full h-full justify-between lg:mt-32 lg:space-x-8">
                <div className="w-full my-10 lg:mt-0 lg:w-3/5 flex flex-col">
                    <h1 className="text-4xl font-bold mb-3 text-neutral-700">추천음악</h1>
                    <GenreSelector currentGenre={genre} />
                    <Suspense fallback={<SkeletonLoader />}>
                        <SongList genre={genre} />
                    </Suspense>
                </div>
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
                    <div className="w-[106px] h-[60px] bg-gray-200 rounded" />
                    <div className="w-1/2 h-4 bg-gray-200 rounded" />
                </div>
            ))}
        </div>
    );
}