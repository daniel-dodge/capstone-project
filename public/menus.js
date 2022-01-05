const gameSec = document.querySelector(".hidden-sec")
const createBtn = document.getElementById("create-level-btn")
const body = document.querySelector(".all-elements")
const loginBtn = document.querySelector("#login")

const popUpText = document.querySelector("#popup-text")
const popUpBtn = document.querySelector("#popup-button")
const showGameDiv = () =>{
    body.classList.toggle("blur")
    gameSec.classList.toggle("showCreate")
}

createBtn.addEventListener("click", showGameDiv)   
popUpBtn.addEventListener("click", showGameDiv)
let userStuff = JSON.parse(window.localStorage.getItem('user'))
if (Number.isFinite(userStuff[1])){
    loginBtn.textContent = `logged in as ${userStuff[0]}`
    popUpText.textContent = "Nice."
} 