import { z } from 'zod';

export const availableGenre = ['팝', '발라드', '힙합', '밴드', 'R&B', '일렉트로닉'] as const;
export type Genre = typeof availableGenre[number];

export const genreColors = {
    팝: { base: 'bg-orange-100 border-orange-200 hover:bg-orange-300 hover:border-orange-600', selected: 'bg-orange-200 border-orange-600' },
    발라드: { base: 'bg-lime-100 border-lime-200 hover:bg-lime-200 hover:border-lime-600', selected: 'bg-lime-200 border-lime-600' },
    힙합: { base: 'bg-pink-100 border-pink-200 hover:bg-pink-200 hover:border-pink-600', selected: 'bg-pink-200 border-pink-600' },
    일렉트로닉: { base: 'bg-sky-100 border-sky-200 hover:bg-sky-200 hover:border-sky-600', selected: 'bg-sky-200 border-sky-600' },
    밴드: { base: 'bg-yellow-100 border-yellow-200 hover:bg-yellow-200 hover:border-yellow-600', selected: 'bg-yellow-200 border-yellow-600' },
    "R&B": { base: 'bg-purple-100 border-purple-200 hover:bg-purple-200 hover:border-purple-600', selected: 'bg-purple-200 border-purple-600' },
};

export const songSchema = z.object({
    url: z
        .string()
        .min(1, 'URL을 입력하세요')
        .url('유효한 URL을 입력하세요')
        .regex(
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
            '유효한 YouTube URL을 입력하세요 (예: https://www.youtube.com/watch?v=...)'
        ),
    genre: z.enum(availableGenre, { message: '장르를 선택해주세요.' }),
});

export type SongFormData = z.infer<typeof songSchema>;