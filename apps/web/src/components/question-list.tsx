import { QuestionItem } from '@/components/question-item';
import { useRoomQuestions } from '@/http/use-room-questions';

type TQuestionListProps = {
	roomID: string;
};

export function QuestionList(props: TQuestionListProps) {
	const { data } = useRoomQuestions(props.roomID);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold text-2xl text-foreground">
					Perguntas & Respostas
				</h2>
			</div>

			{data?.map(question => {
				return <QuestionItem key={question.id} question={question} />;
			})}
		</div>
	);
}
