require("dotenv").config();
const svgContents = require("eleventy-plugin-svg-contents");
const inspect = require("util").inspect;
const { image } = require("./utils/shortcodes/image");
const { numWithDelimiter, numToOrdinal } = require("./utils/filters/numbers");
const { getStats } = require("./utils/collections/getBookStats");
const { lineGraph } = require("./utils/shortcodes/graph");
const { markdown } = require("./utils/shortcodes/markdown");
const { currentlyReading, notStarted } = require("./utils/filters/books");
const { goalProgress } = require("./utils/shortcodes/goalProgress");

module.exports = function (eleventyConfig) {
	console.log("DOING IT");
	eleventyConfig.setTemplateFormats(["liquid"]);
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPlugin(svgContents);

	eleventyConfig.addGlobalData("env", process.env);

	// Collections
	eleventyConfig.addCollection("stats", getStats);

	// Filters
	eleventyConfig.addLiquidFilter("number_with_delimiter", numWithDelimiter);
	eleventyConfig.addLiquidFilter("to_ordinal", numToOrdinal);
	eleventyConfig.addLiquidFilter(
		"debug",
		(content) => `<pre>${inspect(content)}</pre>`
	);
	eleventyConfig.addLiquidFilter("currentlyReading", currentlyReading);
	eleventyConfig.addLiquidFilter("notStarted", notStarted);

	// Shortcodes
	eleventyConfig.addLiquidShortcode("image", image);
	eleventyConfig.addLiquidShortcode("markdown", markdown);
	eleventyConfig.addLiquidShortcode(
		"booksByYearSVG",
		(books, optionsJSON = "{}") => {
			const options = JSON.parse(optionsJSON);
			return lineGraph(books, "books", options);
		}
	);
	eleventyConfig.addLiquidShortcode("pagesByYearSVG", (books) =>
		lineGraph(books, "pages", { gap: 1000 })
	);
	eleventyConfig.addLiquidShortcode("goalProgress", (goals, books) =>
		goalProgress(goals, books)
	);

	return {
		dir: {
			input: "src",
			output: "dist",
		},
	};
};
