import { FONTS } from '@molody/core'; // Removed getRandomSong import
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Image, ActivityIndicator, View, Text, ScrollView } from 'react-native'; // Added ActivityIndicator, View, Text, ScrollView
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { SvgUri } from 'react-native-svg';
import { Asset } from 'expo-asset';
import { supabase } from '../../lib/supabase/client';
import { getLatestSongs } from '@molody/core/songService';
import { SongData } from '@molody/core/types';

const molodyMobileSvgUri = Asset.fromModule(require('../../assets/images/molodyMobile.svg')).uri;

interface Song {
  id: string;
  title: string;
  thumbnail_url?: string;
}

export default function HomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'Kanit-Bold': require('../../assets/fonts/Kanit-Bold.ttf'),
  });
  const [dailySong, setDailySong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [latestSongs, setLatestSongs] = useState<SongData[]>([]);
  const [loadingLatestSongs, setLoadingLatestSongs] = useState(true);
  const [errorLatestSongs, setErrorLatestSongs] = useState<string | null>(null);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }

    const fetchDailySong = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: functionError } = await supabase.functions.invoke('get-daily-song');

        if (functionError) {
          console.error('Error invoking get-daily-song function:', functionError);
          setError('Failed to load daily song.');
          return;
        }

        if (data) {
          setDailySong(data as Song);
        } else {
          setError('No daily song found.');
        }
      } catch (err) {
        console.error('Unexpected error fetching daily song:', err);
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    const fetchLatestSongs = async () => {
      try {
        setLoadingLatestSongs(true);
        setErrorLatestSongs(null);
        const songs = await getLatestSongs(supabase, 5);
        setLatestSongs(songs);
      } catch (err) {
        console.error('Error fetching latest songs:', err);
        setErrorLatestSongs('Failed to load latest songs.');
      } finally {
        setLoadingLatestSongs(false);
      }
    };

    fetchDailySong();
    fetchLatestSongs();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={{ fontFamily: FONTS.KanitBold }}>
            MOLODY
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">오늘의</ThemedText>
          <SvgUri
            width="120"
            height="40"
            uri={molodyMobileSvgUri}
            style={styles.molodyLogo}
          />
        </ThemedView>

        <ThemedView style={styles.dailySongSection}>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : error ? (
            <ThemedText style={styles.errorText}>오류: {error}</ThemedText>
          ) : dailySong ? (
            <ThemedView style={styles.songCard}>
              {dailySong.thumbnail_url && (
                <Image source={{ uri: dailySong.thumbnail_url }} style={styles.thumbnail} />
              )}
              <ThemedText type="defaultSemiBold" style={styles.songTitle} numberOfLines={1} ellipsizeMode="tail">{dailySong.title}</ThemedText>
            </ThemedView>
          ) : (
            <ThemedText>오늘의 추천곡이 없습니다.</ThemedText>
          )}
        </ThemedView>
        <ThemedView style={[styles.stepContainer, { marginTop: 40 }]}>
          <ThemedText type="subtitle">추천 노래</ThemedText>
        </ThemedView>

        <ThemedView style={styles.latestSongsSection}>
          {loadingLatestSongs ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : errorLatestSongs ? (
            <ThemedText style={styles.errorText}>오류: {errorLatestSongs}</ThemedText>
          ) : latestSongs.length > 0 ? (
            latestSongs.map((song) => (
              <ThemedView key={song.video_id} style={styles.latestSongItem}>
                <Image source={{ uri: song.thumbnail_url }} style={styles.latestSongThumbnail} />
                <ThemedView style={{ flex: 1, justifyContent: 'center' }}>
                  <ThemedText type="defaultSemiBold" numberOfLines={1} ellipsizeMode="tail">{song.title}</ThemedText>
                  <ThemedText style={styles.latestSongDate}>{new Date(song.created_at).toLocaleDateString()}</ThemedText>
                </ThemedView>
                <ThemedText>{song.genre}</ThemedText>
              </ThemedView>
            ))
          ) : (
            <ThemedText>최신 노래가 없습니다.</ThemedText>
          )}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  stepContainer: {
    gap: 1,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  dailySongSection: {
    width: '100%',
    marginTop: 6,
    alignItems: 'center',
  },
  songCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  songTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    lineHeight: 32,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'contain',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  molodyLogo: {
    width: 50,
    height: 50,
    marginLeft: 5,
  },
  latestSongsSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  latestSongItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 18,
  },
  latestSongThumbnail: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  latestSongDate: {
    fontSize: 12,
    color: '#666',
  },
});


