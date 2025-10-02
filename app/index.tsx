import { InputArea } from '@/components/chat/input-area'
import { MessageBubble } from '@/components/chat/message-bubble'
import { useAdviceGenerator } from '@/hooks/use-advice-generator'
import {
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-controller'
import { SafeAreaView } from 'react-native-safe-area-context'

import { GradientText } from '@/components/gradient-text'
import { TMessage } from '@/types/message'
import React, { useState } from 'react'
import { FlatList, Text, View } from 'react-native'

export default function Index() {
  const [messages, setMessages] = useState<TMessage[]>([])
  const [inputText, setInputText] = useState('')

  const { mutateAsync: generateAdvice, isPending: isLoading } =
    useAdviceGenerator({
      onError: () =>
        alert('Erro ao gerar conselho. Por favor, tente novamente.'),
    })

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const newUserMessage: TMessage = { role: 'user', content: inputText }
    setMessages(prev => [...prev, newUserMessage])
    setInputText('')

    const response = (await generateAdvice({ inputText })) || ''
    const newAgentMessage: TMessage = { role: 'agent', content: response }
    setMessages(prev => [...prev, newAgentMessage])
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={'padding'}
        keyboardVerticalOffset={100}
      >
        <View className="flex-1 px-4">
          <View className="flex flex-col gap-2 py-6">
            <GradientText
              text="Gênio do Amor"
              className="text-5xl font-bold text-center w-full"
              colors={['#C084FC', '#F472B6']}
            />
            <Text className="text-lg text-gray-700 text-center">
              Desperte a magia dos relacionamentos com conselhos sábios do
              universo do amor
            </Text>
          </View>
          <FlatList
            className="w-full flex-1 p-2"
            data={messages}
            keyExtractor={(_, idx) => idx.toString()}
            renderScrollComponent={props => (
              <KeyboardAwareScrollView className="flex flex-1" {...props} />
            )}
            renderItem={({ item }) => <MessageBubble message={item} />}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={true}
          />
          <View className="pb-2">
            <InputArea
              value={inputText}
              onChange={setInputText}
              onSubmit={handleSendMessage}
              disabled={isLoading || !inputText.trim()}
              isLoading={isLoading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
