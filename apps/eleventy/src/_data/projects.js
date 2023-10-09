require("dotenv").config();
const { getFirebaseRecords, getImage } = require("../../utils/firebase");

module.exports = async () => {
	const results = await getFirebaseRecords("projects");

	const fixed = await results.map(async (project) => {
		const images = await Promise.all(
			project.images.map(async (image) => {
				return await getImage("projects", `${project.id}/${image.filename}`)
					.then((url) => {
						return { ...image, url };
					})
					.catch((error) => {
						console.log(error);
					});
			})
		);

		return { ...project, images };
	});

	return await Promise.all(fixed);
};
