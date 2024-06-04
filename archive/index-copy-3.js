document.addEventListener('DOMContentLoaded', () => {
	const buttonShorten = document.querySelector('#button-shorten');
	const input = document.querySelector('#input-url');
	const subWrapperShortenUrl = document.querySelector(
		'.sub-wrapper.shorten-url'
	);
	let keyCount = 0;

	input.addEventListener('keyup', (e) => {
		if (e.key === 'Enter') {
			console.log('input is working');
			addUrlList();
		}
	});

	buttonShorten.addEventListener('click', () => {
		console.log('buttonShorten is clicked');
		addUrlList();
		// conveyInputValue();
	});

	function getInput() {
		const inputUrl = input.value.trim();
		if (inputUrl === '') {
			alert('Please write the type of URL');
			return;
		} else {
			// console.log(inputUrl);
			// return getUrlData(input.value);
			return getUrlData(inputUrl);
		}
	}

	async function getUrlData(inputUrl) {
		try {
			inputUrl = await getInput();
			fetch(
				`https://csclub.uwaterloo.ca/~phthakka/1pt/addURL.php?url=${inputUrl}`,
				// `https://csclub.uwaterloo.ca/~phthakka/1pt/addURL.php?url=https://unsplash.com/photos/a-woman-sitting-on-a-tree-stump-pouring-a-cup-of-coffee-DPnArtYnI7k`,

				{
					method: 'POST',
				}
			)
				.then((response) => response.json()) //
				.then((data) => {
					console.log(data);

					return createNewUrlBox(data);
				});
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	// get data from getUrlData
	async function createNewUrlBox(data) {
		// let objData;
		try {
			data = await getUrlData(); //data from 1pt.co
			console.log(data);

			// if (!objData) {
			// 	console.error();
			// } //

			const containerUrl = document.createElement('section');
			const longUrlTextNode = document.createElement('p');
			const shortUrlTextNode = document.createElement('p');
			const buttonCopy = document.createElement('button');
			const key = keyCount++;

			containerUrl.setAttribute('data-key', key);
			containerUrl.classList.add('container__shorten-url');

			longUrlTextNode.textContent = data.long;
			longUrlTextNode.classList.add('long-url');

			shortUrlTextNode.textContent = `https://1pt.co/${data.short}`;
			shortUrlTextNode.classList.add('short-url');

			buttonCopy.textContent = 'Copy';
			buttonCopy.classList.add('button-copy');
			buttonCopy.addEventListener('click', () => {
				console.log('buttonCopy is clicked!');
			});

			containerUrl.appendChild(longUrlTextNode);
			containerUrl.appendChild(shortUrlTextNode);
			containerUrl.appendChild(buttonCopy);

			return addUrlList(containerUrl);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async function addUrlList(containerUrl) {
		// let containerUrlStructure;
		try {
			containerUrl = await createNewUrlBox();
			if (containerUrl) {
				console.log(containerUrl);
				subWrapperShortenUrl.appendChild(containerUrl);
			}
		} catch (error) {
			console.error(error);
		}
	}
});
