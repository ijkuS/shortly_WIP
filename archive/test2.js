document.addEventListener('DOMContentLoaded', () => {
	const buttonShorten = document.querySelector('#button-shorten');
	const input = document.querySelector('#input-url');
	const subWrapperShortenUrl = document.querySelector('.sub-wrapper.shorten-url');
	let keyCount = 0;

	input.addEventListener('keyup', (e) => {
		if (e.key === 'Enter') {
			console.log('Input is working');
			stepByStep();
		}
	});

	buttonShorten.addEventListener('click', () => {
		console.log('ButtonShorten is clicked');
		stepByStep();
	});

	function getInput() {
		const inputValue = input.value.trim();
		if (inputValue === '') {
			alert('Please write the right type of URL');
			return null;
		} else {
			return inputValue;
		}
	}

	async function fetchApiData() {
		const inputUrl = getInput();
		if (!inputUrl) {
			return null;
		}

		try {
			const response = await fetch('https://csclub.uwaterloo.ca/~phthakka/1pt-express/addURL', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({ long: inputUrl })
			});
			const apiData = await response.json();
			console.log(apiData);
			return apiData;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	function createNewUrlBox(apiData) {
		if (!apiData) {
			return;
		}

		const containerUrl = document.createElement('section');
		const longUrlTextNode = document.createElement('p');
		const shortUrlTextNode = document.createElement('p');
		const buttonCopy = document.createElement('button');
		const key = keyCount++;

		containerUrl.setAttribute('data-key', key);
		containerUrl.classList.add('container__shorten-url');

		longUrlTextNode.textContent = apiData.long;
		longUrlTextNode.classList.add('long-url');

		shortUrlTextNode.textContent = `https://1pt.co/${apiData.short}`;
		shortUrlTextNode.classList.add('short-url');

		buttonCopy.textContent = 'Copy';
		buttonCopy.classList.add('button-copy');
		buttonCopy.addEventListener('click', () => {
			navigator.clipboard.writeText(shortUrlTextNode.textContent).then(() => {
				console.log('URL copied to clipboard!');
			});
		});

		containerUrl.appendChild(longUrlTextNode);
		containerUrl.appendChild(shortUrlTextNode);
		containerUrl.appendChild(buttonCopy);

		subWrapperShortenUrl.appendChild(containerUrl);
	}

	async function stepByStep() {
		try {
			const apiData = await fetchApiData();
			if (apiData) {
				createNewUrlBox(apiData);
				console.log(apiData);
			}
		} catch (error) {
			console.error(error);
		}
	}
});
