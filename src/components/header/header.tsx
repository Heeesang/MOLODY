"use client";

import { useAuth } from "@/lib/context/authContext";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { user } = useAuth();
  const avatarUrl = user?.user_metadata?.avatar_url || null;

  return (
    <nav className="fixed w-full h-16 bg-white">
      <div className="max-w-[1140px] h-full m-auto flex">
        <div className="flex h-full w-full items-center justify-between">
          <div>
            <Link href="/">
              <Image
                  src="/molody_logo.svg"
                  alt="Molody Logo"
                  width={90}
                  height={30}
                />
            </Link>
          </div>
          <div className="flex items-center text-neutral-500">
            <div className="px-3">
              <a className="font-normal">무료 구독</a>
            </div>
            <div className="px-3">
              <Link href="/recommend">
                음악 추천
              </Link>
            </div>
            {avatarUrl && (
              <div className="px-3">
                <Image
                  src={avatarUrl}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}