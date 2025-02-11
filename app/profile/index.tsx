import { supabase } from "@/lib/supabaseClient";
import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { Dimensions, Animated } from "react-native";
import { ArrowLeft, CogIcon, EllipsisVertical, X } from "lucide-react-native";
import { Easing } from "react-native-reanimated";
import Sidebar from "./components/Sidebar";

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
  const { width } = Dimensions.get("window");
  const isLargeScreen = width > 600;
  const profileImageSize = isLargeScreen ? 120 : 80;

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      setError("User not found");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
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

  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarPosition = useRef(new Animated.Value(300)).current; // Start off-screen
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // animation handlers
  const openSidebar = () => {
    setShowSidebar(true);
    Animated.parallel([
      Animated.timing(sidebarPosition, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0.4,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSidebar = () => {
    Animated.parallel([
      Animated.timing(sidebarPosition, {
        toValue: 300,
        duration: 250,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => setShowSidebar(false));
  };

  if (loading) return <ActivityIndicator size="large" color="#0ea5e9" />;
  if (error)
    return <Text className="text-red-500 text-lg text-center">{error}</Text>;
  return (
    <View className="flex-1 bg-white items-center">
      {/* setting icon with sidebar */}
      <View className="absolute top-1/3 right-0">
        <TouchableOpacity onPress={openSidebar}>
          <CogIcon size={24} color="#000" />
        </TouchableOpacity>
      </View>
      {showSidebar && (
        <Sidebar
          closeSidebar={closeSidebar}
          overlayOpacity={overlayOpacity}
          sidebarPosition={sidebarPosition}
        />
      )}
      <View className="w-full flex-row items-center justify-between p-4">
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
        {/* Header with Back Button */}
        <View className="flex-row items-center p-4 mt-2">
          <Text className="text-2xl font-bold ml-2">Profile</Text>
        </View>
        <TouchableOpacity>
          <EllipsisVertical color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View className="w-full items-center py-6">
        <View className="w-full flex-row items-center justify-around px-4">
          <View className="items-center">
            <Text className="text-lg font-semibold">1500</Text>
            <Text className="text-gray-500">Followers</Text>
          </View>
          {profile?.profile_picture_url ? (
            <Image
              source={{ uri: profile.profile_picture_url }}
              style={{
                width: profileImageSize,
                height: profileImageSize,
                borderRadius: profileImageSize / 2,
              }}
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-gray-300 items-center justify-center mb-4">
              <Text className="text-gray-500">No Image</Text>
            </View>
          )}
          <View className="items-center">
            <Text className="text-lg font-semibold">86</Text>
            <Text className="text-gray-500">Following</Text>
          </View>
        </View>

        <Text className="text-xl font-bold mt-2">{profile?.username}</Text>
        <Text className="text-gray-500">{profile?.email}</Text>

        {/* Stats */}
        <View className="flex-row justify-around w-full px-10 mt-4">
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
          {profile?.bio || "No bio available"}
        </Text>
      </View>

      {/* Posts Section */}
      <View className="w-full p-3">
        <Text className="text-gray-600 ">No Posts</Text>
      </View>
    </View>
  );
};

export default ProfilePage;
