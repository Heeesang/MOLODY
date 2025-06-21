import { z } from 'zod';

export const songSchema = z.object({
  url: z
    .string()
    .min(1, 'URL을 입력하세요')
    .url('유효한 URL을 입력하세요')
    .regex(
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
      '유효한 YouTube URL을 입력하세요 (예: https://www.youtube.com/watch?v=...)'
    ),
});

export type SongFormData = z.infer<typeof songSchema>;