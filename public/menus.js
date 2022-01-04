const gameSec = document.querySelector(".hidden-sec")
const createBtn = document.getElementById("create-level-btn")
const body = document.querySelector(".all-elements")
const showGameDiv = () =>{
    body.classList.toggle("blur")
    gameSec.classList.toggle("showCreate")
}

createBtn.addEventListener("click", showGameDiv)   
let userStuff = JSON.parse(window.localStorage.getItem('user'))
if (userStuff[1] === 1){
    console.log("cool")
} 