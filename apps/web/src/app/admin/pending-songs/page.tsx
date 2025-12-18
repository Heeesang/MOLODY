import React from 'react';
import { fetchPendingSongs, approveSong, rejectSong } from '@/app/actions/songActions';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function PendingSongsPage() {
  const pendingSongs = await fetchPendingSongs();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Songs for Approval</h1>

      {pendingSongs.length === 0 ? (
        <p className="text-muted-foreground">No songs awaiting approval.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingSongs.map((song) => (
            <Card key={song.id}>
              <CardHeader>
                <CardTitle>{song.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-40 mb-2">
                  <Image
                    src={song.thumbnail_url}
                    alt={song.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-2">Genre: {song.genre}</p>
                <a
                  href={song.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm block mb-4 truncate"
                >
                  {song.youtube_url}
                </a>
                <div className="flex space-x-2">
                  <form action={approveSong}>
                    <input type="hidden" name="songId" value={song.id} />
                    <Button type="submit" variant="default">Approve</Button>
                  </form>
                  <form action={rejectSong}>
                    <input type="hidden" name="songId" value={song.id} />
                    <Button type="submit" variant="destructive">Reject</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}