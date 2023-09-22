import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import ConferenceView from "~/components/ConferenceView";
import { ACCESS_TOKEN_KEY, ID, ROLE, USER } from "~/lib/constants";

const Dashboard: React.FC = (): JSX.Element => {
	const navigate = useNavigate();

	const handleLogout = (): void => {
		sessionStorage.removeItem(ACCESS_TOKEN_KEY);
		sessionStorage.removeItem(USER);
		sessionStorage.removeItem(ROLE);
		sessionStorage.removeItem(ID);
		navigate("/");
	};

	return (
		<div id="app" className="h-screen w-screen bg-gray-800 p-2">
			<div className="flex justify-between text-white">
				SOULSESSION - {sessionStorage.getItem(USER)}
				<Button onClick={handleLogout}>Logout</Button>
			</div>
			<ConferenceView />
		</div>
	);
};

export default Dashboard;
