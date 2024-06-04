document.addEventListener('DOMContentLoaded', () => {
	const menuIcon = document.querySelector('#menu-icon');
	const buttonShorten = document.querySelector('#button-shorten');
	const input = document.querySelector('#input-url');
	const subWrapperShortenUrl = document.querySelector(
		'.sub-wrapper.shorten-url'
	);
	let keyCount = 0;

	menuIcon.addEventListener('click', () => {
		console.log('menuIcon is clicked');
		displayMenu();
	});
	input.addEventListener('keyup', (e) => {
		if (e.key === 'Enter') {
			console.log('Input is working');
			fetchApiData();
		}
	});
	buttonShorten.addEventListener('click', () => {
		console.log('ButtonShorten is clicked');
		fetchApiData();
	});

	function getInput() {
		const inputValue = input.value.trim();
		const warningInput = document.querySelector('.input-warning');

		try {
			if (inputValue === '') {
				input.classList.add('warning');
				warningInput.classList.add('display');

				return null;
			} else {
				input.classList.remove('warning');
				warningInput.classList.remove('display');
				return inputValue;
			}

			// alert('Please write the right type of URL');
		} catch (error) {
			console.error(error);
		}
	}
	async function fetchApiData() {
		const inputUrl = await getInput();
		if (!inputUrl) {
			console.log('No input URL provided');
			return;
		}
		try {
			fetch(
				`https://csclub.uwaterloo.ca/~phthakka/1pt/addURL.php?url=${inputUrl}`,
				{
					method: 'POST',
				}
			)
				.then((response) => response.json()) //
				.then((apiData) => {
					console.log(apiData);
					return createNewUrlBox(apiData);
				});
		} catch {
			//inputUrl fetch가 제대로 들어오지 않을 경우,
			inputUrl =
				'https://unsplash.com/photos/a-woman-sitting-on-a-tree-stump-pouring-a-cup-of-coffee-DPnArtYnI7k';
			console.log('Error fetching the API');
			console.error();
		}
	}

	function createNewUrlBox(apiData) {
		// console.log(apiData, 'arrived at createNewUrlBox'); //for test

		const containerUrl = document.createElement('section');
		const longUrlTextNode = document.createElement('p');
		const borderLine = document.createElement('hr');
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

		//call the copyUrl function to handle the copy functionality
		copyUrl(shortUrlTextNode, buttonCopy);

		containerUrl.appendChild(longUrlTextNode);
		containerUrl.appendChild(borderLine);
		containerUrl.appendChild(shortUrlTextNode);
		containerUrl.appendChild(buttonCopy);

		subWrapperShortenUrl.appendChild(containerUrl);
	}
	function copyUrl(shortUrlTextNode, buttonCopy) {
		buttonCopy.addEventListener('click', (e) => {
			const allButtonCopy = document.querySelectorAll('.button-copy');
			allButtonCopy.forEach((button) => {
				button.textContent = 'copy';
				button.classList.remove('copied');
			});

			console.log('buttonCopy is clicked!');
			// change the button text

			buttonCopy.textContent = 'Copied!';
			buttonCopy.classList.add('copied');
			console.log(shortUrlTextNode.textContent);

			/* Copy the shortUrlTextNode  */
			navigator.clipboard
				.writeText(shortUrlTextNode.textContent)
				.then(() => {
					console.log('Text copied to clipboard');
				})
				.catch((err) =>
					console.error('Could not copy text: ', err)
				);
			e.preventDefault();
		});
	}
	function displayMenu() {
		const mobileMenuList = document.querySelector('.mobile-menu-list');
		const mobileMenuFlex = document.querySelector(
			'.mobile-menu-list.flex'
		);
		if (mobileMenuFlex) {
			mobileMenuList.classList.remove('flex');
		} else {
			mobileMenuList.classList.add('flex');
		}
	}
});
