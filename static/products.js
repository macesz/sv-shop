
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
        const productLink = document.createElement("a")
        const productPriceDiv = document.createElement('div');

        //Add appropriate classes and ids. Grab data and insert if needed.
        productLi.className = 'productLi'
        productNameDiv.className = 'productName'
        productPriceDiv.className = 'productPrice'

        //Grab data and insert it into created elements
        productLink.innerText = data[i].productName
        productLink.setAttribute("href", "product/" + data[i]._id)
        productPriceDiv.innerText = data[i].productPrice

        //Append everything to main container
        productNameDiv.appendChild(productLink)
        productLi.appendChild(productNameDiv)
        productLi.appendChild(productPriceDiv)

        productList.appendChild(productLi)
    }
}

// call function to list the products wehn the page loaded
listProducts()

