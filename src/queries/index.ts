// API call to create meeting
export const createMeeting = async ({
	authToken,
}: {
	authToken: string;
}): Promise<string> => {
	const response = await fetch(`https://api.videosdk.live/v2/rooms`, {
		method: "POST",
		headers: {
			authorization: `${authToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({}),
	});
	const responseObject = await response.json();
	const { roomId } = responseObject as { roomId: string };
	return roomId;
};
