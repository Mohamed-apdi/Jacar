import { supabase } from '@/lib/supabaseClient';
import React, { useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { useFocusEffect } from 'expo-router';

interface Profile {
  id: string;
  username: string;
  email: string;
  bio: string;
  profile_picture_url: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(profile?.profile_picture_url);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError('User not found');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      setError(error.message);
    } else {
      setProfile(data);
    }
    setLoading(false);
  };

  // Fetch profile when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text className="text-red-500 text-lg">{error}</Text>;

  return (
    <View className="flex-1 items-center justify-center p-4 bg-gray-100">
      {profile?.profile_picture_url ? (
        <Image
          source={{ uri: profile.profile_picture_url }}
          className="w-24 h-24 rounded-full mb-4"
        />
      ) : (
        <View className="w-24 h-24 rounded-full bg-gray-300 items-center justify-center mb-4">
          <Text className="text-gray-500">No Image</Text>
        </View>
      )}
      <Text className="text-2xl font-bold">Username: {profile?.username}</Text>
      <Text className="text-lg text-gray-700">Email: {profile?.email}</Text>
      <Text className="text-gray-600 italic">
        {profile?.bio || 'No bio available'}
      </Text>
    </View>
  );
};

export default ProfilePage;
