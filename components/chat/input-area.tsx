import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export interface InputAreaProps {
  value: string
  onChange: (text: string) => void
  onSubmit: () => void
  disabled: boolean
  isLoading: boolean
}

export const InputArea = ({
  value,
  onChange,
  onSubmit,
  disabled,
  isLoading,
}: InputAreaProps) => (
  <View className="flex flex-col gap-2 pt-3 w-full">
    <TextInput
      value={value}
      onChangeText={onChange}
      className="w-full p-3 rounded-lg border border-gray-300"
      placeholder="Qual é a sua dúvida amorosa?"
    />
    <TouchableOpacity
      disabled={disabled}
      onPress={onSubmit}
      className="p-3 w-full rounded-md flex items-center justify-center bg-purple-500 disabled:opacity-50"
    >
      <Text className="text-white font-bold text-lg">
        {isLoading ? 'Pensando...' : 'Gerar conselho infalível!'}
      </Text>
    </TouchableOpacity>
  </View>
)
