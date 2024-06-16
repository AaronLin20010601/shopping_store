//shop initialize
let shop = document.getElementById("shop");

//basket of product cart selected
let basket = JSON.parse(localStorage.getItem("data")) || [];

//generate shop page product function
let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((item) => {
        let {id, name, price, img, description} = item;
        let search = basket.find((item) => item.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
            <img width="220" src=${img} alt="">

            <div class="details">
                <h3>${name}</h3>
                <p>${description}</p>

                <div class="price-quantity">
                    <h2>$ ${price}</h2>

                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join(""));
};
generateShop();

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
    localStorage.setItem("data", JSON.stringify(basket));
};

//update the amount of product
let update = (id) => {
    let search = basket.find((item) => item.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

//calculate all types of items selected
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((cart) => cart.item).reduce((previous,next) => previous + next, 0)
};
calculation();