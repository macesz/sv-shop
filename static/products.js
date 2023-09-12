

const listProducts = () => {
    // get the selected input value from the select tag
    let sortBy = document.getElementById('sortBy').value;

    // fetch to get all the datas from the database
    fetch('/getProduct', {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify({
            sortBy: sortBy,

        })

    })
        .then(res => res.json())
        .then((data) => {
            // call the renderProducts function with the datas from the database
            renderProducts(data)

        }).catch((err) => {
            console.log(err);
        })

}



const renderProducts = (data) => {
    //Find the container where we attach everything to
    let productsDiv = document.querySelector('#container');

    // clear container
    productsDiv.innerHTML = "";

    const productList = document.createElement('ul');
    productsDiv.appendChild(productList);

    for (let i = 0; i < data.length; i++) {

        //Create all necessary elements

        const productLi = document.createElement('li');
        const productNameDiv = document.createElement('div');
        const productElement = document.createElement("p")
        const productPriceDiv = document.createElement('div');

        //Add appropriate classes and ids. Grab data and insert if needed.
        productLi.className = 'productLi'
        // event listener for click event to select product
        productLi.addEventListener("click", function () {

            // creat variable to store sessionStorage items for our cart
            let cart = sessionStorage.getItem("cart");
            // if the cart is empty creat a new array
            if (cart == null || cart == "") {
                cart = []
            } else {
                // else if i already have items i got as a Json string I need to 
                // 'destringify' =>parse the cart elements to convert the Json string to an array
                cart = JSON.parse(cart) // "[{}]"
            }

            // creat a variable for the carItem object
            let cartItem = {
                productName: data[i].productName,
                productPrice: data[i].productPrice
            }
            // pusch cartItem to cart
            cart.push(cartItem)
            //Save data to sessionStorage and stringify convert from array to a json string
            // 
            sessionStorage.setItem("cart", JSON.stringify(cart))

            console.log(cart);

            // addToOrder(data[i].productName, data[i].productPrice)
        }, false);

        productNameDiv.className = 'productName'
        productPriceDiv.className = 'productPrice'
        productElement.className = "productElement"
        //Grab data and insert it into created elements
        productElement.innerText = data[i].productName
        productPriceDiv.innerText = data[i].productPrice

        //Append everything to main container
        productNameDiv.appendChild(productElement)
        productLi.appendChild(productNameDiv)
        productLi.appendChild(productPriceDiv)
        productList.appendChild(productLi)
    }
}

// function to simpli redirect to the buy webpage
const gotoByItem = () => {
    window.location = '/buy'
}

// call function to list the products wehn the page loaded
listProducts()

