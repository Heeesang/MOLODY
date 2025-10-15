"use client";

import { User } from "@supabase/supabase-js";
import Image from "next/image";

interface LoginModalContentProps {
  user: User | null;
  message: string;
  onLogin: () => void;
  onSubscribe: () => void;
}

export default function LoginModalContent({
  user,
  message,
  onLogin,
  onSubscribe,
}: LoginModalContentProps) {
  return (
    <form className="">
      <div className="flex flex-col space-y-5">
        {user ? (
          <button
            type="button"
            onClick={onSubscribe}
            className="px-3 py-2.5 text-black font-medium border-2 rounded-lg flex text-lg items-center gap-5"
          >
            구독하기
          </button>
        ) : (
          <button
            type="button"
            onClick={onLogin}
            className="px-3 py-2.5 text-black font-medium border-2 rounded-lg flex text-lg items-center gap-5"
          >
            <Image 
              src="./googleIcon.svg"
              alt="Google icon"
              width={24}
              height={24}
            />
            Google 계정으로 로그인
          </button>
        )}
        {message && <p className="text-center mt-2">{message}</p>}
      </div>
    </form>
  );
}