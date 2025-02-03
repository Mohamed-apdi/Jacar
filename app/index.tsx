// app/index.tsx
import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';import { supabase } from '@/lib/supabaseClient';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const user = supabase.auth.getUser();
      setIsAuthenticated(!!user);
      setIsLoading(false);
    };

    checkUser();
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  return <Redirect href="/home" />; // or your authenticated route
}
