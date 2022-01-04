const usernameInput = document.querySelector("#username-input")
const passwordInput = document.querySelector("#pass-input")
const retypePassInput = document.querySelector("#retype-pass")
const submitBtn = document.querySelector(".submit")

const createUser = () => {
    let body = {
        username: username.value,
        password: password.value,
    }
    if (retypePassInput.value === body.password){
    console.log("yeah")
    }
}

submitBtn.addEventListener("click", createUser)