async function check_form() {
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    var name = document.getElementById("name").value
    var lastname = document.getElementById("lastname").value
    var doc = document.getElementById("document").value
    var phone = document.getElementById("phone").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var conf_password = document.getElementById("confirm_password").value

    if(check_fields(name, lastname, doc, phone, email, password, conf_password)) {
        if(expReg.test(email)) {
            if(password == conf_password) {
                document.querySelector("p").innerHTML = ""
                document.querySelector(".password").style.borderBottom = "2px solid #adadad"
                document.querySelector(".conf_password").style.borderBottom = "2px solid #adadad"
                document.querySelector(".password span").style.background = "#2691d9"
                document.querySelector(".conf_password span").style.background = "#2691d9"
    
                register(name, lastname, doc, phone, email, password)
            }else {
                document.querySelector("#email_field").style.border = "none"
                document.querySelector("#email_field span").style.background = "#2691d9"
    
                document.querySelector("p").innerHTML = "Las contraseñas deben ser iguales"
                document.querySelector(".password").style.border = "2px solid red"
                document.querySelector(".conf_password").style.border = "2px solid red"
                document.querySelector(".password").style.background = "red"
                document.querySelector(".conf_password").style.background = "red"
            }
        }else {
            document.querySelector("p").innerHTML = "Ingrese un email válido"
            document.querySelector(".email").style.border = "2px solid red"
            document.querySelector(".email span").style.background = "red"
        }
    }
}

function check_fields(name, lastname, doc, phone, email, password, conf_password) {
    var bool = false

    if(name == "") {
        document.querySelector(".name").style.border = "2px solid red"
        document.querySelector(".name span").style.background = "red"
        bool = true
    }

    if(lastname == "") {
        document.querySelector(".lastname").style.border = "2px solid red"
        document.querySelector(".lastname span").style.background = "red"
        bool = true
    }

    if(doc == "") {
        document.querySelector(".document").style.border = "2px solid red"
        document.querySelector(".document span").style.background = "red"
        bool = true
    }

    if(phone == "") {
        document.querySelector(".phone").style.border = "2px solid red"
        document.querySelector(".phone span").style.background = "red"
        bool = true
    }

    if(email == "") {
        document.querySelector(".email").style.border = "2px solid red"
        document.querySelector(".email span").style.background = "red"
        bool = true
    }

    if(password == "") {
        document.querySelector(".password").style.border = "2px solid red"
        document.querySelector(".password span").style.background = "red"
        bool = true
    }

    if(conf_password == "") {
        document.querySelector(".conf_password").style.border = "2px solid red"
        document.querySelector(".conf_password span").style.background = "red"
        bool = true
    }

    if(bool) {
        document.querySelector("p").innerHTML = "Faltan campos por rellenar"
        return false
    }else {
        document.querySelector("p").innerHTML = ""
        return true
    }
}

async function register(name, lastname, doc, phone, email, password) {
    var data = {}
    data._id = doc
    data.name = name
    data.lastname = lastname
    data.phone = phone
    data.email = email
    data.password = password
    
    const request = await fetch("/employees", {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const response = await request.json()

    console.log(response)

    if(response == null) {
        document.querySelector("p").innerHTML = "Algo salió mal"
    }else {
        document.querySelector("p").innerHTML = "Registro Exitoso"
        setTimeout(function() {
            window.location.assign("/")
        }, 3000)
    }
}