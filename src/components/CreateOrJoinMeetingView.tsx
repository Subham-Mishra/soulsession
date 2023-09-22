import { Button, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY, ID, ROLE, USER } from "~/lib/constants";

const CreateOrJoinMeetingView = ({
	getMeetingAndToken,
}: {
	getMeetingAndToken: (meeting?: string) => void;
}): JSX.Element => {
	const [meetingId, setMeetingId] = useState<string | undefined>();
	const onClick = () => {
		getMeetingAndToken(meetingId);
	};
	const navigate = useNavigate();

	const handleLogout = (): void => {
		sessionStorage.removeItem(ACCESS_TOKEN_KEY);
		sessionStorage.removeItem(USER);
		sessionStorage.removeItem(ROLE);
		sessionStorage.removeItem(ID);
		navigate("/");
	};

	return (
		<div className="mt-4 flex items-center justify-center gap-2">
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
			{sessionStorage.getItem(USER) && (
				<Button onClick={handleLogout}>Logout</Button>
			)}
		</div>
	);
};

export default CreateOrJoinMeetingView;
