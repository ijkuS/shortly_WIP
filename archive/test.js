document.addEventListener('DOMContentLoaded', () => {
   const inputText = document.querySelector('#')



	// const url = 'https://www.param.me';
	async function fetchTest() {
		try {
			fetch(
				`https://csclub.uwaterloo.ca/~phthakka/1pt/addURL.php?url=https://unsplash.com/photos/a-woman-sitting-on-a-tree-stump-pouring-a-cup-of-coffee-DPnArtYnI7k`,
				// `https://csclub.uwaterloo.ca/~phthakka/1pt/addURL.php?url=${url}`,

				{
					method: 'POST',
				}
			)
				.then((response) => response.json())//
				.then((data) => console.log(data));
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	fetchTest();
});
