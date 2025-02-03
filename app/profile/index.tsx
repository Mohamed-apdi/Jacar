import { supabase } from '@/lib/supabaseClient'; 
import React, { useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

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
  const router = useRouter();
  const { width } = Dimensions.get('window');
  const isLargeScreen = width > 600;
  const profileImageSize = isLargeScreen ? 120 : 80;

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

  if (loading) return <ActivityIndicator size="large" color="#0ea5e9" />;
  if (error) return <Text className="text-red-500 text-lg text-center">{error}</Text>;

  return (
    <View className="flex-1 bg-white items-center relative">
      <TouchableOpacity onPress={() => router.replace('/home')} style={{ position: 'absolute', top: 20, left: 10 }}>
        <ArrowLeft size={24} color="black" />
      </TouchableOpacity>
      {/* Header with Back Button */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <Text className="text-lg font-bold ml-2">Profile</Text>
      </View>
      {/* Profile Section */}
      <View className="w-full items-center py-6">
        {profile?.profile_picture_url ? (
          <Image
            source={{ uri: profile.profile_picture_url }}
            style={{
              width: profileImageSize, 
              height: profileImageSize, 
              borderRadius: profileImageSize / 2
            }} 
          />
        ) : (
          <View className="w-24 h-24 rounded-full bg-gray-300 items-center justify-center mb-4">
            <Text className="text-gray-500">No Image</Text>
          </View>
        )}

        <Text className="text-xl font-bold mt-2">{profile?.username}</Text>
        <Text className="text-gray-500">{profile?.email}</Text>

        {/* Stats */}
        <View className="flex-row justify-around w-full px-10 mt-4">
          <View className="items-center">
            <Text className="text-lg font-semibold">1500</Text>
            <Text className="text-gray-500">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-semibold">86</Text>
            <Text className="text-gray-500">Following</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-semibold">0</Text>
            <Text className="text-gray-500">Posts</Text>
          </View>
        </View>

        {/* Follow Button */}
        <TouchableOpacity className="mt-4 bg-sky-500 px-10 py-2 rounded-full items-center">
          <Text className="text-white font-bold w-40 text-center">FOLLOW</Text>
        </TouchableOpacity>
      </View>

      {/* Bio Section */}
      <View className="px-10 py-4 w-full  border-b border-gray-200">
        <Text className="text-gray-600 italic text-center">
          {profile?.bio || 'No bio available'}
        </Text>
      </View>

      {/* Posts Section */}
      <View className='w-full p-3'>
        <Text className="text-gray-600 ">No Posts</Text>
      </View>
    </View>
  );
};

export default ProfilePage;
