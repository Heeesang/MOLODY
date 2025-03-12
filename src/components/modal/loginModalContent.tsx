"use client";


import { supabase } from "@/lib/supabase/client";
import { useState } from "react";

export default function LoginModalContent() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const handleLogin = async () => {
        const redirectTo = 'http://localhost:3000/auth/callback';
        console.log('Initiating OAuth with redirectTo:', redirectTo);
    
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo,
            scopes: 'email profile openid',
            queryParams: {
                access_type: 'offline', // 오프라인 액세스 요청 (PKCE 유도)
                prompt: 'consent',      // 동의 화면 강제 표시
                response_type: 'code',  // code 반환 강제
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
            <input className="w-full h-11 border-2 p-3 rounded-lg"></input>
            <button className="w-full h-12 rounded-lg bg-black text-white">확인</button>
            <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="px-6 py-2 text-white bg-blue-500 rounded-lg"
            >
      </button>
        </div>
      </form>
    );
  }