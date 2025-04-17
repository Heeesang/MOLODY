"use client";

import { User } from "@supabase/supabase-js";

interface LoginModalContentProps {
  user: User | null;
  loading: boolean;
  message: string;
  onLogin: () => void;
  onSubscribe: () => void;
}

export default function LoginModalContent({
  user,
  loading,
  message,
  onLogin,
  onSubscribe,
}: LoginModalContentProps) {
  return (
    <form className="">
      <div className="flex flex-col space-y-5">
        {loading ? (
          <div></div>
        ) : user ? (
          <button
            type="button"
            onClick={onSubscribe}
            disabled={loading}
            className="px-3 py-2.5 text-black font-medium border-2 rounded-lg flex text-lg items-center gap-5"
          >
            구독하기
          </button>
        ) : (
          <button
            type="button"
            onClick={onLogin}
            disabled={loading}
            className="px-3 py-2.5 text-black font-medium border-2 rounded-lg flex text-lg items-center gap-5"
          >
            <img src="./googleIcon.svg" className="w-6" alt="Google icon" />
            Google 계정으로 로그인
          </button>
        )}
        {message && <p className="text-center mt-2">{message}</p>}
      </div>
    </form>
  );
}