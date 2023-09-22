import ConferenceView from "~/components/ConferenceView";

const Dashboard: React.FC = (): JSX.Element => {
	return (
		<div id="app" className="h-screen w-screen bg-gray-800 p-2">
			<ConferenceView />
		</div>
	);
};

export default Dashboard;
