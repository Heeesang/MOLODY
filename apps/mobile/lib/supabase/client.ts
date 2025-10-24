import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY} from '@env';

if (!EXPO_PUBLIC_SUPABASE_URL || !EXPO_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL or Anon Key is missing from .env file.');
}

export const supabase = createClient(EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY, {
  auth: {
    // In React Native, we need to use a custom storage provider.
    // We will use AsyncStorage.
    // It is recommended to use a library like `expo-secure-store` for better security.
    // For now, we will use a simple polyfill.
    storage: require('react-native-url-polyfill/auto').AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
