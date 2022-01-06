let gameDiv = document.querySelector("#game-container")

const getGames = () => {
    axios.get('/browse')
    
    .then(res =>{
        res.data.forEach(game => {
        console.log(game)
        let gameElem = 
        `<div class='game-box'>
        <h1>${game.game_name}
        <p>Made by ${game.game_username}</p>
        </h1>
        <h2>Description:
        <p>${game.game_description}</p>
        </h2>
        <h3>Total deaths:${game.total_deaths}</h3>
        <h3>Average deaths per game:${game.total_deaths/game.total_completions}</h3>
        <button onclick="location.href='/playgame';">play</button>
        </div>`
        gameDiv.innerHTML += gameElem
    })})
    .catch(err => console.log(err))
}

getGames()