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




