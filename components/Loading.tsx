import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Theme } from '@/constants/Colors';

interface LoadingProps {
    size?: any;  
    color?: any;
}

const Loading = ({size="large", color = Theme.light.primary}:LoadingProps) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center',}}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loading