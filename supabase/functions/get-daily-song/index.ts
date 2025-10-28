import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.5';

console.log('Hello from Functions!');

serve(async (req) => {
  // 관리자 권한 접근을 위해 service_role_key 사용
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  try {
    // 날짜 범위를 사용한 안정적인 확인을 위해 UTC 기준 시간 설정
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const startOfToday = today.toISOString();

    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    const startOfTomorrow = tomorrow.toISOString();

    // 1. 오늘 날짜의 일일 노래가 이미 존재하는지 확인 (범위 사용)
    const { data: existingDailySong, error: fetchError } = await supabaseClient
      .from('song_of_the_day')
      .select('*')
      .gte('created_at', startOfToday)
      .lt('created_at', startOfTomorrow)
      .maybeSingle(); // 여러 개가 반환될 가능성을 대비해 maybeSingle 사용

    if (fetchError) {
      console.error('Error fetching existing daily song:', fetchError);
      return new Response(JSON.stringify({ error: 'Failed to fetch daily song' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    if (existingDailySong) {
      // 항목이 존재하면, 해당 노래의 상세 정보를 가져와 반환
      const { data: song, error: songError } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', existingDailySong.song_id)
        .single();

      if (songError) {
        return new Response(JSON.stringify({ error: 'Failed to fetch song details' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 500,
        });
      }
      return new Response(JSON.stringify(song), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // 오늘 날짜의 일일 노래가 없으면, 404 응답 반환
    return new Response(JSON.stringify({ message: 'No daily song found for today.' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 404,
    });

  } catch (error) {
    console.error('Unexpected error in get-daily-song Edge Function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});