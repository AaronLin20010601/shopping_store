//cart initialize
let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

//basket of product cart selected
let basket = JSON.parse(localStorage.getItem("data")) || [];

//calculate all types of items selected
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((cart) => cart.item).reduce((previous,next) => previous + next, 0);
};
calculation();

//generate cart page product function
let generateCartItems = () => {
    if(basket.length !== 0) {
        return (ShoppingCart.innerHTML = basket.map((cart) => {
            let {id, item} = cart
            let search = shopItemsData.find((data) => data.id === id) || [];
            let {img, name, price} = search;
            return `
            <div class = "cart-item">
                <img width="100" src=${img} alt="">

                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>

                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>

                    <h3>$ ${item * price}</h3>
                </div>
            </div>
            `;
        }).join(""));
    }

    //when the cart is empty, show home page button and cart empty messange
    else {
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
            <button class="HomeButton">Back to home</button>
        </a>
        `;
    }
};
generateCartItems();

//increment the amount of product
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((item) => item.id === selectedItem.id);

    if(search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }

    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    update(selectedItem.id);
};

//decrement the amount of product
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((item) => item.id === selectedItem.id);

    if(search === undefined) {
        return;
    }
    else if(search.item === 0) {
        return;
    }
    else {
        search.item -= 1;
    }
    
    update(selectedItem.id);
    //remove the item in local array with the amount 0
    basket = basket.filter((cart) => cart.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

//remove the whole item inside the cart page
let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((item) => item.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

//update the amount of product
let update = (id) => {
    let search = basket.find((item) => item.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

//calculate and show total price amount
let TotalAmount = () => {
    if(basket.length !== 0) {
        let amount = basket.map((cart) => {
            let {item, id} = cart;
            let search = shopItemsData.find((data) => data.id === id) || [];
            return item * search.price;
        }).reduce((previous,next) => previous + next, 0);

        label.innerHTML = `
        <h2>Total bill : $ ${amount}</h2>
        <a href="order.html">
            <button class="confirm">Check out</button>
        </a>
        <button onclick="clearCart()" class="denied">Clear cart</button>
        `;
    }
    else {
        return;
    }
};
TotalAmount();

//clear all the products in cart
let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};