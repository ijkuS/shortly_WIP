document.addEventListener('DOMContentLoaded', () => {
	const buttonShorten = document.querySelector('#button-shorten');
	const input = document.querySelector('#input-address');
	const subWrapperShortenUrl = document.querySelector(
		'.sub-wrapper.shorten-url'
	);
	let keyCount = 0;

	input.addEventListener('keyup', (e) => {
		if (e.key === 'Enter') {
			console.log('input is working');
			addUrlList();
			// conveyInputValue;
		}
	});

	buttonShorten.addEventListener('click', () => {
		console.log('buttonShorten is clicked');
		addUrlList();
		// conveyInputValue();
	});

	function getInput() {
		// const inputUrl = input.value.trim();
		if (input.value === '') {
			alert('Please write the type of URL');
			return;
		} else {
			console.log(input.value);
			return getLongUrl(input.value);
		}
	}
	// async function conveyInputValue() {
	// 	let inputValue;
	// 	try {
	// 		inputValue = await getInput();
	// 	} catch {
	// 		// if inputValue is rejected
	// 		inputValue = console.error();
	// 		return;
	// 	}
	// 	return getLongUrl(inputValue);
	// }

	async function getLongUrl(inputValue) {
		// console.log('inputValue is...', inputValue); //for test -> worked!
		// let inputValue;
		try {
			inputValue = await getInput();
			fetch(
				`https://csclub.uwaterloo.ca/~phthakka/1pt/addURL.php?url=${inputValue}`,
				// `https://csclub.uwaterloo.ca/~phthakka/1pt/addURL.php?url=https://unsplash.com/photos/a-woman-sitting-on-a-tree-stump-pouring-a-cup-of-coffee-DPnArtYnI7k`,

				{
					method: 'POST',
				}
			)
				.then((response) => response.json()) //
				.then((data) => {
					console.log(data);

					const shortUrl = data.short;
					console.log(`https://1pt.co/${shortUrl}`);
					// return createNewUrlBox(data);
					return data;
				});
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	// get data from getInput
	async function createNewUrlBox() {
		let data;
		try {
			data = await getLongUrl();

			const containerUrl = document.createElement('section');
			const longUrlTextNode = document.createElement('p');
			const shortUrlTextNode = document.createElement('p');
			const buttonCopy = document.createElement('button');
			const key = keyCount++;

			containerUrl.setAttribute('data-key', key);
			containerUrl.classList.add('container__shorten-url');

			longUrlTextNode.textContent = inputValue;
			longUrlTextNode.classList.add('long-url');

			shortUrlTextNode.classList.add('short-url');
			buttonCopy.classList.add('button-copy');
			buttonCopy.addEventListener('click', () => {
				console.log('buttonCopy is clicked!');
			});

			containerUrl.appendChild(longUrl);
			containerUrl.appendChild(shortUrl);
			containerUrl.appendChild(buttonCopy);

			return containerUrl;

			// return addUrlList(data)
			//    const shortenUrlItem =
			// subWrapperShortenUrl.appendChild(shortenUrlItem);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async function addUrlList() {
		let containerUrl;
		try {
			containerUrl = await createNewUrlBox();
			subWrapperShortenUrl.appendChild(containerUrl);
		} catch (error) {
			console.error(error);
		}
	}
});
