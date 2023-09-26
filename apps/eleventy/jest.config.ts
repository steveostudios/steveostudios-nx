/* eslint-disable */
export default {
	displayName: "eleventy-site",
	preset: "../../../jest.preset.js",
	globals: {
		"ts-jest": {
			tsconfig: "<rootDir>/tsconfig.spec.json",
		},
	},
	testEnvironment: "node",
	transform: {
		"^.+\\.[tj]s$": "ts-jest",
	},
	moduleFileExtensions: ["ts", "js", "html"],
	coverageDirectory: "../../../coverage/apps/eleventy/site",
};
