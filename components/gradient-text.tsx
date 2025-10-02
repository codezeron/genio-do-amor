import { cn } from '@/utils/cn'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import React from 'react'
import { Text, TextProps } from 'react-native'

type GradientTextProps = {
  text: string
  colors: LinearGradientProps['colors']
} & TextProps

export const GradientText = ({ text, colors, ...props }: GradientTextProps) => {
  return (
    <MaskedView
      className="flex flex-row h-fit"
      maskElement={<Text {...props}>{text}</Text>}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...props} className={cn('opacity-0', props.className)}>
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  )
}
