"use client";
import { useSongForm } from '@/hooks/useSongForm';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';

export default function SongForm({ user }: { user: User | null }) {
  const { register, handleSubmit, errors, isSubmitting, serverError, onSubmit } = useSongForm(user);

  return (
    <div className="bg-white border border-gray-200 rounded-lg w-96 h-9/12">
      <div className="flex flex-col justify-between items-center h-full w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
          <div className="flex flex-col items-center mt-14">
            <input
              {...register('url')}
              placeholder="YouTube URL 입력"
              className="border border-gray-200 px-2 py-3 rounded w-4/5 mb-2 text-black"
              disabled={isSubmitting || !user}
            />
            <button
              type="submit"
              className="bg-black text-white px-2 py-3 w-4/5 rounded hover:bg-neutral-700 disabled:bg-neutral-400"
              disabled={isSubmitting || !user}
            >
              {isSubmitting ? '확인 중...' : user === null ? '로그인 후 이용 가능' : '확인'}
            </button>
            {errors.url && <div className="text-red-500 mt-2">{errors.url.message}</div>}
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