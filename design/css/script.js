let index = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

// Clone first and last slides
const carouselContainer = document.querySelector(".carousel-container");
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);

carouselContainer.appendChild(firstClone);
carouselContainer.insertBefore(lastClone, slides[0]);

// Update slides reference after cloning
const updatedSlides = document.querySelectorAll(".slide");

// Adjust container position to start at the first real slide
carouselContainer.style.transform = `translateX(-100%)`;

function moveSlide(step) {
    index += step;
    carouselContainer.style.transition = "transform 0.5s ease-in-out";
    carouselContainer.style.transform = `translateX(-${(index + 1) * 100}%)`;

    // Loop around smoothly after transition completes
    setTimeout(() => {
        if (index >= totalSlides) {
            index = 0;
            carouselContainer.style.transition = "none";
            carouselContainer.style.transform = `translateX(-100%)`;
        } else if (index < 0) {
            index = totalSlides - 1;
            carouselContainer.style.transition = "none";
            carouselContainer.style.transform = `translateX(-${totalSlides * 100}%)`;
        }
    }, 500);
}

// Auto-play functionality (optional)
setInterval(() => moveSlide(1), 3000);

function filterProducts() {
    let input = document.getElementById("search-input").value.toLowerCase(); // Get input and convert to lowercase
    let products = document.querySelectorAll(".product"); // Get all product elements

    products.forEach(product => {
        let productName = product.querySelector(".product-name").textContent.toLowerCase(); // Get product name

        if (productName.includes(input)) {
            product.style.display = "block"; // Show matching products
        } else {
            product.style.display = "none"; // Hide non-matching products
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    let cartItems = []; // Stores added products

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let product = this.closest(".product");
            let productName = product.querySelector(".product-name").textContent;
            let productPrice = product.querySelector(".product-price").textContent;
            let productImage = product.querySelector(".product-image").src;

            // Add product to cart array
            cartItems.push({ name: productName, price: productPrice, image: productImage });

            // Update cart UI
            updateCartDropdown();

            // Show success message
            Swal.fire({
                title: "Success!",
                text: "Item added to cart successfully!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                position: "center"
            });
        });
    });

    function updateCartDropdown() {
        let cartDropdown = document.getElementById("cart-items");
        let emptyMessage = document.getElementById("empty-message");
        let cartCount = document.getElementById("cart-count");

        // Clear previous cart content
        cartDropdown.innerHTML = "";

        if (cartItems.length === 0) {
            emptyMessage.style.display = "block"; // Show "Your cart is empty"
        } else {
            emptyMessage.style.display = "none"; // Hide empty message

            cartItems.forEach(item => {
                let itemElement = document.createElement("li");
                itemElement.classList.add("cart-item");
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" width="50">
                    <div>
                        <p><strong>${item.name}</strong></p>
                        <p>${item.price}</p>
                    </div>
                `;
                cartDropdown.appendChild(itemElement);
            });
        }

        // Update cart count
        cartCount.textContent = cartItems.length;
    }
});


document.addEventListener("DOMContentLoaded", () => {
    let cartItems = [];

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let product = this.closest(".product");
            let productName = product.querySelector(".product-name").textContent;
            let productPrice = parseFloat(product.querySelector(".product-price").textContent.replace("₱", "").trim());
            let productImage = product.querySelector(".product-image").src;

            // Add product to cart array
            cartItems.push({ name: productName, price: productPrice, image: productImage });

            // Update cart UI
            updateCartDropdown();

            // Show success message
            Swal.fire({
                title: "Success!",
                text: "Item added to cart successfully!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                position: "center"
            });
        });
    });

    function updateCartDropdown() {
        let cartDropdown = document.getElementById("cart-items");
        let emptyMessage = document.getElementById("empty-message");
        let cartCount = document.getElementById("cart-count");
        let cartTotal = document.getElementById("cart-total");

        // Clear previous cart content
        cartDropdown.innerHTML = "";

        if (cartItems.length === 0) {
            emptyMessage.style.display = "block"; // Show "Your cart is empty"
            cartTotal.textContent = "0"; // Reset total price
        } else {
            emptyMessage.style.display = "none"; // Hide empty message
            let total = 0;

            cartItems.forEach(item => {
                let itemElement = document.createElement("li");
                itemElement.classList.add("cart-item");
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" width="50">
                    <div>
                        <p><strong>${item.name}</strong></p>
                        <p>₱ ${item.price.toFixed(2)}</p>
                    </div>
                `;
                cartDropdown.appendChild(itemElement);
                total += item.price;
            });

            cartTotal.textContent = total.toFixed(2);
        }

        // Update cart count
        cartCount.textContent = cartItems.length;
    }

    function proceedToCheckout() {
        if (cartItems.length === 0) {
            Swal.fire({
                title: "Oops!",
                text: "Your cart is empty.",
                icon: "warning",
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            let modal = document.getElementById("checkout-modal");
            let checkoutList = document.getElementById("checkout-items");
            let checkoutTotal = document.getElementById("checkout-total");

            // Clear previous content
            checkoutList.innerHTML = "";
            let total = 0;

            // Populate modal with cart items
            cartItems.forEach(item => {
                let itemElement = document.createElement("li");
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" width="50">
                    <div>
                        <p><strong>${item.name}</strong></p>
                        <p>₱ ${item.price.toFixed(2)}</p>
                    </div>
                `;
                checkoutList.appendChild(itemElement);
                total += item.price;
            });

            checkoutTotal.textContent = total.toFixed(2);

            // Show modal
            modal.style.display = "block";
        }
    }

    function closeCheckoutModal() {
        document.getElementById("checkout-modal").style.display = "none";
    }

    function confirmOrder() {
        Swal.fire({
            title: "Order Confirmed!",
            text: "Your order has been placed successfully.",
            icon: "success",
            confirmButtonText: "OK"
        }).then(() => {
            cartItems = []; // Clear cart after order
            updateCartDropdown();
            closeCheckoutModal();
        });
    }

    // Close modal when clicking outside
    window.onclick = function (event) {
        let modal = document.getElementById("checkout-modal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Make functions available globally
    window.proceedToCheckout = proceedToCheckout;
    window.closeCheckoutModal = closeCheckoutModal;
    window.confirmOrder = confirmOrder;
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("helpForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        // Get form values
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            Swal.fire({
                title: "Error!",
                text: "Please fill in all fields.",
                icon: "error",
                confirmButtonText: "OK"
            });
        } else {
            // Show success message
            Swal.fire({
                title: "Success!",
                text: "Your message has been sent successfully!",
                icon: "success",
                timer: 2000, // Auto-close after 2 seconds
                showConfirmButton: false
            });

            // Optionally, clear the form after submission
            document.getElementById("helpForm").reset();
        }
    });
});
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page refresh

    // Get form values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();
    let comment = document.getElementById("comment").value.trim();

    if (name === "" || email === "" || phone === "" || address === "" || comment === "") {
        Swal.fire({
            title: "Error!",
            text: "Please fill in all fields.",
            icon: "error",
            confirmButtonText: "OK"
        });
    } else {
        // Show success message
        Swal.fire({
            title: "Success!",
            text: "Your message has been sent successfully!",
            icon: "success",
            timer: 2000, // Auto-close after 2 seconds
            showConfirmButton: false
        });

        // Optionally, clear the form after submission
        document.getElementById("contactForm").reset();
    }
});