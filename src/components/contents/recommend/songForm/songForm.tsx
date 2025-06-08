'use client';
import { useState } from 'react';
import Image from 'next/image';
import { insertSong } from '@/lib/supabase/song/songService';
import { useAuth } from '@/lib/context/authContext';

export default function SongForm() {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<React.ReactNode | null>(null);
  const { user } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!user) {
        setError("로그인이 필요합니다. Google로 로그인해 주세요.");
        return;
      }

      const { existingSong } = await insertSong(url, user.id);

      if (existingSong) {
        setError(
          <div>
            <p>이미 등록된 YouTube 영상입니다: <a href={existingSong.youtube_url} target="_blank" className="text-blue-500 underline">{existingSong.youtube_url}</a></p>
            <button
              onClick={() => setUrl('')}
              className="bg-red-500 text-white p-2 rounded mt-2"
            >
              취소
            </button>
          </div>
        );
        setLoading(false);
        return;
      }

      setUrl('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg w-96 h-9/12">
      <div className="flex flex-col justify-between items-center h-full w-full">
        <form onSubmit={handleSubmit} className="w-full h-full">
          <div className="flex flex-col items-center mt-14">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="YouTube URL 입력"
              className="border border-gray-200 px-2 py-3 rounded w-4/5 mb-2 text-black"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-black text-white px-2 py-3 w-4/5 rounded hover:bg-neutral-700 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? '확인 중...' : '확인'}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <div className="flex w-4/5">
              <p className="text-xs text-gray-400 mt-4">
                *음악이 아닌 URL을 공유시 음악추천 기능이 제한될 수 있습니다
              </p>
            </div>
          </div>
        </form>
        <Image
          src="/molody_logo.svg"
          alt="Molody Logo"
          width={100}
          height={40}
          className="mb-14"
        />
      </div>
    </div>
  );
}