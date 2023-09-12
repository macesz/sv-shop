function delete_cookie(name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}
// func to get a specific value from cookie by name
function getCookie(name) {
    // need to get a cookie string that is after "; {name}=" and before next ";". Before we do any processing, 
    // we put a "; " in the beginig of the cookie string, so that every cookie name, 
    // including the first one, is enclosed with "; " and "=":
    // let name is "userName"
    // so we have this cookie: 'userName=luna; userEmail=cica%40baba; other=fdf'
    const value = `; ${document.cookie}`;  // put a ";" in the begining

    // i get this string "; userName=luna; userEmail=cica%40baba; other=fdf"

    // Now, we can first split by "; {name}=", 
    const parts = value.split(`; ${name}=`); // split value between every ";" an "=" so now we have two elements)
    // split('; userName=')
    // now it seems like this: 
    // 1. "userName=luna"
    // 2. cica%40baba; other=fdf;

    // we will end up with second element being a string that begins with our cookie value. 
    // Then with the pop() i take the last (ie. 2. "cica%40baba; other=fdf" ) 
    // he last pull that out from an array , and repeat the same process, 
    // but now with split(";") as a token chops "cica%40baba; other=fdf"
    // so `i can get the first item from the results with shift

    if (parts.length === 2) return parts.pop().split(';').shift(); // cica%40baba
}

// creat a variable to store later the loged in user
let logedUser = null

// I got the email from the cooke, but the cookies are stored in URI encoded so I need to decode to get "@"
if (decodeURIComponent(getCookie("userEmail")) != "") {
    logedUser = {
        userEmail: decodeURIComponent(getCookie("userEmail")),
        userName: decodeURIComponent(getCookie("userName"))
    }
}

const signIn = () => {

    let userEmail = document.getElementById('userEmail').value;
    let userPassword = document.getElementById('userPassword').value;

    fetch('/check', {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify({
            email: userEmail,
            password: userPassword

        })

    })
        .then(res => res.json())
        .then((data) => {
            if (data == null) {
                alert("user not found")
                return false
            }

            document.location = "/products"

        }).catch((err) => {
            console.log(err);
        })

}

// function for email, name, and passwrod validation

const validate = (userName, userEmail, userPassword) => {

    console.log();
    // variables for DOM insert error massages
    let divFromHtml = document.getElementById("container");
    let span = document.createElement('span');
    span.idName = "errmsg";

    // check username, and if not correct insert a dom err message
    if (userName.length < 2 || userName.length > 8) {
        span.innerHTML = 'User name must be between 4-8 character long!!!';
        divFromHtml.append(span);

        return false;
    }

    if (userEmail.indexOf('@') == -1) {

        span.innerHTML = 'Must conatin @';
        divFromHtml.append(span);

        return false;
    }

    if (userPassword.length < 5 || userPassword.length > 10 || userPassword.indexOf('$') == -1) {

        span.innerHTML = 'Password name must be between 5-10 character long and must conatin $ character';
        divFromHtml.append(span);


        return false;
    }

}

// function for signup get the data, to send users to the database

const signUp = () => {

    // variables to store the values/data for the database

    let userName = document.getElementById('userName').value;
    let userEmail = document.getElementById('userEmail').value;
    let userPassword = document.getElementById('userPassword').value;


    // check if we got valide data from the user if not, we won't continue

    if (validate(userName, userEmail, userPassword) == false) {
        return false
    }

    fetch('/reg', {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify({
            name: userName,
            email: userEmail,
            password: userPassword
        })
    })
        .then(res => res.json())
        .then((data) => {
            if (data.success) {
                window.location = "/"
            } else {
                alert(data.error)
            }

        }).catch((err) => {
            console.log(err);
        })
}

