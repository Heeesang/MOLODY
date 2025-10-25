import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string, {
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
