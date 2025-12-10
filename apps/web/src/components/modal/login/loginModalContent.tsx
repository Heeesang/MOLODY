"use client";

import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { Button } from "../../ui/button";

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
    <form className="space-y-4">
      <div className="flex flex-col space-y-5">
        {user ? (
          <Button
            type="button"
            onClick={onSubscribe}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/80 text-lg font-medium border-2 border-primary rounded-lg flex items-center justify-center gap-5"
          >
            구독하기
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onLogin}
            className="w-full py-6 bg-white text-black hover:bg-neutral-200 text-lg font-medium border-2 border-secondary rounded-lg flex items-center justify-center gap-5"
          >
            <Image
              src="./googleIcon.svg"
              alt="Google icon"
              width={24}
              height={24}
            />
            Google 계정으로 로그인
          </Button>
        )}
        {message && <p className="text-center mt-2 text-muted-foreground">{message}</p>}
      </div>
    </form>
  );
}