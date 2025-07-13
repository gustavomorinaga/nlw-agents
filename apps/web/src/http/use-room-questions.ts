import { useQuery } from '@tanstack/react-query';
import type { TGetRoomQuestionsResponse } from '@/http/types/get-room-questions-response';

export function useRoomQuestions(roomID: string) {
	return useQuery({
		queryKey: ['get-questions', roomID],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:3333/rooms/${roomID}/questions`
			);
			const result: TGetRoomQuestionsResponse = await response.json();

			return result;
		},
	});
}
