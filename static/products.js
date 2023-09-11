

const listProducts = () => {


    let sortBy = document.getElementById('sortBy').value;

    fetch('/getProduct', {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify({
            sortBy: sortBy,
            //     searchKey: searchText

        })

    })
        .then(res => res.json())
        .then((data) => {
            // call the renderProducts function with param data
            renderProducts(data)

        }).catch((err) => {
            console.log(err);
        })

}

const addToOrder = (productName, productPrice) => {
    // let userName = document.getElementById('userName');
    // let productName = document.getElementsByClassName('productName');
    // let productPrice = document.getElementsByClassName('productPrice');

    fetch('/addToOrder', {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify({
            userEmail: logedUser.userEmail,
            productName: productName,
            price: productPrice
        })
    })
        .then(res => res.json())
        .then((data) => {

            alert(data)

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
            // alert("You clicked the white element!" + data[i].productName);

            // creat session storage to store the selected product
            addToOrder(data[i].productName, data[i].productPrice)
        }, false);

        productNameDiv.className = 'productName'
        productPriceDiv.className = 'productPrice'
        productElement.className = "productElement"
        //Grab data and insert it into created elements
        productElement.innerText = data[i].productName
        // productLink.setAttribute("href", "product/" + data[i]._id)
        productPriceDiv.innerText = data[i].productPrice



        //Append everything to main container
        productNameDiv.appendChild(productElement)
        productLi.appendChild(productNameDiv)
        productLi.appendChild(productPriceDiv)

        productList.appendChild(productLi)



    }
}

// call function to list the products wehn the page loaded
listProducts()

