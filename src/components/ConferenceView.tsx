import {
	MeetingProvider,
	useMeeting,
	useParticipant,
} from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSearchParams } from "react-router-dom";
import { AUTH_TOKEN } from "~/lib/config";
import { USER } from "~/lib/constants";
import Controls from "./Controls";
import CreateOrJoinMeetingView from "./CreateOrJoinMeetingView";

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

const MeetingView = ({
	onMeetingLeave,
	meetingId,
}: {
	onMeetingLeave: () => void;
	meetingId: string;
}) => {
	const [joined, setJoined] = useState<string>();
	//Get the method which will be used to join the meeting.
	//We will also get the participants list to display all participants
	const { participants } = useMeeting({
		//callback for when meeting is joined successfully
		onMeetingJoined: () => {
			setJoined("JOINED");
		},
		//callback for when meeting is left
		onMeetingLeft: () => {
			onMeetingLeave();
		},
	});

	const localParticipant = [...participants.values()].find(
		(participant) => participant.local
	);

	console.log(participants);

	return (
		<div>
			{joined && joined == "JOINED" && (
				<div className="flex h-full w-full flex-wrap content-center justify-around gap-6">
					{[...participants.values()].map(
						(participant) =>
							!participant.local && (
								<ParticipantView
									participantId={participant.id}
									key={participant.id}
								/>
							)
					)}
				</div>
			)}
			<div className="fixed bottom-6 right-2">
				{localParticipant && (
					<ParticipantView
						participantId={localParticipant.id}
						key={localParticipant.id}
					/>
				)}
			</div>
			<div className="fixed bottom-2 left-0 w-full">
				<Controls />
			</div>
		</div>
	);
};

// API call to create meeting
export const createMeeting = async ({
	authToken,
}: {
	authToken: string;
}): Promise<string> => {
	const response = await fetch(`https://api.videosdk.live/v2/rooms`, {
		method: "POST",
		headers: {
			authorization: `${authToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({}),
	});
	const responseObject = await response.json();
	const { roomId } = responseObject as { roomId: string };
	return roomId;
};

const ConferenceView = (): JSX.Element => {
	const [searchParameters] = useSearchParams();
	const joinMeetingId = searchParameters.get("joinMeeting") || "";
	const [meetingId, setMeetingId] = useState<string | null>(null);

	useEffect(() => {
		if (joinMeetingId) {
			setMeetingId(joinMeetingId);
		}
	}, [joinMeetingId]);

	//Getting the meeting id by calling the api
	const getMeetingAndToken = async (id?: string) => {
		const meetingId =
			id == null ? await createMeeting({ authToken: AUTH_TOKEN }) : id;
		setMeetingId(meetingId);
	};

	//This will set Meeting Id to null when meeting is left or ended
	const onMeetingLeave = () => {
		setMeetingId(null);
	};

	console.log(meetingId, searchParameters.get("joinMeeting"));
	return (
		<div className="grid  place-content-center">
			{AUTH_TOKEN && meetingId ? (
				<>
					<MeetingProvider
						config={{
							meetingId,
							name: localStorage.getItem(USER) || "",
							micEnabled: true,
							webcamEnabled: true,
						}}
						token={AUTH_TOKEN}
						joinWithoutUserInteraction
					>
						<MeetingView
							meetingId={meetingId}
							onMeetingLeave={onMeetingLeave}
						/>
					</MeetingProvider>
				</>
			) : (
				<CreateOrJoinMeetingView getMeetingAndToken={getMeetingAndToken} />
			)}
		</div>
	);
};

export default ConferenceView;
