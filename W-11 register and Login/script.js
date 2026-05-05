const API_URL = "https://jsonplaceholder.typicode.com/users";
const r_name = document.getElementById('name');
const r_username = document.getElementById('username');
const r_password = document.getElementById('password');
const r_email = document.getElementById('email');
const r_phn = document.getElementById('phn');
const r_dob = document.getElementById('dob');
const r_city = document.getElementById('city');
const r_address = document.getElementById('address');



const regBtn = document.getElementById('regBtn');


const regForm = document.getElementById('regform');





regBtn.addEventListener('click',function (){
    regForm.reportValidity();

    let newUser = {
        "name" : r_name.value.trim(),
        "username" : r_username.value.trim(),
        "password" : r_password.value,
        "email" : r_email.value.trim(),
        "phn" : r_phn.value.trim(),
        "dob" : r_dob.value.trim(),
        "city" : r_city.value.trim(),
        "address" : r_address.value.trim()
    }

    fetch(`${API_URL}`,{
        method:'POST',
        body:JSON.stringify(newUser),
        headers: {'Content-type':'application/json'}
    })
    .then(response =>{
        return response.json();
    })
    .then(data => {
        console.log("User registered successfully !",data);

        let usersArray = JSON.parse(localStorage.getItem('myUsers')) || [];

        const userExists = usersArray.some(user => user.username === newUser.username);

        if(userExists){
            document.getElementById('regError').innerHTML = `<span class="text-danger">Username already taken!</span>`;
            return;
        }

        usersArray.push(newUser);
        localStorage.setItem('myUsers',JSON.stringify(usersArray));

        document.getElementById('regError').innerHTML = `<span class="text-success fw-bold">Registration Successful! You can now login.</span>`;

        regForm.reset();
   
    })
    .catch(error=>{
        console.error("AJAX Error: ",error);
    })

})




const l_username = document.getElementById('loginusername');
const l_password = document.getElementById('loginpassword');
const logBtn = document.getElementById('logBtn');
const logForm = document.getElementById('logform');
const loginError = document.getElementById('loginError');


logBtn.addEventListener('click',function(){
    if(!logForm.reportValidity()){
        return;
    }

    const userinput = l_username.value.trim();
    const userpass = l_password.value.trim(); 

    let usersArray = JSON.parse(localStorage.getItem('myUsers')) || [];

    const validUser = usersArray.find(user => user.username === userinput && user.password === userpass);

    if(validUser){
        localStorage.setItem('loggedInUser',validUser.username);
        loginError.innerHTML = `<span class="text-success fw-bold">Login Successful! Redirecting...</span>`;

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    }else{
        loginError.innerHTML = `<span class="text-danger fw-bold">Invalid Username or Password.</span>`;
    }


});



