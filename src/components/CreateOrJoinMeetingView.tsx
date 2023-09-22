import { Button, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { ROLE } from "~/lib/constants";

const CreateOrJoinMeetingView = ({
	getMeetingAndToken,
}: {
	getMeetingAndToken: (meeting?: string) => void;
}): JSX.Element => {
	const [meetingId, setMeetingId] = useState<string | undefined>();
	const onClick = () => {
		getMeetingAndToken(meetingId);
	};
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			{sessionStorage.getItem(ROLE) === "coach" ? (
				<Button onClick={onClick}>Start a session</Button>
			) : (
				<div className="flex gap-2">
					<TextField.Input
						type="text"
						placeholder="Enter Meeting Id"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setMeetingId(event.target.value);
						}}
					/>
					<Button onClick={onClick} disabled={!meetingId}>
						Join
					</Button>
				</div>
			)}
		</div>
	);
};

export default CreateOrJoinMeetingView;
