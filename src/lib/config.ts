export const AUTH_TOKEN: string = import.meta.env["VITE_VIDEOSDK_AUTH_TOKEN"];
export const BACKEND_BASE_URL: string = import.meta.env[
	"VITE_BACKEND_BASE_URL"
];
export const BACKEND_BASE_URL_LOCAL: string = import.meta.env[
	"VITE_BACKEND_BASE_URL_LOCAL"
];
export const FRONTEND_BASE_URL: string = import.meta.env[
	"VITE_FRONTEND_BASE_URL"
];
export const FRONTEND_BASE_URL_LOCAL: string = import.meta.env[
	"VITE_FRONTEND_BASE_URL_LOCAL"
];

export const mapForHumans = {
	id: "ID",
	name: "Name",
	email: "E-mail",
	age: "Age",
	role: "Role",
	profession: "Profession",
	maritalStatus: "Marital status",
	address: "Address",
	phoneNumber: "Phone number",
	medicalHistory: "Medical history",
	mentalHealthHistory: "Mental Health History",
	goalsAndObjectives: "Goals/Objectives",
	preferredPronouns: "Preferred Pronouns",
	preferredTherapist: "Preferred Therapist",
};
