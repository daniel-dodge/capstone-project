const usernameInput = document.querySelector("#username-input")
const passwordInput = document.querySelector("#pass-input")
const retypePassInput = document.querySelector("#retype-pass")
const submitBtn = document.querySelector(".submit")

const createUser = () => {
    let body = {
        username: usernameInput.value,
        password: passwordInput.value
    }
    
    if (retypePassInput.value === body.password){
        if(body.username.length >= 7 && body.username.length <= 15){
            if(body.password.length >= 8){
                axios.post('/user', body)
                .then(res => alert("Account succesfully created!"))
                .catch(err => console.log(err))
            } else{
                alert("Password should be at least 8 characters long")
            }
        } else{
            alert("Username should be at least 7-15 characters long")
        }
    } else {
        alert("Passwords must match")
    }

    usernameInput.value = ""
    passwordInput.value = ""
    retypePassInput.value = ""
}

submitBtn.addEventListener("click", createUser)