import { createClient } from '@/lib/supabase/server';
import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST() {
  const supabase = await createClient();
  const { data: subscribers, error } = await supabase
    .from('subscribers')
    .select('email');

  if (error || !subscribers || subscribers.length === 0) {
    console.error('구독자 조회 오류:', error?.message);
    return NextResponse.json({ error: '구독자 없음 또는 조회 실패' }, { status: 500 });
  }

  console.log('구독자 이메일 목록:', subscribers.map(s => s.email));

  const musicLinks = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=9bZkp7q19f0',
    'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
  ];
  const randomLink = musicLinks[Math.floor(Math.random() * musicLinks.length)];

  const emailPromises = subscribers.map((subscriber) =>
    sgMail.send({
      to: subscriber.email,
      from: { email: 'molodymail@gmail.com', name: 'MusicBot' },
      replyTo: 'molodymail@gmail.com',
      subject: '오늘의 음악 추천 🎵',
      html: `
        <h1>좋은 아침이에요!</h1>
        <p>오늘의 추천 음악: <a href="${randomLink}">${randomLink}</a></p>
        <p>즐거운 하루 보내세요!</p>
        <p><small>구독 취소하려면 <a href="mailto:heeficial05@gmail.com">여기로</a> 연락주세요.</small></p>
      `,
    })
  );

  try {
    await Promise.all(emailPromises);
    console.log(`이메일 전송 완료: ${subscribers.length}명`);
    console.log(`이메일 전송: ${subscribers}`)
    return NextResponse.json({ message: `이메일 전송 완료: ${subscribers.length}명` });
  } catch (err) {
    console.error('이메일 전송 오류:', err);
    return NextResponse.json({ error: '이메일 전송 실패' }, { status: 500 });
  }
}