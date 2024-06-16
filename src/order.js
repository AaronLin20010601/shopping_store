//order initialize
let bill = document.getElementById("bill");
let ShoppingCart = document.getElementById("shopping-cart");

//basket of product cart selected
let basket = JSON.parse(localStorage.getItem("data")) || [];

//total amount of the bill
let amount = basket.map((cart) => {
    let {item, id} = cart;
    let search = shopItemsData.find((data) => data.id === id) || [];
    return item * search.price;
}).reduce((previous,next) => previous + next, 0);

//calculate all types of items selected
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((cart) => cart.item).reduce((previous,next) => previous + next, 0);
};
calculation();

//show the total bill and configure place order
let configureCheckout = () => {
    bill.innerHTML = `
    <h2>The total bill amount is : $ ${amount}, Confirm order?</h2>
    <a href="success.html">
        <button onclick="placedOrder()" class="confirm">Yes, place order</button>
    </a>
    <a href="cart.html">
        <button class="denied">No, back to cart</button>
    </a>
    `;
};
configureCheckout();

//generate cart page product function
let generateCartItems = () => {
    return (ShoppingCart.innerHTML = basket.map((cart) => {
        let {id, item} = cart
        let search = shopItemsData.find((data) => data.id === id) || [];
        let {img, name, price} = search;
        return `
        <div class = "cart-item">
            <img width="100" src=${img} alt="">

            <div class="details">
                <h4 class="title-price">
                    <p>${name}</p>
                    <p class="cart-item-price">$ ${price}</p>
                </h4>

                <div id=${id} class="quantity">Amount : ${item}</div>
                <h3>$ ${item * price}</h3>
            </div>
        </div>
        `;
    }).join(""));
};
generateCartItems();

//clear all the products in cart
let placedOrder = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};