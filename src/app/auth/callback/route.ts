
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/#';

  console.log('Full callback URL:', request.url);
  console.log('Code from query:', code);

  if (code) {
    const supabase = createClient();
    const { data, error } = await (await supabase).auth.exchangeCodeForSession(code);

    console.log('Session data:', data);
    console.log('Exchange error:', error);

    if (!error) {
      console.log('Redirecting to:', `${origin}${next}`);
      return NextResponse.redirect(`${origin}${next}`);
    } else {
      console.error('Code exchange failed:', error.message);
    }
  } else {
    console.error('No code provided in callback');
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}