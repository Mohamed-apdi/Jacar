import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  return (
    <View>
      <Text>Welcome to Home Screen Jacar</Text>
              <View className="mt-4 items-center flex flex-row justify-center">
                <TouchableOpacity onPress={() => router.push("/profile")} className=' '>
                  <Text className="text-center bg-sky-500 p-4 rounded-md text-white text-2xl">Profile</Text>
                </TouchableOpacity>
              </View>
    </View>
  );
};

export default HomeScreen;
