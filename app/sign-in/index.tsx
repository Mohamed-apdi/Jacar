import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabaseClient";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    const { width } = Dimensions.get('window');
    const isLargeScreen = width > 600;
    const paddingX = isLargeScreen ? 'px-20' : 'px-6';
    const profileImageSize = isLargeScreen ? 160 : 100;

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.replace("/home");
    }

    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center p-4 bg-white">
      {/* Gradient Background */}
      <View className="absolute top-0 right-0 left-0 bg-sky-400 h-[400px]">
      <Text className="text-4xl font-bold text-center my-auto text-white">
          Hello, Welcome Back!
      </Text>
      </View>
      <View className="px-20 bg-white rounded-t-[34px] py-10">
        {/* Title */}
        <Text className="font-bold text-center text-sky-500 mb-6" style={{fontSize: isLargeScreen ? 36 : 20}}>
          Sign in to your account
        </Text>

        {/* Email Input */}
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-gray-400 p-3 mb-4 rounded-md text-base"
        />

        {/* Password Input */}
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          className="border border-gray-400 p-3 mb-4 rounded-md text-base"
        />

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={handleSignIn}
          disabled={loading}
          className="bg-sky-500 p-4 rounded-md items-center"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Sign Up Redirect */}
        <View className="mt-4 items-center flex flex-row justify-center">
          <Text className="text-gray-500 text-center mr-1">Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <Text className="text-sky-500 text-center underline">Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {error && <Text className="text-red-500 text-center mt-4">{error}</Text>}
      </View>
    </View>
  );
};

export default SignInScreen;
