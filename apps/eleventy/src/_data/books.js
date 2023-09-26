require("dotenv").config();

const { getFirebaseRecords, getImage } = require("../../utils/firebase");

module.exports = async () => {
	const results = await getFirebaseRecords("books");

	const fixed = await results.map(async (book) => {
		const start = book.dateStart
			? new Date(book.dateStart.seconds * 1000).toISOString().split("T")[0]
			: null;
		const finish = book.dateFinish
			? new Date(book.dateFinish.seconds * 1000).toISOString().split("T")[0]
			: null;

		const getProgress = () => {
			if (book.format === "AUDIO") {
				return book.minutesFinish ? book.minutesFinish / book.minutes : null;
			} else {
				return book.pagesFinish ? book.pagesFinish / book.pages : null;
			}
		};

		const coverUrl = await getImage("books", book.cover)
			.then((url) => {
				return url;
			})
			.catch((error) => {
				console.log(error);
			});

		return {
			...book,
			dateStart: start,
			dateFinish: finish,
			year: finish ? parseInt(finish.split("-")[0]) + "" : null,
			progress: getProgress(),
			cover: coverUrl,
		};
	});

	return Promise.all(fixed);
};
