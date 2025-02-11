import { X } from "lucide-react-native";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import React from "react";
interface SidebarProps {
  closeSidebar: () => void;
  overlayOpacity: Animated.Value;
  sidebarPosition: Animated.Value;
}
const Sidebar = ({
  closeSidebar,
  overlayOpacity,
  sidebarPosition,
}: SidebarProps) => {
  return (
    <>
      <Animated.View
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      >
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={closeSidebar}
        />
      </Animated.View>

      <Animated.View
        className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl z-50"
        style={{
          transform: [{ translateX: sidebarPosition }],
          shadowOpacity: sidebarPosition.interpolate({
            inputRange: [0, 300],
            outputRange: [0.2, 0],
          }),
        }}
      >
        <View className="p-4 flex-row justify-between items-center border-b border-gray-200">
          <Text className="text-lg font-bold">Settings</Text>
          <TouchableOpacity onPress={closeSidebar}>
            <X size={24} color="#000" />
          </TouchableOpacity>
        </View>
        {/* Sidebar */}

        <View className="p-4">
          <TouchableOpacity className="py-3 border-b border-gray-200">
            <Text className="text-base">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3 border-b border-gray-200">
            <Text className="text-base">Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3 border-b border-gray-200">
            <Text className="text-base">Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3 border-b border-gray-200">
            <Text className="text-base">Privacy</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3">
            <Text className="text-base">Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

export default Sidebar;
