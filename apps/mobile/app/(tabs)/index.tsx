import { FONTS } from '@molody/core';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { SvgUri } from 'react-native-svg';
import { Asset } from 'expo-asset';

const molodyMobileSvgUri = Asset.fromModule(require('../../assets/images/molodyMobile.svg')).uri;

export default function HomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'Kanit-Bold': require('../../assets/fonts/Kanit-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: FONTS.KanitBold }}>
          MOLODY
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">오늘의</ThemedText>
        <SvgUri
          width="200"
          height="50"
          uri={molodyMobileSvgUri}
          style={styles.molodyLogo}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginTop: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
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
});
