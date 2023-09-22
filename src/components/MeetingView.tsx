import { useMeeting } from "@videosdk.live/react-sdk";
import { useState } from "react";
import Controls from "./Controls";
import ParticipantView from "./ParticipantView";

const MeetingView = ({
	onMeetingLeave,
	meetingId,
}: {
	onMeetingLeave: () => void;
	meetingId: string;
}): JSX.Element => {
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

	console.log({ participants });

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
			<div className="fixed right-2 top-16 h-96 w-80 rounded-lg bg-slate-50"></div>
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

export default MeetingView;
