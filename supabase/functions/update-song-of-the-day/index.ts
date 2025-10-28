import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.5';

console.log('Starting update-song-of-the-day function...');

// This function is designed to be run on a schedule (e.g., once a day).
serve(async (req) => {
  try {
    // Use service_role_key for admin-level access to bypass RLS
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // 1. Get total count of songs
    const { count, error: countError } = await supabaseClient
      .from('songs')
      .select('id', { count: 'exact', head: true });

    if (countError || !count || count === 0) {
      throw new Error(`Failed to count songs or no songs available: ${countError?.message}`);
    }

    // 2. Pick a random song
    const randomIndex = Math.floor(Math.random() * count);
    const { data: randomSongs, error: randomError } = await supabaseClient
      .from('songs')
      .select('id') // We only need the ID
      .range(randomIndex, randomIndex);

    if (randomError || !randomSongs || randomSongs.length === 0) {
      throw new Error(`Failed to fetch a random song: ${randomError?.message}`);
    }
    const randomSongId = randomSongs[0].id;

    // 3. Delete all existing rows in song_of_the_day table.
    // This ensures only one song of the day exists.
    const { error: deleteError } = await supabaseClient
      .from('song_of_the_day')
      .delete()
      .neq('song_id', -1); // Dummy condition to delete all rows

    if (deleteError) {
      throw new Error(`Failed to delete old song of the day: ${deleteError.message}`);
    }

    // 4. Insert the new song of the day
    const today = new Date().toISOString().split('T')[0];
    const { error: insertError } = await supabaseClient
      .from('song_of_the_day')
      .insert({
        song_id: randomSongId,
        created_at: today,
      });

    if (insertError) {
      throw new Error(`Failed to insert new song of the day: ${insertError.message}`);
    }

    const successMsg = `Successfully set song of the day to song_id: ${randomSongId}`;
    console.log(successMsg);
    return new Response(JSON.stringify({ message: successMsg }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in update-song-of-the-day function:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
