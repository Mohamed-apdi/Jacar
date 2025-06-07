import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ScreenWrapperProps {
  children: React.ReactNode;
  bg?: string;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, bg }) => {

    const { top } = useSafeAreaInsets();
    const PaddingTop = top > 0 ? top + 5 : 20;
  return (
    <View style={{ flex: 1, padding: PaddingTop, backgroundColor: bg, }}>
      {children}
    </View>
  )
}

export default ScreenWrapper  