require("dotenv").config();
const { getFirebaseRecords, getImage } = require("../../utils/firebase");

module.exports = async () => {
	const results = await getFirebaseRecords("bourbons");

	const fixed = await results
		.filter((bourbon) => !bourbon.finished)
		.sort((a, b) => {
			if (a.name < b.name) {
				return -1;
			} else {
				return 1;
			}
		})
		.map(async (bourbon) => {
			const image = await getImage("bourbons", bourbon.image)
				.then((url) => {
					return url;
				})
				.catch((error) => {
					console.log(error);
				});

			return { ...bourbon, image };
		});

	return await Promise.all(fixed);
};
