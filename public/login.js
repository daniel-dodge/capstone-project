const usernameInput = document.querySelector("#username-input")
const passwordInput = document.querySelector("#pass-input")
const submitBtn = document.querySelector(".submit")

const logIn = () => {
    let body = {
        username : usernameInput.value,
        password: passwordInput.value
    }
    // console.log(body)
    if(body.username.length >= 7 && body.username.length <= 15){
        // console.log("name length ok")
        if(body.password.length >= 8){
            // console.log("pass length ok")
            // console.log(body)
            axios.post('/login', body)
            .then(res => {
                let user = res.data[0]
                let localUserData = [res.data[0].user_username,res.data[0].user_id]
                //set user id onto local storage
                if (body.username === user.user_username && body.password === user.user_password){
                    alert('You have successfully logged in!')
                    window.localStorage.setItem('user', JSON.stringify(localUserData))
                    window.location.replace('/')
                } else {alert("Incorrect username or password")}
            })
            .catch(err => console.log(err))
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