function check_email() {
    var email = document.getElementById("email").value
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  
    if(expReg.test(email)) {
        document.getElementById("response").innerHTML = ""
        document.querySelector("#email_field").style.border = "none"
        document.querySelector("#email_field span").style.background = "#2691d9"

        login()
    }else {
        document.getElementById("response").innerHTML = "Ingrese un email válido"
        document.querySelector("#email_field").style.border = "2px solid red"
        document.querySelector("#email_field span").style.background = "red"
    }
}
  
async function login() {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    const request = await fetch("/login?email="+email+"&password="+password, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    })

    const response = await request.json()

    console.log(response)

    if(response == null) {
        document.getElementById("response").innerHTML = "Usuario y/o Contraseña Inválidos"
    }else {
        localStorage.token = "Bearer " + response.token
        window.location.assign("/functions")
    }
}