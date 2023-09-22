import { Button } from "@radix-ui/themes";
import type React from "react";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN_KEY, ROLE, USER } from "~/lib/constants";

const handleLogin = (): void => {
	// TODO: values are to be fetched from Auth API.
	localStorage.setItem(ACCESS_TOKEN_KEY, "JNJDNUBFINKMSENFBFJBNSJNE");
	localStorage.setItem(USER, "Subham");
	localStorage.setItem(ROLE, "coach");
};

const AuthPage: React.FC = (): JSX.Element => {
	return (
		<div className="grid h-screen grid-cols-2">
			<section className="grid place-content-center gap-y-8 bg-black text-white">
				<p className="text-center text-xl font-medium leading-7">SoulSession</p>
			</section>
			<section className="grid place-content-center gap-4 bg-white text-sm font-medium leading-4">
				<Link to={"/dashboard"}>
					<Button onClick={handleLogin}>Login</Button>
				</Link>
			</section>
		</div>
	);
};

export default AuthPage;
