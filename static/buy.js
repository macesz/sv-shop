const getCart = () => {
    let cart = sessionStorage.getItem("cart");
    if (cart == null || cart == "") {
        cart = []
    } else {
        cart = JSON.parse(cart)
    }

    return cart
}
const buyItem = () => {
    let cart = getCart()

    let sum = 0

    cart.forEach(element => {
        sum += element.productPrice
    });

    document.getElementById("totalProducts").innerText = cart.length
    document.getElementById("totalPrice").innerText = sum;


}
const approve = (productName, productPrice) => {

    let cart = getCart()

    // let userEmail = document.getElementById('userEmail');
    // let productName = document.getElementsByClassName('productName');
    // let productPrice = document.getElementsByClassName('productPrice');

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

    delete_cookie("userEmail")
    delete_cookie("userName")

    window.location = '/'


}



buyItem()