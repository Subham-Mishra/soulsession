import { MeetingProvider } from "@videosdk.live/react-sdk";
import type { Participant } from "@videosdk.live/react-sdk/dist/types/participant";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AUTH_TOKEN } from "~/lib/config";
import { USER } from "~/lib/constants";
import { usersData } from "~/mockdata";
import { createMeeting } from "~/queries";
import CreateOrJoinMeetingView from "./CreateOrJoinMeetingView";
import MeetingView from "./MeetingView";

//iterate over mockdata array of objects and find a user which doesnt already exists in participants
//if all ids are taken, return null
const getNewRandomParticipant = (participants: Map<string, Participant>) => {
	console.log({ participants });
	const ids = new Set(
		[...participants.values()].map((participant) => participant.id)
	);
	for (const user of usersData) {
		if (!ids.has(user.id)) {
			return user;
		}
	}
	return null;
};

const ConferenceView = (): JSX.Element => {
	const [meetingId, setMeetingId] = useState<string | null>(null);

	const [searchParameters] = useSearchParams();
	const joinMeetingId = searchParameters.get("joinMeetingId") || "";

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

	console.log({ meetingId, AUTH_TOKEN });

	return (
		<div className="grid  place-content-center">
			{AUTH_TOKEN && meetingId ? (
				<>
					<MeetingProvider
						config={{
							meetingId,
							name: sessionStorage.getItem(USER) || "",
							micEnabled: false,
							webcamEnabled: false,
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
