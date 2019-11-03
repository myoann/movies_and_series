This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and use redux to manage actions/reducers and react-router-dom to manage routes.

To have a clean code, I used eslint rules proposed by airbnb and prettier

The goal of this project is to display a list of movies and tv shows and see their details.
It is based on the API of The Movie DataBase (TMDb) to get the list and details, used through the node.js library  [impronunciable/moviedb](https://github.com/impronunciable/moviedb/)


The list of movies and tv shows is displayed with an infinite scroll so that the users doesn't have to change page to search for a movie.
The search bar given is proposing suggestions while the user is typing characters.

Each tv show and movie has its own page with its own route to be easily shared with someone else.


## Demo
You can check out the [Demo online](https://friendly-jang-bae542.netlify.com/).



In the project directory, you can run:
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
