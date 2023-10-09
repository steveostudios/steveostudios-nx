require("dotenv").config();
const { getFirebaseRecords, getImage } = require("../../utils/firebase");

module.exports = async () => {
	const results = await getFirebaseRecords("posts");
	const fixed = await results
		.filter((post) => post.published)
		.sort((a, b) => {
			const dateA = new Date(a.date.seconds * 1000);
			const dateB = new Date(b.date.seconds * 1000);
			if (dateA < dateB) {
				return 1;
			} else {
				return -1;
			}
		})
		.map(async (post) => {
			const date = post.date
				? new Date(post.date.seconds * 1000).toISOString().split("T")[0]
				: null;

			const getImageUrl = async (match, p1) => {
				console.log(match, p1);
				const result = await getImage("posts", `${post.id}/${p1}`).then(
					(url) => {
						return `<img src="${url}" alt="Poop" />`;
					}
				);
				return result;
			};

			async function replaceAsync(str, regex, asyncFn) {
				const promises = [];
				str.replace(regex, (match, p1, ...args) => {
					const promise = asyncFn(match, p1, ...args);
					promises.push(promise);
				});
				const data = await Promise.all(promises);
				return str.replace(regex, () => data.shift());
			}
			const content = await replaceAsync(
				post.content,
				/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g,
				getImageUrl
			);
			return await { ...post, date, content };
		});

	return await Promise.all(fixed);
};
