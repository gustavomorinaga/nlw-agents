import { Navigate, useParams } from 'react-router-dom';

type TRoomParams = {
	roomID: string;
};

export function RoomPage() {
	const params = useParams<TRoomParams>();

	if (!params.roomID) {
		return <Navigate replace to="/" />;
	}

	return <div>Room Details</div>;
}
