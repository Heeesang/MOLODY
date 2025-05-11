"use client";

import { useAuth } from "@/lib/context/authContext";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { user } = useAuth();
  const avatarUrl = user?.user_metadata?.avatar_url || null;

  return (
    <nav className="fixed w-full text-white h-16 border-b border-gray-200">
      <div className="max-w-[1140px] h-full m-auto flex">
        <div className="flex h-full w-full items-center justify-between">
          <div>
            <Link href="/">
              <Image
                  src="/molody_logo.svg"
                  alt="Molody Logo"
                  width={100}
                  height={40}
                  className=""
                />
            </Link>
          </div>
          <div className="flex items-center text-[#4E5968]">
            <div className="px-3">
              <a>무료 구독</a>
            </div>
            <div className="px-3">
              <a>음악 추천</a>
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