const signupHistoryKey = "instituto-maos-dadas:signup-history";
const validProfiles = new Set(["voluntario", "beneficiario"]);

export function readSignupHistory() {
	try {
		const history = JSON.parse(localStorage.getItem(signupHistoryKey) || "[]");
		return Array.isArray(history)
			? history.filter((entry) =>
				entry &&
				validProfiles.has(entry.profile) &&
				typeof entry.savedAt === "string" &&
				!Number.isNaN(Date.parse(entry.savedAt))
			)
			: [];
	} catch {
		return [];
	}
}

export function saveSignupHistory(profile) {
	if (!validProfiles.has(profile)) return false;

	const history = readSignupHistory();
	history.push({ profile, savedAt: new Date().toISOString() });

	try {
		localStorage.setItem(signupHistoryKey, JSON.stringify(history.slice(-10)));
		return true;
	} catch {
		return false;
	}
}
