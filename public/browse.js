let gameDiv = document.querySelector("#game-container")
let gameId = null
const directGame = () => {
// window.localStorage.setItem('current-game', JSON.stringify(localUserData))
// HOW GET GAME ID WITHOUT ANOTHER GET REQUEST
window.location.replace('/playgame')
}
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
        <h3>Average pass rate:${((game.total_completions/game.total_deaths) * 100).toFixed(2)}%</h3>
        <h3>Fastest Time:${game.game_record} by ${game.record_user}</h3>
        <button onclick="directGame()";">play</button>
        </div>`
        gameDiv.innerHTML += gameElem
    })})
    .catch(err => console.log(err))
}

getGames()