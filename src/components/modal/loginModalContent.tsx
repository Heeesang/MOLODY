"use client";


import { supabase } from "@/lib/supabase/client";
import { useState } from "react";

export default function LoginModalContent() {
    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        const redirectTo = 'http://localhost:3000/auth/callback';
        console.log('Initiating OAuth with redirectTo:', redirectTo);
    
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo,
            scopes: 'email profile openid',
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
              },
          },
        });
    
        if (error) {
          console.error('OAuth initiation failed:', error.message);
        } else {
          console.log('OAuth initiated:', data);
          window.location.href = data.url;
        }
      };

    return (
      <form className="">
        <div className="flex flex-col space-y-5">
            <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="px-3 py-2.5 text-black font-medium border-2 rounded-lg flex text-lg items-center gap-5"
            >
                <img src="./googleIcon.svg" className="w-6"/>
                Google 계정으로 로그인
            </button>
        </div>
      </form>
    );
  }