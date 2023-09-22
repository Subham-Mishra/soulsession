import {
	MeetingProvider,
	useMeeting,
	useParticipant,
} from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

const ParticipantView = (props: { participantId: string }) => {
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
		<div>
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
					height={"300px"}
					width={"300px"}
					onError={(error) => {
						console.log(error, "participant video error");
					}}
				/>
			)}
		</div>
	);
};

const MeetingView = () => {
	const [joined, setJoined] = useState<string>();
	//Get the method which will be used to join the meeting.
	//We will also get the participants list to display all participants
	const { join, participants } = useMeeting({
		//callback for when meeting is joined successfully
		onMeetingJoined: () => {
			setJoined("JOINED");
		},
	});
	const joinMeeting = () => {
		setJoined("JOINING");
		join();
	};

	return (
		<div className="container">
			{joined && joined == "JOINED" ? (
				<div>
					{[...participants.keys()].map((participantId) => (
						<ParticipantView
							participantId={participantId}
							key={participantId}
						/>
					))}
				</div>
			) : joined && joined == "JOINING" ? (
				<p>Joining the meeting...</p>
			) : (
				<button onClick={joinMeeting}>Join the meeting</button>
			)}
		</div>
	);
};

const ConferenceView = (): JSX.Element => {
	return (
		<MeetingProvider
			config={{
				meetingId: "kap9-7gu9-43i2",
				micEnabled: true,
				webcamEnabled: true,
				name: "Subham's Org",
			}}
			token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3OGU0ZTBkZi0yZGJkLTRmNmItODk3OS1hMWVlNTAxYzIwMzEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5NTM2MDExMywiZXhwIjoxNjk1NDQ2NTEzfQ.xXsqLiaUB4lhJx_sIO7pwbTwK8j-qaOvm9Htj25oWJI"
		>
			<MeetingView />
		</MeetingProvider>
	);
};

export default ConferenceView;
