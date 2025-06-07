import { View, Text, StatusBar, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { hp, wp } from '@/lib/common'
import { Theme } from '@/constants/Colors'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const Welcome = () => {
  const router = useRouter()
  return (
    <ScreenWrapper bg='white'>
      <StatusBar/>
      <View style={styles.container} className='flex-1 items-center justify-around'>
        {/* welcome image  */}
        <Image style={styles.img} resizeMode='contain' source={require('../../assets/images/welcome.png')} />
          
        {/* title */}
        <View style={{gap: 20}}>
          <Text style={styles.title}>Jacar!</Text>
          <Text style={styles.punchline}>Where every thought find a home and every image tells a story.</Text>
        </View>
        {/* footer login  */}
        <View style={styles.footer}>
          <Button 
            onPress={() => router.push("/sign-in")}
            title='Getting Started'
            buttonStyle={{marginHorizontal: wp(3)}}
            hasShadow={true}
          />

          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>
              Already have an account?
            </Text>
            <Pressable onPress={() => router.push("/sign-in")}>
              <Text style={[styles.loginText, {color: Theme.light.primary}]}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: wp(4)
  },
  img:{
    width: wp(100),
    height: wp(80),
    alignItems:"center",
  },
  title:{
    color: Theme.light.dark,
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: "800"
  },
  punchline:{
    color: Theme.light.text,
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    textAlign: "center",
    fontWeight: "500"
  },
  footer:{
    gap: 30,
    width: "100%",
  },
  bottomTextContainer:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5
  },
  loginText:{
    textAlign: "center",
    color: Theme.light.text,
    fontSize: hp(1.6),
  }
})