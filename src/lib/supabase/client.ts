import { createBrowserClient } from '@supabase/ssr';

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookieOptions: {
      name: 'sb',
      secure: true, // HTTPS에서만 전송
      httpOnly: true, // 자바스크립트로 접근 불가
      sameSite: 'lax', // CSRF 방지
    },
  }
);
