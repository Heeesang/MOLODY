"use server";

import { revalidatePath } from "next/cache";
import { songSchema } from "@/schemas/songSchema";
import { getYouTubeVideoInfo } from "@/lib/youtube/youtubeApi";
import { SongData } from "@/lib/supabase/song/songService";
import { createClient, getUser } from "@/lib/supabase/server";

export async function insertSongAction(
    state: { error: string | null },
    formData: FormData
): Promise<{ error: string | null }> {
    const supabase = await createClient()
    const user = await getUser();
    if (!user) {
        return { error: "로그인이 필요합니다. Google로 로그인해 주세요." };
    }

    const parsedData = songSchema.safeParse({
        url: formData.get("url"),
        genre: formData.get("genre"),
    });

    if (!parsedData.success) {
        return { error: "유효하지 않은 입력입니다. URL과 장르를 확인해 주세요." };
    }

    const { url, genre } = parsedData.data;

    try {
        const videoInfo = await getYouTubeVideoInfo(url);
        const { data: existingSong } = await supabase
            .from("songs")
            .select()
            .eq("video_id", videoInfo.videoId)
            .single();

        if (existingSong) {
            return { error: "이미 등록된 YouTube 영상입니다." };
        }

        const songData: SongData = {
            youtube_url: url,
            video_id: videoInfo.videoId,
            title: videoInfo.title,
            thumbnail_url: videoInfo.thumbnail,
            user_id: user.id,
            genre,
        };

        const { error } = await supabase
            .from("songs")
            .insert(songData)
            .select()
            .single();

        if (error) {
            return { error: `노래 등록 실패: ${error.message}` };
        }

        revalidatePath("/recommend");
    } catch (err) {
        return { error: (err as Error).message };
    }

    return { error: null };
}