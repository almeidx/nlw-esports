type HoursString = `${number}:${number}`;

export function convertHoursStringToMinutes(hoursString: string): number {
	const [hours, minutes] = hoursString.split(":").map(Number);
	return hours! * 60 + minutes!;
}

export function convertMinutesToHoursString(minutes: number): HoursString {
	const hours = Math.floor(minutes / 60);
	const minutesLeft = minutes - hours * 60;
	return `${padStart(hours)}:${padStart(minutesLeft)}` as HoursString;
}

function padStart(number: number) {
	return String(number).padStart(2, "0");
}
