let Alert = document.querySelector('.alert-error')
let Loading = document.querySelector('.loading')
//acc:correct_login@example.com
//pass:C0rr3Ct_P@55w0rd
//Validate Login
document.querySelector('.btn--login').addEventListener('click', ()=>{
    let email = document.querySelector('#mail').value
    let password = document.querySelector('#pass').value
    if(email == ""){
        document.querySelector('.error-text-mail').style.display = 'block'
        document.getElementById('mail').classList.add('error_mail')
    }else{
        document.querySelector('.error-text-mail').style.display = 'none'
        document.getElementById('mail').classList.remove('error_mail')
    }
    if(password == ""){
        document.querySelector('.error-text-pass').style.display = 'block'
        document.getElementById('pass').classList.add('error_pass')
    }
    else{
        document.querySelector('.error-text-pass').style.display = 'none'
        document.getElementById('pass').classList.remove('error_pass')
    }
    const DataPost = {
        login: email,
        password: password
    };
    if(email != "" && password != ""){
        Loading.style.display = 'block'
        fetch('https://recruitment-api.pyt1.stg.jmr.pl/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DataPost)
        })
            .then(response => {
                if (response.ok) {
                   
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (data.status === 'ok') {
                    window.location.href = 'home.html';
                } else {
                    Loading.style.display = 'none'
                    Alert.innerText = 'email or password is incorrect'
                    Alert.classList.add('active')  
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
})