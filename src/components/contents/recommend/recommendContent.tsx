import { Suspense } from 'react';
import SongList from './songList.tsx/songList';
import SongForm from './songForm/songForm';
import { getUser } from '@/lib/supabase/server';

export default async function Recommend() {
    const user = await getUser();
    return (
        <div className="flex flex-col items-center justify-center w-full h-dvh">
            <div className="flex max-w-[1140px] w-full h-full justify-between items-center">
                <div className="h-9/12 flex flex-col">
                    <h1 className="text-4xl font-bold mb-3 text-neutral-700">추천음악</h1>
                    <Suspense fallback={<SkeletonLoader />}>
                        <SongList />
                    </Suspense>
                </div>
                <SongForm user={user} />
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