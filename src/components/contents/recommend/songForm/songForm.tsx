"use client";
import { useSongForm } from '@/hooks/useSongForm';
import { availableGenre, Genre, genreColors } from '@/schemas/songSchema';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';

export default function SongForm({ user }: { user: User | null }) {
  const { register, handleSubmit, errors, isSubmitting, serverError, onSubmit, setValue, watch } = useSongForm(user);
  const selectedGenre = watch('genre');

  const selectGenre = (genre: Genre) => {
    setValue('genre', genre, { shouldValidate: true });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg w-96 h-[750px]">
      <div className="flex flex-col justify-between items-center h-full w-full">
        <form onSubmit={handleSubmit((data) => onSubmit({ ...data, genre: selectedGenre }))} className="w-full h-full flex flex-col">
          <div className="w-full my-6 flex flex-col items-center">
            <div className='w-4/5'>
              <p className="text-sm font-semibold mb-3 text-gray-700">URL 입력</p>
              <input
                {...register('url')}
                placeholder="YouTube URL 입력"
                className="border border-gray-200 px-2 py-3 w-full rounded mb-2 text-black"
                disabled={isSubmitting || !user}
              />
              {errors.url && <div className="text-red-500 text-sm">{errors.url.message}</div>}
            </div>
            <div className="w-4/5 my-6">
              <p className="text-sm font-semibold mb-3 text-gray-700">분위기 선택</p>
              <div className="flex flex-wrap gap-2">
                {availableGenre.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => selectGenre(genre)}
                    className={`px-4 py-1 rounded-lg text-sm font-normal border duration-200 
                      ${genreColors[genre].base} 
                      ${selectedGenre === genre ? `text-neutral-800 ${genreColors[genre].selected}` : 'text-neutral-400'} 
                      hover:text-neutral-800 ${isSubmitting || !user ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting || !user}
                  >
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </button>
                ))}
              </div>
              {errors.genre && <div className="text-red-500 text-sm mt-2">{errors.genre.message}</div>}
            </div>
            <button
              type="submit"
              className="bg-black mt-2 text-white px-2 py-3 w-4/5 rounded hover:bg-neutral-700 disabled:bg-neutral-400"
              disabled={isSubmitting || !user}
            >
              {isSubmitting ? '확인 중...' : user === null ? '로그인 후 이용 가능' : '확인'}
            </button>
            {serverError && <div className="text-red-500 mt-2">{serverError}</div>}
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