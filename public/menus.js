const gameSec = document.querySelector(".hidden-sec")
const createBtn = document.getElementById("create-level-btn")
const body = document.querySelector(".all-elements")
const loginBtn = document.querySelector("#login")
const actionSec = document.querySelector(".action-sec")

const popUpText = document.querySelector("#popup-text")
const popUpBtn = document.querySelector("#popup-button")
const showGameDiv = () =>{
    body.classList.toggle("blur")
    gameSec.classList.toggle("showCreate")
}

const directCreate = () =>{
window.location.replace('/createlevel')
}
const directExisting = () => {
window.location.replace('/mygames')
}
createBtn.addEventListener("click", showGameDiv)   
popUpBtn.addEventListener("click", showGameDiv)
let userStuff = JSON.parse(window.localStorage.getItem('user'))
if (Number.isFinite(userStuff[1])){
    loginBtn.textContent = `logged in as ${userStuff[0]}`
    popUpText.textContent = `What would you like to do?`
    let newGameLink = document.createElement("button")
    let existingGamesLink = document.createElement('button')
    newGameLink.textContent="Create new game"
    existingGamesLink.textContent="See existing games"
    newGameLink.classList.add("sec")
    existingGamesLink.classList.add("sec")
    newGameLink.addEventListener("click",directCreate)
    existingGamesLink.addEventListener("click",directExisting)
    actionSec.appendChild(newGameLink)
    actionSec.appendChild(existingGamesLink)

    

} 