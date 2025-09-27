import { useAdviceGenerator } from '@/hooks/use-advice-generator'
import { styles } from '@/styles'
import { MotiView } from 'moti'
import React, { useState } from 'react'
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export default function Index() {
  const [inputText, setInputText] = useState('')

  const {
    data: answer,
    mutateAsync: generateAdvice,
    isPending: isLoading,
  } = useAdviceGenerator({
    onError: () => alert('Erro ao gerar conselho. Tente novamente mais tarde!'),
  })

  const handlePress = async () => {
    await generateAdvice({ inputText })
    setInputText('')
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <Text style={styles.title}>Gênio do Amor</Text>
      <Text style={styles.subtitle}>
        Gerador de conselhos amorosos profissional
      </Text>
      <TextInput
        value={inputText}
        onChangeText={setInputText}
        style={styles.input}
        placeholder="Escreva a pergunta..."
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.button_text}>
          {isLoading ? 'Carregando ...' : 'Gerar conselho infalível!'}
        </Text>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        {answer && (
          <MotiView
            from={{ opacity: 0, translateY: 200 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.card}
          >
            <Text style={styles.card_title}>Seu está pronto:</Text>
            <Text style={styles.card_text}>{answer}</Text>
          </MotiView>
        )}
      </ScrollView>
    </View>
  )
}
