// REGISTER
function register() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(name === "" || email === "" || password === ""){
        alert("Please fill all fields");
        return;
    }

    let user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registered Successfully");
    window.location = "login.html";
}


// LOGIN
function login(){

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if(user && user.email === email && user.password === password){
        alert("Login Successful");
        window.location = "index.html";
    } else {
        alert("Invalid Credentials");
    }
}


// ADD TO CART
function addToCart(eventName, price){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.eventName === eventName);

    if(existing){
        existing.quantity += 1;
    } else {
        cart.push({
            eventName: eventName,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Ticket Added");
}


// DISPLAY CART
function displayCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let body = document.getElementById("cartBody");

    let totalAmount = 0;
    body.innerHTML = "";

    cart.forEach((item, index) => {

        let total = item.price * item.quantity;
        totalAmount += total;

        body.innerHTML += `
            <tr>
                <td>${item.eventName}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${total}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">
                        Remove
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("grandTotal").innerText = "Total: ₹" + totalAmount;
}


// REMOVE ITEM
function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}