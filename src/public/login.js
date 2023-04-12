const formDOM = document.querySelector('.form')
const usernameInputDOM = document.querySelector('.username-input')
const passwordInputDOM = document.querySelector('.password-input')
const formAlertDOM = document.querySelector('.form-alert')
const form = document.querySelector('.form')
const resultDOM = document.querySelector('.result')
const btnDOM = document.querySelector('#data')
const tokenDOM = document.querySelector('.token')
const message = document.querySelector('#message-div')
const message_text = document.querySelector('#message-text')
const overlay = document.querySelector('#overlay')
const loading_animaton = document.querySelector('#loading-animation')
const signup = document.querySelector('#signup')

function redirectWithLoading() {
    document.getElementById("overlay").style.display = "flex";
    setTimeout(function () {
        document.getElementById("overlay").style.display = "none";
    }, 2000);
    window.location.href = "http://localhost:3000/index";
}


formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
   
    usernameInputDOM.classList.remove('text-success')
    passwordInputDOM.classList.remove('text-success')
   
    const username = usernameInputDOM.value
    const password = passwordInputDOM.value

    console.log(username, password);

        try {
            const { data } = await axios.post('/login', { "username": username, "password": password })
            console.log(data);
            usernameInputDOM.classList.add('text-success')
            passwordInputDOM.classList.add('text-success')
            usernameInputDOM.value = ''
            passwordInputDOM.value = ''
            localStorage.setItem('token', data.accessToken)
            localStorage.setItem('username', username)
            message_text.innerHTML = "Pomyślnie zalogowano!"
            overlay.classList.add("overlay-loading")

            loading_animaton.classList.add("loading-animation")
            document.getElementById("overlay").style.display = "flex";
            redirectWithLoading()
        

        } catch (error) {
            console.log("Error", error);
            message_text.innerHTML = "Nie poprawny login lub hasło!"
            localStorage.removeItem('token')
            usernameInputDOM.classList.add('text-fail')
            passwordInputDOM.classList.add('text-fail')
            message_text.style.backgroundColor = "red"
            usernameInputDOM.value = ''
            passwordInputDOM.value = ''
        }

})

signup.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href = "http://localhost:3000/signup";
})