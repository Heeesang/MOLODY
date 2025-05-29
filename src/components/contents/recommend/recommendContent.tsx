"use client";

import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/lib/context/authContext";
import { insertSong } from "@/lib/supabase/song/songService";

export default function RecommendContent() {
    const [url, setUrl] = useState('');
    const [error, setError] = useState<React.ReactNode | null>(null);
    const [loading, setLoading] = useState(false);
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
        <div className="flex flex-col items-center justify-center w-full h-dvh">
            <div className="flex max-w-[1140px] w-full h-full justify-between items-center">
                <div className="h-9/12 flex flex-col">
                    <h1 className="text-2xl font-bold mb-3">최근 추천 음악</h1>
                </div>
                <div className="border border-gray-200 rounded-lg w-96 h-9/12 flex flex-col justify-between items-center">
                    <form onSubmit={handleSubmit} className="mt-14 w-full">
                        <div className="flex flex-col items-center">
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="YouTube URL 입력 (예: https://youtu.be/dQw4w9WgXcQ)"
                                className="border px-2 py-3 rounded w-4/5 mb-2 text-black"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                className="bg-black text-white px-2 py-3 w-4/5 rounded hover:bg-gray-800 disabled:bg-gray-400"
                                disabled={loading}
                            >
                                {loading ? '확인 중...' : '확인'}
                            </button>
                            {error && <div className="text-red-500 mt-2">{error}</div>}
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
        </div>
    );
}