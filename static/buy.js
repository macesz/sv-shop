// function getCart return with all the elemnet in the cart stored in an variable
const getCart = () => {
    let cart = sessionStorage.getItem("cart");
    if (cart == null || cart == "") {
        cart = []
    } else {
        cart = JSON.parse(cart)
    }

    return cart
}

// function buyItem call the getCart to get the stored datas
const buyItem = () => {
    let cart = getCart()

    // than iterates throuh the cart elements 
    let sum = 0

    cart.forEach(element => {
        sum += element.productPrice
    });

    // than with dom its put the results to the browser

    document.getElementById("totalProducts").innerText = cart.length
    document.getElementById("totalPrice").innerText = sum;


}

// the approve function 
const approve = () => {

    // get the stored datas from sessionStorage and store in a variable "cart"
    let cart = getCart()

    // fetch the datas to the databaes
    fetch('/buy', {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify({
            userEmail: logedUser.userEmail,
            cart: cart
        })
    })
        .then(res => res.json())
        .then((data) => {

            alert(data)


        }).catch((err) => {
            console.log(err);
        })

    // delete cookies
    delete_cookie("userEmail")
    delete_cookie("userName")

    // redirect to the index page
    window.location = '/'


}



buyItem()