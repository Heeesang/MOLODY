"use client";

import { availableGenre } from '@/schemas/songSchema';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export default function GenreSelector({ currentGenre }: { currentGenre?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [optimisticGenre, setOptimisticGenre] = useState<string | undefined>(currentGenre);

  useEffect(() => {
    setOptimisticGenre(currentGenre);
  }, [currentGenre]);

  const handleGenreChange = (genre: string | undefined) => {
    setOptimisticGenre(genre);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (genre) {
        params.set('genre', genre);
      } else {
        params.delete('genre');
      }
      router.push(`/recommend?${params.toString()}`);
    });
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleGenreChange(undefined)}
        className={`px-3 py-1 rounded-lg text-sm ${!optimisticGenre ? 'bg-neutral-700 text-white' : 'bg-neutral-200 text-neutral-700'} ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
        disabled={isPending}
      >
        전체
      </button>
      {availableGenre.map((g) => (
        <button
          key={g}
          onClick={() => handleGenreChange(g)}
          className={`px-2 py-1 rounded-lg text-sm ${optimisticGenre === g ? 'bg-neutral-700 text-white' : 'bg-neutral-200 text-neutral-700'} ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isPending}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
