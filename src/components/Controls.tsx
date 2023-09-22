import { Button } from "@radix-ui/themes";
import { useMeeting } from "@videosdk.live/react-sdk";
import toast from "react-hot-toast";
import {
	BsCameraVideoFill,
	BsCameraVideoOffFill,
	BsFillMicFill,
	BsFillMicMuteFill,
} from "react-icons/bs";
import { HiPhoneMissedCall } from "react-icons/hi";
import { FRONTEND_BASE_URL } from "~/lib/config";
import { ROLE } from "~/lib/constants";

const Controls = (): JSX.Element => {
	const {
		leave,
		toggleMic,
		toggleWebcam,
		localMicOn,
		localWebcamOn,
		meetingId,
	} = useMeeting();

	const handleShareLink = () => {
		navigator.clipboard
			.writeText(`${FRONTEND_BASE_URL}/patient?joinMeeting=${meetingId}`)
			.then(() => {
				toast.success("Link copied to clipboard", { className: "text-xs" });
			})
			.catch((error) => {
				toast.error("Failed to copy link to clipboard");
			});
	};

	return (
		<div className="flex justify-center gap-2">
			<Button
				color="red"
				onClick={() => {
					leave();
				}}
			>
				<HiPhoneMissedCall className="h-5 w-5 text-white" />
			</Button>
			<Button
				onClick={() => {
					toggleMic();
				}}
			>
				{localMicOn ? (
					<BsFillMicFill className="h-5 w-5 text-white" />
				) : (
					<BsFillMicMuteFill className="h-5 w-5 text-white" />
				)}
			</Button>
			<Button
				onClick={() => {
					toggleWebcam();
				}}
			>
				{localWebcamOn ? (
					<BsCameraVideoFill className="h-5 w-5 text-white" />
				) : (
					<BsCameraVideoOffFill className="h-5 w-5 text-white" />
				)}
			</Button>
			{sessionStorage.getItem(ROLE) === "coach" && (
				<Button onClick={handleShareLink}>Share link</Button>
			)}
		</div>
	);
};

export default Controls;
