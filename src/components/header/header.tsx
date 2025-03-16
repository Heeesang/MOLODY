"use client";

import { supabase } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

export default function Header() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setAvatarUrl(session.user.user_metadata?.avatar_url || null);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setAvatarUrl(session?.user?.user_metadata?.avatar_url || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="fixed w-full text-white h-16">
      <div className="max-w-[1140px] h-full m-auto flex">
        <div className="flex h-full w-full items-center justify-between">
          <div>
            <img src="./molody_logo.svg" alt="Molody Logo" className="" />
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
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}