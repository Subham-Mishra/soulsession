import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef } from "react";
import {
	BsCameraVideoOffFill,
	BsFillMicMuteFill,
	BsInfoCircleFill,
} from "react-icons/bs";
import ReactPlayer from "react-player";
import { usersData } from "~/mockdata";

const ParticipantView = (props: {
	participantId: string;
	setShowProfileID?: React.Dispatch<React.SetStateAction<string | undefined>>;
}): JSX.Element => {
	const { participantId, setShowProfileID } = props;
	const micRef = useRef(null);

	const { webcamStream, micStream, webcamOn, micOn, isLocal } =
		useParticipant(participantId);

	const participantInfo = usersData.find((user) => user.id === participantId);

	const toggleProfileInfo = () => {
		setShowProfileID && setShowProfileID(participantId);
	};

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
		<div className="relative flex h-[12rem] w-[20rem] grow items-center justify-center rounded-lg border border-gray-200 p-1">
			<audio ref={micRef} autoPlay playsInline muted={isLocal} />
			<BsInfoCircleFill
				className="absolute left-4 top-4 z-[100] h-5 w-5 cursor-pointer text-gray-600"
				onClick={toggleProfileInfo}
			/>
			{participantInfo && (
				<p className="absolute left-12 top-4 text-sm font-medium text-white">
					{participantInfo?.name}
				</p>
			)}
			{!micOn && (
				<BsFillMicMuteFill className="absolute right-4 top-4 h-6 w-6 text-gray-600" />
			)}
			{!webcamOn && (
				<BsCameraVideoOffFill className="absolute  h-6 w-6 text-gray-600" />
			)}
			{webcamOn && (
				<ReactPlayer
					playsinline // very very imp prop
					pip={false}
					light={false}
					controls={false}
					muted={true}
					playing={true}
					url={videoStream as MediaStream}
					width="100%"
					height="100%"
					onError={(error) => {
						console.log(error, "participant video error");
					}}
				/>
			)}
		</div>
	);
};

export default ParticipantView;
