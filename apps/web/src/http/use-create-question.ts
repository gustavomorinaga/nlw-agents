import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TCreateQuestionRequest } from '@/http/types/create-question-request';
import type { TCreateQuestionResponse } from '@/http/types/create-question-response';
import type { TGetRoomQuestionsResponse } from '@/http/types/get-room-questions-response';

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
		onMutate: ({ question }) => {
			const questions = queryClient.getQueryData<TGetRoomQuestionsResponse>([
				'get-questions',
				roomID,
			]);

			const questionsArray = questions ?? [];

			const newQuestion = {
				id: crypto.randomUUID(),
				question,
				answer: null,
				isGeneratingAnswer: true,
				createdAt: new Date().toISOString(),
			};

			queryClient.setQueryData<TGetRoomQuestionsResponse>(
				['get-questions', roomID],
				[newQuestion, ...questionsArray]
			);

			return { newQuestion, questions };
		},
		onSuccess: (data, _variables, context) => {
			queryClient.setQueryData<TGetRoomQuestionsResponse>(
				['get-questions', roomID],
				questions => {
					if (!questions) {
						return questions;
					}

					if (!context.newQuestion) {
						return questions;
					}

					return questions.map(question => {
						if (question.id === context.newQuestion.id) {
							return {
								...context.newQuestion,
								id: data.questionID,
								answer: data.answer,
								isGeneratingAnswer: false,
							};
						}

						return question;
					});
				}
			);
		},
		onError: (_error, _variables, context) => {
			if (context?.questions) {
				queryClient.setQueryData<TGetRoomQuestionsResponse>(
					['get-questions', roomID],
					context.questions
				);
			}
		},
	});
}
