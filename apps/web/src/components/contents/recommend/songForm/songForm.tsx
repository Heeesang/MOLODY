"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { availableGenre, Genre, genreColors } from "@/schemas/songSchema";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { insertSongAction } from "@/app/actions/songInsertAction.";

export default function SongForm({ user }: { user: User | null }) {
  const [state, formAction] = useActionState(insertSongAction, { error: null });
  const [selectedGenre, setSelectedGenre] = useState<Genre>("팝");

  return (
    <div className="bg-white border border-gray-200 rounded-lg w-full lg:h-[750px]">
      <div className="flex flex-col justify-between items-center h-full w-full px-5">
        <form action={formAction} className="w-full h-full flex flex-col">
          <div className="w-full my-6 flex flex-col items-center">
            <div className="w-full">
              <p className="text-sm font-semibold mb-3 text-gray-700">URL 입력</p>
              <input
                name="url"
                placeholder="YouTube URL 입력"
                className="border border-gray-200 px-2 py-3 w-full rounded mb-2 text-black"
                disabled={user === null}
              />
            </div>
            <div className="w-full my-6">
              <p className="text-sm font-semibold mb-3 text-gray-700">분위기 선택</p>
              <div className="flex flex-wrap gap-2">
                {availableGenre.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-3 py-1 rounded-lg text-sm font-normal border duration-200 
                      ${genreColors[genre].base} 
                      ${selectedGenre === genre ? `text-neutral-800 ${genreColors[genre].selected}` : 'text-neutral-400'} 
                      hover:text-neutral-800 ${user === null ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={user === null}
                  >
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </button>
                ))}
              </div>
              <input type="hidden" name="genre" value={selectedGenre} />
            </div>
            <SubmitButton user={user} />
            {state.error && <div className="text-red-500 mt-2">{state.error}</div>}
            <div className="w-full">
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
          className="hidden mb-14 lg:block"
        />
      </div>
    </div>
  );
}

function SubmitButton({ user }: { user: User | null }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-black mt-2 text-white px-2 py-3 w-full rounded hover:bg-neutral-700 disabled:bg-neutral-400"
      disabled={pending || !user}
    >
      {pending ? "확인 중..." : user === null ? "로그인 후 이용 가능" : "확인"}
    </button>
  );
}