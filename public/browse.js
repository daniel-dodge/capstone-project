let gameDiv = document.querySelector("#game-container")
let gameId = null
const directGame = (event) => {
window.localStorage.setItem('current-game', event.target.parentNode.childNodes[11].textContent)

window.location.replace('/playgame')
}
const getGames = () => {
    axios.get('/browse')
    
    .then(res =>{
        res.data.forEach(game => {
         let gameBox = document.createElement('div')
         gameBox.classList.add("game-box")
         gameBox.innerHTML = `
         <h1 class = "game-text">${game.game_name}
         <p class = "game-text light">Made by ${game.game_username}</p>
         </h1>
         <h2 class = "game-text">Description:
         <p class = "game-text light">${game.game_description}</p>
         </h2>
         <h3 class = "game-text light">Total deaths:${game.total_deaths}</h3>
         <h3 class = "game-text light">Average pass rate:${((game.total_completions/game.total_deaths) * 100).toFixed(2)}%</h3>
         <h3 class = "game-text light">Fastest Time:${game.game_record} <p class= "game-text light"> by ${game.record_user}</p></h3>
         
         <p class = "game-text light">${game.game_id}</p>
         `

        let btn = document.createElement('button')
        btn.addEventListener("click",directGame)
        btn.textContent = "Play"
        btn.classList.add("play-btn")
        gameBox.appendChild(btn)
        gameDiv.appendChild(gameBox)
    })})
    .catch(err => console.log(err))
}

getGames()