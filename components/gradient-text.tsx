// GradientText.tsx
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

type GradientTextProps = {
  text: string
  colors: LinearGradientProps['colors']
} & TextProps

export const GradientText = ({
  text,
  colors,
  style,
  ...props
}: GradientTextProps) => {
  return (
    <MaskedView
      style={styles.maskedView}
      maskElement={
        <Text style={style} {...props}>
          {text}
        </Text>
      }
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[style, styles.hiddenText]} {...props}>
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  )
}

const styles = StyleSheet.create({
  maskedView: {
    flexDirection: 'row',
    height: 'auto',
  },
  hiddenText: {
    opacity: 0,
  },
})
