import { z } from 'zod';

export const availableMoods = ['팝', '발라드', '힙합', '밴드', 'R&B', '일렉트로닉'] as const;

export const moodColors: Record<typeof availableMoods[number], { base: string; accent: string; text: string }> = {
    팝: {
        base: 'bg-orange-100 border-orange-200 hover:bg-orange-300 hover:border-orange-600',
        accent: 'bg-orange-100 border-none',
        text: 'text-yellow-700',
    },
    발라드: {
        base: 'bg-lime-100 border-lime-200 hover:bg-lime-200 hover:border-lime-600',
        accent: 'bg-lime-100 border-none',
        text: 'text-blue-700',
    },
    힙합: {
        base: 'bg-pink-100 border-pink-200 hover:bg-pink-200 hover:border-pink-600',
        accent: 'bg-pink-100 border-none',
        text: 'text-gray-700',
    },
    일렉트로닉: {
        base: 'bg-sky-100 border-sky-200 hover:bg-sky-200 hover:border-sky-600',
        accent: 'bg-sky-100 border-none',
        text: 'text-red-700',
    },
    밴드: {
        base: 'bg-yellow-100 border-yellow-200 hover:bg-yellow-200 hover:border-yellow-600',
        accent: 'bg-yellow-100 border-none',
        text: 'text-orange-700',
    },
    "R&B": {
        base: 'bg-purple-100 border-purple-200 hover:bg-purple-200 hover:border-purple-600',
        accent: 'bg-purple-100 border-none',
        text: 'text-purple-700',
    },
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
});

export type SongFormData = z.infer<typeof songSchema>;