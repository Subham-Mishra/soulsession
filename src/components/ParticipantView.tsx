import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";

const ParticipantView = (props: { participantId: string }): JSX.Element => {
	const micRef = useRef(null);
	const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
		useParticipant(props.participantId);

	const videoStream = useMemo(() => {
		if (webcamOn && webcamStream) {
			const mediaStream = new MediaStream();
			mediaStream.addTrack(webcamStream.track);
			return mediaStream;
		}
		return null;
	}, [webcamStream, webcamOn]);

	useEffect(() => {
		if (micRef.current) {
			if (micOn && micStream) {
				const mediaStream = new MediaStream();
				mediaStream.addTrack(micStream.track);

				(micRef.current as any).srcObject = mediaStream;
				(micRef.current as any).play().catch((error: any) => {
					console.error("videoElem.current.play() failed", error);
				});
			} else {
				(micRef.current as any).srcObject = null;
			}
		}
	}, [micStream, micOn]);

	return (
		<div className="flex h-[12rem] w-[20rem] grow items-center justify-center rounded-lg bg-gray-900 px-0.5">
			<audio ref={micRef} autoPlay playsInline muted={isLocal} />
			{webcamOn && (
				<ReactPlayer
					playsinline // very very imp prop
					pip={false}
					light={false}
					controls={false}
					muted={true}
					playing={true}
					url={videoStream as MediaStream}
					height={"400px"}
					width={"400px"}
					onError={(error) => {
						console.log(error, "participant video error");
					}}
				/>
			)}
		</div>
	);
};

export default ParticipantView;
