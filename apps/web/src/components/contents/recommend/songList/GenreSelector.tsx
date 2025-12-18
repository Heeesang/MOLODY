"use client";

import { availableGenre } from '@/schemas/songSchema';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button'

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
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => handleGenreChange(undefined)}
        variant={!optimisticGenre ? "default" : "outline"}
        className={`px-3 py-1 rounded-lg text-sm ${!optimisticGenre ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
        disabled={isPending}
      >
        전체
      </Button>
      {availableGenre.map((g) => (
        <Button
          key={g}
          onClick={() => handleGenreChange(g)}
          variant={optimisticGenre === g ? "default" : "outline"}
          className={`px-2 py-1 rounded-lg text-sm ${optimisticGenre === g ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isPending}
        >
          {g}
        </Button>
      ))}
    </div>
  );
}
