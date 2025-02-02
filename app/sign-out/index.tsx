// app/sign-out/index.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabaseClient';

const SignOutPage: React.FC = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/sign-in'); // Redirect on sign-out
  };

  return (
    <>
      <Button title='Sign Out' onPress={handleSignOut}/>
    </>
  );
};

export default SignOutPage;

