document.addEventListener('DOMContentLoaded', () => {
	const buttonShorten = document.querySelector('#button-shorten');

	buttonShorten.addEventListener('click', () => {
		console.log('buttonShorten is clicked');
		// shortenUrl();
		fetchTest();
	});
	function fetchTest() {
		const url = 'https://www.param.me';

		fetch('https://api.1pt.co/addURL?Long=' + url, {
			method: 'GET',
			// body: JSON.stringify({
			// 	message: 'Added!',
			// 	short: 'param',
			// 	long: 'https://www.param.me',
			// }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}) //
			.then((response) => {
				response.json();
				// console.log(response);
			}) //
			.then((data) => console.log(data));
	}

	// function fetchTest() {
	// 	fetch('https://jsonplaceholder.typicode.com/posts', {
	// 		method: 'POST',
	// 		body: JSON.stringify({
	// 			title: '테스트 게시물',
	// 			body: '안녕하세요 테스트 내용입니다',
	// 			userId: 1,
	// 		}),
	// 		headers: {
	// 			'Content-type': 'application/json; charset=UTF-8',
	// 		},
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => console.log(data));
	// }

	function shortenUrl() {
		let cat;
		const api = new XMLHttpRequest();
		const finalUrl = 'https://cleanuri.com/api/v1/shorten';
		api.open('POST', finalUrl, true);
		api.setRequestHeader(
			'Content-Type',
			'application/x-www-form-urlencoded'
		);
		api.send('url=https%3A%2F%2Fgoogle.com%2F');
		api.onload = (e) => {
			cat = api.responseText;
			console.log(cat);
		};
	}
});
