require("dotenv").config();

const { getRecords } = require("./../../utils/airtable");

module.exports = async () => {
	return [];
	const results = await getRecords(
		process.env.AIRTABLE_BASE_BOURBON_BASE,
		process.env.AIRTABLE_BASE_BOURBON_TABLE,
		"bourbons"
	);

	return results
		.filter((item) => item["Finished"] !== true)
		.sort((a, b) => (a["Name"] > b["Name"] ? 1 : -1));
};
