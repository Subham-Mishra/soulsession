import { useMeeting } from "@videosdk.live/react-sdk";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiMiniXMark } from "react-icons/hi2";
import useWebSocket from "react-use-websocket";
import { usersData } from "~/mockdata";
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
	const [showProfileID, setShowProfileID] = useState<string>();
	const [profileInfo, setProfileInfo] = useState<any>();

	const [socketUrl, setSocketUrl] = useState("ws://localhost:8000");

	const { lastMessage } = useWebSocket(socketUrl);

	useEffect(() => {
		if (lastMessage)
			toast(
				(t) => (
					<div className="flex justify-between">
						<span className="text-xs font-normal">{lastMessage.data}</span>
						<button
							onClick={() => {
								toast.dismiss(t.id);
							}}
						>
							<HiMiniXMark className="h-4 w-4 text-gray-800" />
						</button>
					</div>
				),
				{
					duration: 6000,
					position: "top-center",
				}
			);
	}, [lastMessage]);

	useEffect(() => {
		if (showProfileID) {
			const participantInfo = usersData.find(
				(user) => user.id === showProfileID
			);
			setProfileInfo(participantInfo);
		}
	}, [showProfileID]);

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

	return (
		<div>
			{joined && joined == "JOINED" && (
				<div className="flex h-full w-full flex-wrap content-center justify-around gap-6">
					{[...participants.values()].map(
						(participant) =>
							!participant.local && (
								<ParticipantView
									setShowProfileID={setShowProfileID}
									participantId={participant.id}
									key={participant.id}
								/>
							)
					)}
				</div>
			)}
			{profileInfo && (
				<div className="fixed right-2 top-16 h-96 w-80 overflow-auto rounded-lg bg-slate-50 px-2">
					<>
						<div className="flex justify-between">
							<h2 className="my-2 text-base font-semibold">
								{profileInfo?.name}
							</h2>
							<HiMiniXMark
								className="mt-2 h-5 w-5 cursor-pointer text-gray-800"
								onClick={() => {
									setShowProfileID("");
									setProfileInfo(null);
								}}
							/>
						</div>
						<div>
							{Object.entries(profileInfo).map(([key, value]) => (
								<div key={key} className="text-sm leading-5 text-gray-600">
									<span className="font-medium text-gray-900">{key}:</span>{" "}
									{value as string}
								</div>
							))}
						</div>
					</>
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

export default MeetingView;
