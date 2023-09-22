import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import ConferenceView from "~/components/ConferenceView";
import { ACCESS_TOKEN_KEY, ROLE, USER } from "~/lib/constants";

const Dashboard: React.FC = (): JSX.Element => {
	const navigate = useNavigate();

	const handleLogout = (): void => {
		localStorage.removeItem(ACCESS_TOKEN_KEY);
		localStorage.removeItem(USER);
		localStorage.removeItem(ROLE);
		navigate("/");
	};

	return (
		<div id="app" className="h-screen w-screen p-2 ">
			<div className="flex justify-between">
				SOULSESSION - {localStorage.getItem(USER)}
				<Button onClick={handleLogout}>Logout</Button>
			</div>
			<ConferenceView />
		</div>
	);
};

export default Dashboard;
