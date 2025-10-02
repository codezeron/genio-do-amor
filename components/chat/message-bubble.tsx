import { TMessage } from '@/types/message'
import { cn } from '@/utils/cn'
import { MotiView } from 'moti'
import { Text } from 'react-native'

type MessageBubbleProps = {
  message: TMessage
}

export const MessageBubble = ({ message }: MessageBubbleProps) => (
  <MotiView
    from={{ opacity: 0, translateY: 50 }}
    animate={{ opacity: 1, translateY: 0 }}
    className={cn(
      'border border-gray-300 rounded-xl my-2 p-3 max-w-[80%]',
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
)
