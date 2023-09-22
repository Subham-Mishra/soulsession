import { Button } from "@radix-ui/themes";
import type React from "react";
import { Link } from "react-router-dom";
import ErrorSVG from "~/assets/error.svg";

const ErrorPage: React.FC = (): JSX.Element => {
	return (
		<div className="flex h-screen flex-col items-center justify-center space-y-8">
			<ErrorSVG />
			<div>
				Something went wrong. Please contact our team if this keeps happening.
			</div>
			<Link to="/dashboard">
				<Button>Go Home!</Button>
			</Link>
		</div>
	);
};

export default ErrorPage;
