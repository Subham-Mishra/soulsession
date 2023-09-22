import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "~/lib/constants";

const Dashboard: React.FC = (): JSX.Element => {
	const navigate = useNavigate();

	const handleLogout = (): void => {
		localStorage.removeItem(ACCESS_TOKEN_KEY);
		navigate("/");
	};

	return (
		<div id="app" className="flex">
			SOULSESSION
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
};

export default Dashboard;
