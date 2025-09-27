import { GradientText } from '@/components/gradient-text'
import { useAdviceGenerator } from '@/hooks/use-advice-generator'
import { Message } from '@/types/message'
import { cn } from '@/utils/cn'
import { MotiView } from 'moti'
import React, { useState } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')

  const {
    data: answer,
    mutateAsync: generateAdvice,
    isPending: isLoading,
  } = useAdviceGenerator({
    onError: () => alert('Erro ao gerar conselho. Por favor, tente novamente.'),
  })

  const handleSubmit = async () => {
    if (!inputText.trim()) return

    setMessages(prev => [...prev, { role: 'user', content: inputText }])
    setInputText('')
    const response = (await generateAdvice({ inputText })) || ''
    setMessages(prev => [...prev, { role: 'agent', content: response }])
  }

  return (
    <View className="flex-1 flex flex-col items-center justify-between bg-white container mx-auto px-4 py-16">
      {!answer && <View />}
      <View className="flex w-full items-center gap-6">
        <GradientText
          text="Gênio do Amor"
          className="text-5xl font-bold text-center"
          colors={['#C084FC', '#F472B6']}
        />
        <Text className="text-xl text-gray-700 text-center">
          Desperte a magia dos relacionamentos com conselhos sábios do universo
          do amor
        </Text>

        <ScrollView className="w-full max-h-[45vh]">
          {messages.map((message, idx) => (
            <MotiView
              key={idx}
              from={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              className={cn(
                'border border-gray-300 w-fit rounded-xl my-2 p-3',
                message.role === 'user'
                  ? 'bg-purple-100 self-end'
                  : 'bg-white self-start',
              )}
            >
              <Text
                className={cn(
                  'text-purple-700 font-bold mb-1',
                  message.role === 'user' && 'text-right',
                )}
              >
                {message.role === 'user' ? 'Você:' : 'Gênio:'}
              </Text>
              <Text className={cn(message.role === 'user' && 'text-right')}>
                {message.content}
              </Text>
            </MotiView>
          ))}
        </ScrollView>
      </View>

      <View className="flex flex-col gap-2 w-full">
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          className="w-full items-start px-4 h-fit rounded-lg border border-gray-300"
          placeholder="Qual é a sua dúvida amorosa?"
        />
        <TouchableOpacity
          disabled={isLoading || !inputText.trim()}
          className="p-2 w-full rounded-md flex items-center justify-center bg-purple-500 disabled:opacity-50"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold text-lg">
            {isLoading ? 'Pensando...' : 'Gerar conselho infalível!'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
