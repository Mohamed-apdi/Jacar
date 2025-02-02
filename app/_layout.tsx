import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Slot, useRouter } from 'expo-router';
import "../global.css";
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthState = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (!session) {
        router.replace('/sign-in'); // Use replace instead of push to prevent going back
      }
    };

    checkAuthState();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) {
          router.replace('/sign-in');
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []); // ✅ Added [] to prevent infinite re-renders

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Slot />
    </SafeAreaView>
  );
}
