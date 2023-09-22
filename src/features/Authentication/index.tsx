import { Button, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ACCESS_TOKEN_KEY, ID, ROLE, USER } from "~/lib/constants";
import { usersData } from "~/mockdata";

const loginAsCoach = (): void => {
	// TODO: values are to be fetched from Auth API.
	sessionStorage.setItem(ACCESS_TOKEN_KEY, "JNJDNUBFINKMSENFBFJBNSJNE");
	sessionStorage.setItem(USER, "Subham");
	sessionStorage.setItem(ID, "xxw-ws-wdd");
	sessionStorage.setItem(ROLE, "coach");
};

const loginAsRandomPatient = (patientId: string): void => {
	const patient = usersData.find((user) => user.id === patientId);
	if (patient) {
		sessionStorage.setItem(ACCESS_TOKEN_KEY, "BWKBXIUQBEXUINECU");
		sessionStorage.setItem(USER, patient?.name);
		sessionStorage.setItem(ID, patient?.id);
		sessionStorage.setItem(ROLE, "patient");
	}
};

const AuthPage = ({ role }: { role: "coach" | "patient" }): JSX.Element => {
	const [searchParameters] = useSearchParams();
	const joinMeetingId = searchParameters.get("joinMeeting") || "";

	const [patientId, setPatientId] = useState<string>("");

	return (
		<div className="grid h-screen grid-cols-2">
			<section className="grid place-content-center gap-y-8 bg-black text-white">
				<p className="text-center text-xl font-medium leading-7">SoulSession</p>
			</section>
			<section className="grid place-content-center gap-4 bg-white text-sm font-medium leading-4">
				{role === "coach" && (
					<Link to={"/dashboard"}>
						<Button onClick={loginAsCoach}>Login (Coach)</Button>
					</Link>
				)}
				{role === "patient" && (
					<>
						<TextField.Input
							placeholder="Enter your patient id"
							value={patientId}
							onChange={(event) => {
								setPatientId(event.target.value);
							}}
						/>
						<Link
							className="mt-4"
							to={
								joinMeetingId
									? `/dashboard?joinMeetingId=${joinMeetingId}`
									: `/dashboard`
							}
						>
							<Button
								onClick={() => {
									loginAsRandomPatient(patientId);
								}}
							>
								Login (Patient)
							</Button>
						</Link>
					</>
				)}
			</section>
		</div>
	);
};

export default AuthPage;
