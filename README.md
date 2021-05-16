# Getting Started with Create React App

Calculate how much money you would have saved up, had you monthly dollar cost averaged over a specified period of time into a given cryptocurrency.

Data pulled from CoinGecko API.

Keeping this version for reference and creating a new version. The main problem with this version is it makes a separate api call for each month, which is inefficient. Also if I wanted to add more frequencies, I'd potentially have to call the api hundreds of times, and also update my helper functions to support all the different frequencies.