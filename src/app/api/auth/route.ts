
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  console.log('Full callback URL:', request.url);

  if (code) {
    const supabase = createClient();
    const { data, error } = await (await supabase).auth.exchangeCodeForSession(code);

    console.log('Session data:', data);

    if (!error) {
      return NextResponse.redirect(`${origin}`);
    } else {
      console.error('Code exchange failed:', error.message);
    }
  } else {
    console.error('No code provided in callback');
  }
  

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}