import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type TGetRoomsAPIResponse = Array<{
	id: string;
	name: string;
}>;

export function CreateRoomPage() {
	const { data, isLoading } = useQuery({
		queryKey: ['get-rooms'],
		queryFn: async () => {
			const response = await fetch('http://localhost:3333/rooms');
			const result: TGetRoomsAPIResponse = await response.json();

			return result;
		},
	});

	return (
		<div>
			<div>Create Room</div>

			{isLoading && <p>Carregando...</p>}

			<div className="flex flex-col gap-2">
				{data?.map(room => (
					<Button asChild key={room.id} variant="link">
						<Link to={`/room/${room.id}`}>{room.name}</Link>
					</Button>
				))}
			</div>
		</div>
	);
}
