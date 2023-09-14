const getAllOrders = () => {

    //Find the container where we attach everything to
    let ordersDiv = document.querySelector('#container');

    fetch('/getAllOrders', {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'get',
        // body: JSON.stringify({})
    })
        .then(res => res.json())
        .then((data) => {

            // alert(data)
            data.forEach(order => {
                // console.log(order);
                // create p with email
                const email = document.createElement("p")
                email.className = "email"
                email.innerText = order.userEmail
                // add p to div container
                ordersDiv.appendChild(email);
                // create ul for cart items
                const cartListUl = document.createElement('ul');
                cartListUl.className = "cartListUl"

                // initial set sumPrice to 0 for this order
                let sum = 0

                order.cart.forEach(product => {
                    //create li 
                    const cartElementList = document.createElement('li');
                    cartElementList.className = "orderedElelemts"
                    const cartElementPn = document.createElement('span');
                    cartElementPn.className = "productName"
                    const cartElementPrice = document.createElement('span');
                    cartElementPrice.className = "productPrice"


                    sum += product.productPrice


                    cartElementPn.innerText = `${product.productName}: `
                    cartElementPrice.innerText = `${product.productPrice} ₪`


                    console.log(product.productName);
                    // append spans to li
                    cartElementList.appendChild(cartElementPn)
                    cartElementList.appendChild(cartElementPrice)


                    // append li to ul
                    cartListUl.appendChild(cartElementList)


                    // console.log(product);
                });

                // append ul to div container
                ordersDiv.appendChild(cartListUl)

                const sumPrice = document.createElement('div');
                sumPrice.className = "sumPrice"
                sumPrice.innerText = `Order total price is: ${sum}`
                ordersDiv.appendChild(sumPrice)
            });
            // console.log(data);


        }).catch((err) => {
            console.log(err);
        })
}

getAllOrders()