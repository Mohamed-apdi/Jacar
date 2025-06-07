import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Theme } from '@/constants/Colors';
import { hp } from '@/lib/common';
import Loading from './Loading';

interface button {
    buttonStyle: any;
    textStyle?: any;
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    hasShadow?: boolean;
}

const Button = ({
    buttonStyle,
    textStyle,
    title = '',
    onPress = () => {},
    loading = false,
    hasShadow = true,
}: button) => {

    const shadowStyles = {
        shadowColor: Theme.light.dark,
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    }

    if(loading){
        return (
            <Pressable style={[styles.button, buttonStyle, {backgroundColor: "white"}]}>
               <Loading />
            </Pressable>
        )
    }
  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle, hasShadow && shadowStyles ]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: Theme.light.primary,
        height: hp(6.6),
        alignItems: 'center',
        justifyContent: 'center',
        borderCurve: "continuous",
        borderRadius: Theme.radius.xl,
    },
    text:{
        fontSize: hp(2.5),
        color: "white",
        fontWeight: "bold"
    }
})