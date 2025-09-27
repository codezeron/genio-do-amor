import { MotiView } from 'moti'
import React, { ReactNode } from 'react'
import { ViewProps } from 'react-native'
import { Easing } from 'react-native-reanimated'

type AnimatedViewProps = {
  children?: ReactNode
  delay?: number
  duration?: number
} & ViewProps

export const AnimatedFloatView: React.FC<AnimatedViewProps> = ({
  children,
  delay = 0,
  duration = 3000,
  style,
  ...props
}) => {
  return (
    <MotiView
      style={style}
      from={{ translateY: -5 }}
      animate={{ translateY: 5 }}
      transition={{
        type: 'timing',
        duration: duration / 2,
        easing: Easing.inOut(Easing.ease),
        loop: true,
        delay: delay,
      }}
      {...props}
    >
      {children}
    </MotiView>
  )
}
