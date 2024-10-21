document.addEventListener("DOMContentLoaded", () => {

    let basket = [];

    
    const buttons = document.querySelectorAll(".dessert button");

   
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            addProductToBasket(index);
        });
    });

 
    function addProductToBasket(index) {
       
        const dessertDiv = document.querySelectorAll(".dessert")[index];
        const productName = dessertDiv.querySelector("h6").innerText;
        const productPrice = dessertDiv.querySelector("h5:last-of-type").innerText;

      
        basket.push({ name: productName, price: productPrice });

       
        updateCart();
    }

  
    function updateCart() {
        const cartSection = document.querySelector(".cart-section");
        
     
        cartSection.innerHTML = `
            <h2>Your Cart (${basket.length})</h2>
            <ul class="cart-items"></ul>
            <h5>Total: $<span id="totalPrice">0.00</span></h5>
            <button id="order-button" class="hidden">Confirm Order</button>
        `;

        const cartItems = document.querySelector(".cart-items");
        let totalPrice = 0;

        
        basket.forEach(item => {
            const li = document.createElement("li");
            li.innerText = `${item.name} - ${item.price}`;
            cartItems.appendChild(li);
        
       
            totalPrice += parseFloat(item.price.replace('$', ''));
        });

        
        document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);

        
        showOrderButton();
    }

   
    function showOrderButton() {
        const orderButton = document.getElementById("order-button");
        if (basket.length > 0) {
            orderButton.classList.remove("hidden");
        } else {
            orderButton.classList.add("hidden");
        }
    }
});
