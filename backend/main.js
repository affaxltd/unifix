var run = async function () {
	const scripts = document.getElementsByTagName("script");
	let file = "";

	for (let i = 0; i < scripts.length; i++) {
		if (
			scripts[i].src &&
			/https:\/\/app.uniswap.org\/static\/js\/main\.([a-zA-Z0-9]*)\.chunk\.js+/g.test(
				scripts[i].src
			)
		) {
			file = scripts[i].src;
		}
	}

	if (file === "") {
		return alert("There was an error in UniRip!");
	}

	const request = await fetch(file + "?nored");
	const content = await request.text();

	const result = content.replace(
		/"keywords":\["uniswap","unsupported"\],"tokens":\[({([a-zA-Z0-9\w\[\]"\.,;:/\-()\\ ]*)}([,]*))+\]/g,
		`"keywords":["uniswap","unsupported"],"tokens":[]`
	);

	try {
		eval(result);
	} catch (_e) {
		console.log(_e);
	}
};

run();
