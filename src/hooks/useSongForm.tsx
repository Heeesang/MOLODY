import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { insertSong } from '@/lib/supabase/song/songService';
import { User } from '@supabase/supabase-js';
import { SongFormData, songSchema } from '@/schemas/songSchema';

export function useSongForm(user: User | null) {
    const [serverError, setServerError] = useState<React.ReactNode | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch,
    } = useForm<SongFormData>({
        resolver: zodResolver(songSchema),
        defaultValues: { url: '', genre: '팝' },
    });

    const onSubmit = async (data: SongFormData) => {
        setServerError(null);
        if (!user) {
            setServerError('로그인이 필요합니다. Google로 로그인해 주세요.');
            return;
        }

        try {
            const { existingSong } = await insertSong(data.url, user.id, data.genre);
            if (existingSong) {
                setServerError("이미 등록된 YouTube 영상입니다.");
                reset();
                return;
            }
            reset();
        } catch (err) {
            setServerError((err as Error).message);
        }
    };

    return { register, handleSubmit, errors, isSubmitting, serverError, onSubmit, setValue, watch };
}