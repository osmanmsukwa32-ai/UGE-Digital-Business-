
function showMessage() {
    alert("Welcome to UGE Digital Business!");
}

function buyWebsite(name) {
    alert(
        "You selected: " + name +
        ". Contact UGE to complete your purchase."
    );
}

function searchWebsites() {

    let input = document
        .getElementById("searchInput")
        .value.toLowerCase();

    let products = document.querySelectorAll(".product");

    products.forEach(function(product) {

        let name = product
            .querySelector("h3")
            .textContent.toLowerCase();

        if (name.includes(input)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });
}

function filterWebsites(category) {

    let products = document.querySelectorAll(".product");

    products.forEach(function(product) {

        let productCategory =
            product.getAttribute("data-category");

        if (
            category === "all" ||
            productCategory === category
        ) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

}

const websiteData = {

    business: {
        name: "Business Website",
        description: "Professional website for companies and businesses.",
        price: "$50",
        features: [
            "Home Page",
            "About Us",
            "Services",
            "Contact Page",
            "Mobile Friendly Design"
        ]
    },

    education: {
        name: "Education Website",
        description: "Platform for online learning and education.",
        price: "$70",
        features: [
            "Courses Page",
            "Student Information",
            "Learning Resources",
            "Contact Page"
        ]
    },

    ecommerce: {
        name: "E-commerce Website",
        description: "Online store for selling products.",
        price: "$100",
        features: [
            "Product Catalogue",
            "Shopping Cart Demo",
            "Product Search",
            "Store Information"
        ]
    },

    restaurant: {
        name: "Restaurant Website",
        description: "Website for restaurants and food businesses.",
        price: "$60",
        features: [
            "Restaurant Menu",
            "Food Gallery",
            "Business Information",
            "Contact Page"
        ]
    },

    portfolio: {
        name: "Portfolio Website",
        description: "Showcase your professional skills and projects.",
        price: "$40",
        features: [
            "Personal Profile",
            "Projects Gallery",
            "Skills Section",
            "Contact Information"
        ]
    }

};

let selectedProduct = "";

function showDetails(id) {

    const product = websiteData[id];

    if (!product) return;

    selectedProduct = id;

    document.getElementById("detailName").textContent =
        product.name;

    document.getElementById("detailDescription").textContent =
        product.description;

    document.getElementById("detailPrice").textContent =
        "Price: " + product.price;

    const list = document.getElementById("detailFeatures");

    list.innerHTML = "";

    product.features.forEach(function(feature) {

        const item = document.createElement("li");

        item.textContent = feature;

        list.appendChild(item);

    });

    document.getElementById("productDetails").style.display =
        "block";

    document.getElementById("productDetails").scrollIntoView({
        behavior: "smooth"
    });

}

function closeDetails() {

    document.getElementById("productDetails").style.display =
        "none";

}

function orderProduct() {

    if (!selectedProduct) return;

    alert(
        "You selected " +
        websiteData[selectedProduct].name +
        ". Contact UGE to complete your order."
    );

}

let shoppingCart = [];

function addToCart() {

    if (!selectedProduct) return;

    const product = websiteData[selectedProduct];

    shoppingCart.push({
        id: selectedProduct,
        name: product.name,
        price: Number(product.price.replace("$", ""))
    });

    displayCart();

    alert(product.name + " added to cart!");
}

function displayCart() {

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if (shoppingCart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    shoppingCart.forEach(function(item, index) {

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);

    });

    let total = shoppingCart.reduce(function(sum, item) {
        return sum + item.price;
    }, 0);

    document.getElementById("cartTotal").textContent =
        "Total: $" + total;
}

function removeFromCart(index) {

    shoppingCart.splice(index, 1);

    displayCart();
}

function clearCart() {

    shoppingCart = [];

    displayCart();
}

function orderWhatsApp() {

    if (shoppingCart.length === 0) {
        alert("Your shopping cart is empty!");
        return;
    }

    let message = "Hello UGE Digital Business!\n\n";
    message += "I want to order these websites:\n\n";

    shoppingCart.forEach(function(item, index) {

        message += (index + 1) + ". " +
            item.name + " - $" + item.price + "\n";

    });

    let total = shoppingCart.reduce(
        (sum, item) => sum + item.price, 0
    );

    message += "\nTotal: $" + total;
    message += "\n\nPlease provide more information.";

    let phone = "265894030557";

    let url = "https://wa.me/" + phone +
        "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");

}

/* UGE ADMIN SYSTEM */

function openAdmin() {

    const panel = document.getElementById("adminPanel");

    panel.style.display =
        panel.style.display === "none" ? "block" : "none";

    updateAdmin();
}

function addNewWebsite() {

    const name = document.getElementById("newName").value.trim();

    const description = document
        .getElementById("newDescription").value.trim();

    const price = Number(
        document.getElementById("newPrice").value
    );

    const category = document.getElementById("newCategory").value;

    if (!name || !description || !price || price <= 0) {
        alert("Please complete all fields correctly!");
        return;
    }

    const id = "product_" + Date.now();

    websiteData[id] = {
        name: name,
        description: description,
        price: "$" + price,
        features: [
            "Professional Design",
            "Mobile Friendly",
            "Contact Page"
        ]
    };

    const card = document.createElement("div");

    card.className = "product";
    card.setAttribute("data-category", category);

    const title = document.createElement("h3");
    title.textContent = name;

    const info = document.createElement("p");
    info.textContent = description;

    const cost = document.createElement("h4");
    cost.textContent = "$" + price;

    const button = document.createElement("button");
    button.textContent = "View Details";
    button.onclick = function() {
        showDetails(id);
    };

    card.append(title, info, cost, button);

    document.querySelector(".marketplace").appendChild(card);

    document.getElementById("newName").value = "";
    document.getElementById("newDescription").value = "";
    document.getElementById("newPrice").value = "";

    updateAdmin();

    alert("New website added successfully!");

}

function updateAdmin() {

    const total = Object.keys(websiteData).length;

    document.getElementById("totalProducts").textContent = total;

    const list = document.getElementById("adminProducts");

    list.innerHTML = "";

    Object.keys(websiteData).forEach(function(id) {

        const product = websiteData[id];

        const item = document.createElement("div");

        item.className = "admin-product";

        const title = document.createElement("h4");
        title.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = "Price: " + product.price;

        item.append(title, price);

        list.appendChild(item);

    });

}

