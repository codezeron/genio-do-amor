import { aiService } from '@/services/ai-service'
import { GetAdviceParams } from '@/types/prompt'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

export const useAdviceGenerator = (
  options?: UseMutationOptions<unknown, unknown, GetAdviceParams>,
) => {
  return useMutation({
    ...options,
    mutationKey: ['generate__advice', options],
    mutationFn: params => aiService.generateAdvice(params),
    retry: 1,
  })
}
