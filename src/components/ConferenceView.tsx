import { MeetingProvider } from "@videosdk.live/react-sdk";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AUTH_TOKEN } from "~/lib/config";
import { ID, USER } from "~/lib/constants";
import { createMeeting } from "~/queries";
import CreateOrJoinMeetingView from "./CreateOrJoinMeetingView";
import MeetingView from "./MeetingView";

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

	return (
		<div>
			{AUTH_TOKEN && meetingId ? (
				<>
					<MeetingProvider
						config={{
							meetingId,
							name: sessionStorage.getItem(USER) || "",
							micEnabled: false,
							webcamEnabled: false,
							participantId: sessionStorage.getItem(ID) || "",
						}}
						token={AUTH_TOKEN}
						joinWithoutUserInteraction
					>
						<MeetingView onMeetingLeave={onMeetingLeave} />
					</MeetingProvider>
				</>
			) : (
				<CreateOrJoinMeetingView getMeetingAndToken={getMeetingAndToken} />
			)}
		</div>
	);
};

export default ConferenceView;
