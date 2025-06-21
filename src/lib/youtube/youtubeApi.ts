import axios from 'axios';

export async function getYouTubeVideoInfo(url: string) {
  try {
    const videoId = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/)?.[1];
    if (!videoId) throw new Error('유효하지 않은 YouTube URL입니다.');
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: { id: videoId, key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY, part: 'snippet' },
    });
    const video = response.data.items[0];
    if (!video) throw new Error('비디오를 찾을 수 없습니다.');
    return {
      videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.medium.url,
    };
  } catch (error) {
    throw error;
  }
}