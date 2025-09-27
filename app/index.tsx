import { generatorAdvisor } from '@/services/ia/generator'
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
  const [advice, setAdvice] = useState('')
  const [answer, setAnswer] = useState('')
  const [isLoading, setLoading] = useState(false)

  const handlePress = async () => {
    if (advice.length < 5) {
      alert('Mensagem muito curta!')
      return
    }

    setLoading(true)
    setAnswer('')
    const result = await generatorAdvisor(advice)
    setAnswer(result || '...')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <Text style={styles.title}>Gênio do Amor</Text>
      <Text style={styles.subtitle}>
        Gerador de conselhos amorosos profissional
      </Text>
      <TextInput
        value={advice}
        onChangeText={setAdvice}
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
