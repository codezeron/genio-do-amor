import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import React from 'react'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import '../styles/global.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
})

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: '💜 Gênio do amor 💜',
              headerTitleAlign: 'center',
              headerTintColor: '#C084FC',
            }}
          />
        </Stack>
      </KeyboardProvider>
    </QueryClientProvider>
  )
}
