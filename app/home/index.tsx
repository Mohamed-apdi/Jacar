import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Button, ButtonText } from '@/components/ui/button';
import ScreenWrapper from '@/components/ScreenWrapper';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
              <View className="mt-4 items-center flex flex-row justify-center">
                <TouchableOpacity onPress={() => router.push("/profile")} >
                  <Text className="text-center bg-sky-500 p-4 rounded-md text-white text-2xl">Profile</Text>
                </TouchableOpacity>
                <Button size="md" variant="solid" action="primary" onPress={() => router.push("/profile")}>
                  <ButtonText>Profile</ButtonText>
                </Button>
              </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;
