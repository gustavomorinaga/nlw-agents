import { CreateRoomForm } from '@/components/create-room-form';
import { RoomList } from '@/components/room-list';

export function CreateRoomPage() {
	return (
		<div className="min-h-screen">
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<div className="grid grid-cols-2 items-start gap-8">
					<CreateRoomForm />
					<RoomList />
				</div>
			</div>
		</div>
	);
}
