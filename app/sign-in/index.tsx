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
import ScreenWrapper from "@/components/ScreenWrapper";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


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
  };76

  return (
    <ScreenWrapper bg="white">
      <View className="flex-1 items-center justify-center p-4 w-full">
        {/* Title */}
        <Text className="font-bold text-center text-sky-500" >
          Sign in to your account
        </Text>

        {/* Email Input */}
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-gray-400 p-3 mb-4 rounded-md text-base w-full"
        />

        {/* Password Input */}
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          className="border border-gray-400 p-3 mb-4 rounded-md text-base w-full"
        />

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={handleSignIn}
          disabled={loading}
          className="bg-sky-500 p-4 rounded-md items-center w-full"
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
    </ScreenWrapper>
  );
};

export default SignInScreen;
