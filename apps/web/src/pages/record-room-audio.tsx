import { useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const isRecordingSupported =
	!!navigator.mediaDevices &&
	typeof navigator.mediaDevices.getUserMedia === 'function' &&
	typeof window.MediaRecorder === 'function';

type TRoomParams = {
	roomID: string;
};

export function RecordRoomAudioPage() {
	const params = useParams<TRoomParams>();

	const [isRecording, setIsRecording] = useState(false);
	const recorder = useRef<MediaRecorder | null>(null);

	async function startRecording() {
		if (!isRecordingSupported) {
			alert('Gravação de áudio não é suportada neste navegador.');
			return;
		}

		setIsRecording(true);

		const audio = await navigator.mediaDevices.getUserMedia({
			audio: {
				echoCancellation: true,
				noiseSuppression: true,
				sampleRate: 44_100,
			},
		});

		recorder.current = new MediaRecorder(audio, {
			mimeType: 'audio/webm',
			audioBitsPerSecond: 64_000,
		});

		recorder.current.ondataavailable = event => {
			if (event.data.size > 0) {
				uploadAudio(event.data);
			}
		};

		recorder.current.start();
	}

	function stopRecording() {
		setIsRecording(false);

		if (recorder.current && recorder.current.state !== 'inactive') {
			recorder.current.stop();
		}
	}

	async function uploadAudio(audio: Blob) {
		const formData = new FormData();

		formData.append('file', audio, 'audio.webm');

		const response = await fetch(
			`http://localhost:3333/rooms/${params.roomID}/audio`,
			{
				method: 'POST',
				body: formData,
			}
		);

		const result = await response.json();

		console.log(result);
	}

	if (!params.roomID) {
		return <Navigate replace to="/" />;
	}

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-3">
			{isRecording ? (
				<Button onClick={stopRecording}>Pausar gravação</Button>
			) : (
				<Button onClick={startRecording}>Gravar áudio</Button>
			)}
			{isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
		</div>
	);
}
