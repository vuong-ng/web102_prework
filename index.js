/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");


// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    GAMES_JSON.forEach((game) => 
        {
        // create a new div element, which will become the game card
            const gameCard = document.createElement("div");
            gameCard.className="game-card";

        // add the class game-card to the list
            gamesContainer.append(gameCard);

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
            const gameInfo = 
            `
            <img src=${game.img} width=280px height=180px>
            <div id="name"><strong>${game.name}</strong><br></br><div>
            <div id="description">${game.description}<div>
            <div id="pledged">${game.pledged}<div>
            <div id="backers">Backers: ${game.backers}<div>
            `
            gameCard.innerHTML=gameInfo;
        }
    )

}
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
const contri = GAMES_JSON.reduce((res, game) => res + game.backers, 0)
console.log(contri)
contributionsCard.innerHTML=`${contri.toLocaleString()}`;

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((res, game) => res + game.pledged, 0)
raisedCard.innerHTML=`$${totalRaised.toLocaleString()}`;
console.log(totalRaised)
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML=`${GAMES_JSON.length}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfunded = GAMES_JSON.filter((game) => game.pledged < game.goal);
    unfunded.forEach((game) => 
        {
        // create a new div element, which will become the game card
            const gameCard = document.createElement("div");
            gameCard.className="game-card";

        // add the class game-card to the list
            gamesContainer.append(gameCard);
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
            const gameInfo = 
            `
            <img src=${game.img} width=280px height=180px>
            <div id="name"><strong>${game.name}</strong><br></br><div>
            <div id="description">${game.description}<div>
            <div id="pledged">${game.pledged}<div>
            <div id="backers">Backers: ${game.backers}<div>
            `
            gameCard.innerHTML=gameInfo;
        }
    )

    // use the function we previously created to add the unfunded games to the DOM

}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const funded = GAMES_JSON.filter((game) => game.pledged >= game.goal);

    // use the function we previously created to add unfunded games to the DOM
    funded.forEach((game) => 
        {
        // create a new div element, which will become the game card
            const gameCard = document.createElement("div");
            gameCard.className="game-card";

        // add the class game-card to the list
            gamesContainer.append(gameCard);
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
            const gameInfo = 
            `
            <img src=${game.img} width=280px height=180px>
            <div id="name"><strong>${game.name}</strong><br></br><div>
            <div id="description">${game.description}<div>
            <div id="pledged">${game.pledged}<div>
            <div id="backers">Backers: ${game.backers}<div>
            `
            gameCard.innerHTML=gameInfo;
        }
    )

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", (e) => {
    e.preventDefault();
    filterUnfundedOnly();
})

const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", (e) => {
    e.preventDefault();
    filterFundedOnly();
})

const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showAllGames();
})

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesNum = GAMES_JSON.reduce((res,game) => game.pledged < game.goal ? res + 1 : res, 0)
console.log("unfunded game",unfundedGamesNum)


// create a string that explains the number of unfunded games using the ternary operator
const unfundedGameExplain = `${unfundedGamesNum} ${unfundedGamesNum > 1 ? "have" : "has"} been funded and ${11-unfundedGamesNum} ${11-unfundedGamesNum > 1 ? "have" : "has"} not been funded.` ;
console.log(unfundedGameExplain);

// create a new DOM element containing the template string and append it to the description container
const paragraphElement = document.createElement('p');
paragraphElement.innerHTML=unfundedGameExplain;
descriptionContainer.append(paragraphElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");
const testFilter = GAMES_JSON.filter((game) => { return game.pledged })
console.log("here",testFilter);
const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;
console.log(firstGame, secondGame)

// create a new element to hold the name of the top pledge game, then append it to the correct element
const mostFunded = document.createElement("p");
mostFunded.innerHTML = `${firstGame.name}`;
firstGameContainer.append(mostFunded);

// do the same for the runner up item
const secondMostFunded = document.createElement("p");
secondMostFunded.innerHTML = `${secondGame.name}`;
secondGameContainer.append(secondMostFunded);