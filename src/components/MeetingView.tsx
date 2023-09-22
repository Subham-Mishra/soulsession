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
	const [joined, setJoined] = useState<boolean>();
	const [showProfileID, setShowProfileID] = useState<string>();
	const [profileInfo, setProfileInfo] = useState<any>();
	const [socketUrl, setSocketUrl] = useState("ws://localhost:8000");

	const { lastMessage } = useWebSocket(socketUrl);

	useEffect(() => {
		setTimeout(() => {
			if (lastMessage)
				toast(
					(t) => (
						<div className="flex !w-80 justify-between">
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
						duration: 5000,
						position: "top-right",
					}
				);
		}, 60 * 1000);
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
			setJoined(true);
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
			{joined && (
				<div className="mt-8 flex h-full  w-full flex-wrap content-center justify-around gap-6">
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
				<div className="fixed right-2 top-28 h-96 w-80 overflow-auto rounded-lg bg-gray-700 px-2">
					<div className="flex justify-between">
						<h2 className="my-2 text-base font-semibold text-gray-200">
							{profileInfo?.name}
						</h2>
						<HiMiniXMark
							className="mt-2 h-5 w-5 cursor-pointer text-gray-300"
							onClick={() => {
								setShowProfileID("");
								setProfileInfo(null);
							}}
						/>
					</div>
					<div>
						{Object.entries(profileInfo).map(([key, value]) => (
							<div key={key} className="text-sm leading-5 text-gray-300">
								<span className="font-medium text-gray-200">{key}:</span>{" "}
								{value as string}
							</div>
						))}
					</div>
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
