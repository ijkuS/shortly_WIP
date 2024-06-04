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
   buttonCopy.addEventListener('click', () => {
      console.log('buttonCopy is clicked!');
   });

   containerUrl.appendChild(longUrlTextNode);
   containerUrl.appendChild(borderLine);
   containerUrl.appendChild(shortUrlTextNode);
   containerUrl.appendChild(buttonCopy);

   subWrapperShortenUrl.appendChild(containerUrl);
}