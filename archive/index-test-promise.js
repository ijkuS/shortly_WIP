document.addEventListener('DOMContentLoaded', () => {
	const buttonShorten = document.querySelector('#button-shorten');
	const input = document.querySelector('#input-url');
	const subWrapperShortenUrl = document.querySelector(
		'.sub-wrapper.shorten-url'
	);
	let keyCount = 0;

	input.addEventListener('keyup', (e) => {
		if (e.key === 'Enter') {
			console.log('Input is working');
			getAllData();
		}
	});
	buttonShorten.addEventListener('click', () => {
		console.log('ButtonShorten is clicked');
		getAllData();
	});

	function getInput() {
		const inputValue = input.value.trim();
		if (inputValue === '') {
			alert('Please write the right type of URL');
			return;
		}
		return Promise.resolve(inputValue);
	}
	function fetchApiData(inputUrl) {
		fetch(
			`https://csclub.uwaterloo.ca/~phthakka/1pt/addURL.php?url=${inputUrl}`,

			{
				method: 'POST',
			}
		)
			.then((response) => response.json()) //
			.then((apiData) => {
				console.log(apiData);
				return Promise.resolve(apiData);
			});
	}
	function createNewUrlBox(apiData) {
		return Promise.resolve(
			console.log(apiData, 'Arrived at createNewURlBox')
		);
	}

	Promise.allSettled([
		getInput(),
		fetchApiData(inputUrl),
		createNewUrlBox(apiData),
	]);

	// async function getAllData() {
	// 	let inputUrl;
	// 	try {
	// 		inputUrl = await getInput();
	// 	} catch {
	// 		inputUrl = `https://unsplash.com/photos/a-woman-sitting-on-a-tree-stump-pouring-a-cup-of-coffee-DPnArtYnI7k`; //위의 inputUrl이 없다면!
	// 		console.log('this is a placeholder');
	// 	}
	// 	let apiData;
	// 	try {
	// 		apiData = await fetchApiData(inputUrl);
	// 		return createNewUrlBox(apiData);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }
});
