chrome.webRequest.onBeforeRequest.addListener(
	(details) => {
		//chrome.extension.getBackgroundPage().console.log(details);
		if (
			/https:\/\/app.uniswap.org\/static\/js\/main.([a-zA-Z0-9]*).chunk.js+/g.test(
				details.url
			)
		) {
			return {
				redirectUrl: chrome.extension.getURL(`backend/main.js`),
			};
		}
	},
	{ urls: ["*://app.uniswap.org/**/*.js"] },
	["blocking"]
);
