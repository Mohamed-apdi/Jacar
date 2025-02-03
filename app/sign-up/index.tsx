import { View, Text, TextInput, Button, ActivityIndicator, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabaseClient';
import { ImagePlus } from "lucide-react-native"

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { width } = Dimensions.get('window');
    const isLargeScreen = width > 600;
    const paddingX = isLargeScreen ? 'px-20' : 'px-6';
    const profileImageSize = isLargeScreen ? 160 : 100;
    // Pick an image from the gallery
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use ImagePicker.MediaTypeOptions instead of ImagePicker.MediaType
            allowsEditing: true,
            aspect: [1, 1], 
            quality: 0.7, 
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
            console.log('Image URI:', result.assets[0].uri);
        }
    };

    // Upload image to Supabase Storage
    const uploadProfilePicture = async (userId: string, profileImage: string) => {
        if (!profileImage) return null;
    
        try {
            const response = await fetch(profileImage); // Fetch image from URI
            const blob = await response.blob(); // Convert to Blob
            const fileExt = profileImage.split('.').pop();
            const filePath = `profile_pictures/${userId}.${fileExt}`;
            
            // Convert blob to ArrayBuffer using a FileReader
            const arrayBuffer = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject(new Error('Failed to read blob as ArrayBuffer'));
                reader.readAsArrayBuffer(blob);
            });


            const { data, error } = await supabase.storage
                .from('jacar_upload') // Your bucket name
                .upload(filePath, arrayBuffer as ArrayBuffer, {
                    contentType: blob.type,
                    upsert: true, // Overwrite if exists
                });
    
            if (error) {
                console.error("Image Upload Error:", error);
                return null;
            }
    
            // Get the public URL
            const { data: publicUrlData } = supabase.storage
                .from('jacar_upload')
                .getPublicUrl(filePath);
            return publicUrlData.publicUrl;
        } catch (err) {
            console.error("Upload Failed:", err);
            return null;
        }
    };
    
    // Handle user sign-up
    const handleSignUp = async () => {
        if (!email || !password || !username) {
            setError("Please fill in all fields.");
            return;
        }

        if(!profileImage) {
            setError("Please select a profile picture.");
            return;
        }
    
        setLoading(true);
        setError("");
    
        try {
            // Sign up user
            const { data, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { username } },
            });
    
            if (authError) {
                setError(authError.message);
                return;
            }
            
            if (data.user) {
        // Upload profile picture
        const profilePicUrl = await uploadProfilePicture(data.user.id, profileImage);
        console.log('Profile Picture URL:', profilePicUrl);

        // Update the profile with the profile picture URL
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ profile_picture_url: profilePicUrl })
          .eq('id', data.user.id);

        if (updateError) {
          console.error("Profile update error:", updateError);
          setError(updateError.message);
          return;
        }

        router.replace('/sign-in');
      }
        } catch (err) {
            setError('An unexpected error occurred.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <View className="flex-1 justify-center p-4 bg-white">
            <View className='absolute top-0 right-0 left-0 bg-sky-400 h-[370px]'>
            <View className="flex-1 justify-center items-center mt-16">
            {/* Profile Picture Upload */}
            <TouchableOpacity onPress={pickImage} className="items-center my-auto ">
                {profileImage ? (
                    <Image source={{ uri: profileImage }} className="w-40 h-40 rounded-full" />
                ) : (
                    <View className="w-40 h-40 rounded-full bg-gray-200 items-center justify-center">
                        <ImagePlus color="gray" size={32}
                        style={{
                            width: profileImageSize, 
                            height: profileImageSize, 
                            borderRadius: profileImageSize / 2
                        }} 
                        />
                    </View>
                )}
            </TouchableOpacity>
            </View>
            </View>

            <View className={`bg-white rounded-t-[34px] py-10 w-ful ${paddingX}`} style={{ marginTop: isLargeScreen ? 32 : 160 }}>
                
            <Text className="text-4xl font-bold mb-4 text-center text-sky-500">Create new account</Text>
           
            {/* Email Input */}
            <TextInput 
                placeholder="Email" 
                onChangeText={setEmail} 
                value={email}
                className="border border-gray-400 p-3 mb-4 rounded"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            
            {/* Password Input */}
            <TextInput 
                placeholder="Password" 
                secureTextEntry 
                onChangeText={setPassword} 
                value={password}
                className="border border-gray-400 p-3 mb-4 rounded"
            />
            
            {/* Username Input */}
            <TextInput 
                placeholder="Username" 
                onChangeText={setUsername} 
                value={username}
                className="border border-gray-400 p-3 mb-4 rounded"
                autoCapitalize="none"
            />
            
            <TouchableOpacity 
                onPress={handleSignUp} 
                disabled={loading}
                className="bg-sky-500 p-3 rounded items-center"
            >
                <Text className="text-white font-bold">Sign Up</Text>
            </TouchableOpacity>

            {/* Sign In Redirect */}
            <View className="mt-4 items-center flex flex-row justify-center">
            <Text className="text-gray-500 text-center mr-1">Already have an account? Sign In</Text>
                <TouchableOpacity 
                    onPress={() => router.push('/sign-in')} 
                >
                <Text className="text-sky-500 text-center">Sign In</Text>
                </TouchableOpacity>
            </View>
            </View>
            {/* Loading Indicator & Errors */}
            {loading && <ActivityIndicator className="mt-4" />}
            {error ? <Text className="text-red-500 mt-4 text-center">{error}</Text> : null}
        </View>
    );
};

export default SignUpScreen;