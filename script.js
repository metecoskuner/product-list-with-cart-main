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

        const existingProduct = basket.find(item => item.name === productName);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            basket.push({ name: productName, price: productPrice, quantity: 1 });
        }
        
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

        basket.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span style="color: hsl(14, 57%, 51%); font-weight: bold;">${item.quantity}x</span> 
                ${item.name} - ${item.price}
                <button class="remove-button" data-index="${index}">&times;</button>
            `;
            cartItems.appendChild(li);

            totalPrice += item.quantity * parseFloat(item.price.replace('$', ''));
        });

        document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);
        showOrderButton();

        const removeButtons = document.querySelectorAll(".remove-button");
        removeButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const itemIndex = event.target.getAttribute("data-index");
                removeProductFromBasket(itemIndex);
            });
        });

        const orderButton = document.getElementById("order-button");
        if (orderButton) {
            orderButton.addEventListener("click", () => {
                const popup = document.getElementById("popup");
                popup.classList.remove("hidden");
            });
        }
    }

    function removeProductFromBasket(index) {
        const item = basket[index];
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            basket.splice(index, 1);
        }
        updateCart();
    }

    function showOrderButton() {
        const orderButton = document.getElementById("order-button");
        if (basket.length > 0) {
            orderButton.classList.remove("hidden");
        } else {
            orderButton.classList.add("hidden");
        }
    }

    // Pop-up içindeki cancel ve confirm butonları için event listener ekleme
    const cancelButton = document.getElementById("cancel-button");
    const confirmButton = document.getElementById("confirm-button");

    if (cancelButton && confirmButton) {
        cancelButton.addEventListener("click", () => {
            const popup = document.getElementById("popup");
            popup.classList.add("hidden");
        });
        
        confirmButton.addEventListener("click", () => {
            alert("Order confirmed!");
            basket = [];
            updateCart();
            const popup = document.getElementById("popup");
            popup.classList.add("hidden");
        });
    }
});
