const usernameInput = document.querySelector("#username-input")
const passwordInput = document.querySelector("#pass-input")
const submitBtn = document.querySelector(".submit")


const logIn = () => {
    let body = {
        username : usernameInput.value,
        password: passwordInput.value
    }
    if(body.username.length >= 7 && body.username.length <= 15){
        console.log("name length ok")
        if(body.password.length >= 8){
            console.log("pass length ok")
            console.log(body)
            axios.get('/user', body)
            .then(res => {
                console.log(res.data)
                if (body.username === res.data.user_username && body.password === res.data.user_password){
                    alert('cool they match')
                } else {alert("Incorrect username or password")}
            })
            .catch(err => console.log("line 22 catch"+err))
        } else{
            alert("Password should be at least 8 characters long")
        }
    } else{
        alert("Username should be at least 7-15 characters long")
    }
    
    usernameInput.value = ""
    passwordInput.value = ""


}

submitBtn.addEventListener("click", logIn)