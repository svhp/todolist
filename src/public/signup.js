const submitBtn = document.getElementById('submit-btn');
const usernameinput = document.getElementById('username');
const emailinput = document.getElementById('email');
const passwordinput = document.getElementById('password');
const firstnameinput = document.getElementById('firstname');
const lastnameinput = document.getElementById('lastname');

const messageText = document.getElementById('message-text');
const form = document.querySelector('.form');
const backBtn = document.getElementById('back-btn');

function handleSuccess(response) {
    if (response === 'User created successfully!')
    {
    usernameinput.classList.remove('text-fail');
    passwordinput.classList.remove('text-fail');
    firstnameinput.classList.remove('text-fail');
    lastnameinput.classList.remove('text-fail');
    emailinput.classList.remove('text-fail');

    usernameinput.classList.add('text-success');
    passwordinput.classList.add('text-success');
    firstnameinput.classList.add('text-success');
    lastnameinput.classList.add('text-success');
    emailinput.classList.add('text-success');

    messageText.style.backgroundColor = "green";
    messageText.innerHTML = "Successfully registered!\n Redirecting to login page...";
    setTimeout(() => {
        window.location.href = "http://localhost:3000/login";
    }, 3000);}
}


function handleErrors(response) {
    
    if (response === "Error: Username already taken!"){
        usernameinput.classList.add('text-fail');
        usernameinput.classList.remove('text-success');
        messageText.style.backgroundColor = "red";
        messageText.innerHTML = response;
        setTimeout(() => {
            messageText.innerHTML = "Try again...";
        }, 3000);
    }
    if (response === "Error: Email already taken!") {
        emailinput.classList.add('text-fail');
        emailinput.classList.remove('text-success');
        messageText.style.backgroundColor = "red";
        messageText.innerHTML = response;
        setTimeout(() => {
            messageText.innerHTML = "Try again...";
        }, 3000);
    }
    if (response === "Error: Email is not valid!") {
        emailinput.classList.add('text-fail');
        emailinput.classList.remove('text-success');
        messageText.style.backgroundColor = "red";
        messageText.innerHTML = response;
        setTimeout(() => {
            messageText.innerHTML = "Try again...";
        }, 3000);
    }
    if (response === "Error: Please fill all fields") {
        messageText.style.backgroundColor = "red";
        messageText.innerHTML = response;
        setTimeout(() => {
            messageText.innerHTML = "Try again...";
        }, 3000);
    }

}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;


    const data = {
        username: username,
        password: password,
        firstName: firstname,
        lastName: lastname,
        email: email
    };
    console.log(data);   
    axios.post('/signup', data)
    .then((res) => {
        console.log("Success: ", res.data.msg);
        handleSuccess(res.data.msg);
       
    })
    .catch((err) => {
        handleErrors(err.response.data.msg);
        handleSuccess(err.response.data.msg);

        }
    ); 
});


backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:3000/login";
});
