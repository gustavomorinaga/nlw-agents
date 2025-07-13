import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TCreateQuestionRequest } from '@/http/types/create-question-request';
import type { TCreateQuestionResponse } from '@/http/types/create-question-response';

export function useCreateQuestion(roomID: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: TCreateQuestionRequest) => {
			const response = await fetch(
				`http://localhost:3333/rooms/${roomID}/questions`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);

			const result: TCreateQuestionResponse = await response.json();

			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get-rooms', roomID] });
		},
	});
}
