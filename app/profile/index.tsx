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
import { ArrowLeft, BadgeCheck, CogIcon, EllipsisVertical, MessageCircle, X } from "lucide-react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
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

  const sidebarPosition = useRef(new Animated.Value(300)).current; // Start off-screen
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  if (loading) return <ActivityIndicator size="large" color="#0ea5e9" />;
  if (error)
    return <Text className="text-red-500 text-lg text-center">{error}</Text>;
  return (
    <View className="flex-1 bg-white items-center">
   
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
            <Text className="text-lg font-semibold">120</Text>
            <Text className="text-gray-500">Post</Text>
          </View>
          <Divider
          orientation="vertical"
          className="h-[25px] w-[0.5px]  bg-gray-600"
          />
          <View className="items-center">
            <Text className="text-lg font-semibold">1.5M</Text>
            <Text className="text-gray-500">Friends</Text>
          </View>
          <Divider
          orientation="vertical"
          className="h-[25px] w-[0.5px]  bg-gray-600"
          />
          <View className="items-center">
            <Text className="text-lg font-semibold">906</Text>
            <Text className="text-gray-500">Following</Text>
          </View>
        </View>

        <View className="flex items-start justify-start w-full px-10">
        <View className="flex-row gap-3 items-start justify-start">
          <Text className="text-xl font-bold mt-2">{profile?.username}</Text>
          <MaterialIcons name="verified" size={18} color="#0ea5e9" />
        </View>
        <Text className="text-gray-600 italic text-start">
          {profile?.bio || "No bio available"}
        </Text>
        </View>
        

        {/* Follow Button */}
        <View className="w-full flex-row justify-around my-4">
        <Button className="py-1.5 px-8 w-36 bg-sky-400">
          <ButtonText>
            Follow
          </ButtonText>
        </Button>
        <Button className="p-5 bg-sky-400 rounded-full">
         <MessageCircle color="#ffff" size={24} />
        </Button>
        </View>
      </View>

      {/* Bio Section */}
     
      <Divider className="w-full h-[0.5px] bg-gray-600 px-10"
          />
      {/* Posts Section */}
      <View className="w-full p-3">
        <Text className="text-gray-600 ">No Posts</Text>
      </View>
    </View>
  );
};

export default ProfilePage;
