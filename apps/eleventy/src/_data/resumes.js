require("dotenv").config();
const { getFirebaseRecords, getImage } = require("../../utils/firebase");

module.exports = async () => {
	const results = await getFirebaseRecords("resumes");

	const fixed = await results.map(async (resume) => {
		const image = resume.logo
			? await getImage("resumes", resume.logo)
					.then((url) => {
						return url;
					})
					.catch((error) => {
						console.log(error);
					})
			: null;

		return { ...resume, image };
	});
	return await Promise.all(fixed);
};
