export const dynamic = 'force-dynamic';

import MyPageContent from "@/components/contents/myPage/myPageContent";
import { getSongsByUserId } from "@/lib/supabase/song/songService";
import { createClient, getUser } from "@/lib/supabase/server";
import { Song } from "@/types/song";
import { redirect } from "next/navigation";

const MyPage = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/auth/auth-code-error");
  }

  const supabase = await createClient();
  const songs = (await getSongsByUserId(supabase, user.id)) as Song[];

  return <MyPageContent songs={songs} />;
};

export default MyPage;