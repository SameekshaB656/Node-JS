// ================= REGISTER =================
function register() {

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let pass = document.getElementById("pass").value.trim();
  let confirmPass = document.getElementById("confirmPass").value.trim();

  let genderObj = document.querySelector('input[name="gender"]:checked');

  // Name validation
  if (name === "") {
    alert("Name cannot be empty");
    return;
  }

  // Email validation
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!email.match(emailPattern)) {
    alert("Enter valid email address");
    return;
  }

  // Password length validation
  if (pass.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  // Password match validation
  if (pass !== confirmPass) {
    alert("Passwords do not match");
    return;
  }

  // Gender validation
  if (!genderObj) {
    alert("Please select gender");
    return;
  }

  let gender = genderObj.value;

  // Store user data
  let user = {
    name: name,
    email: email,
    pass: pass,
    gender: gender
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Registration Successful");

  window.location = "Login.html";
}



// ================= LOGIN =================
function login() {

  let email = document.getElementById("loginEmail").value.trim();
  let pass = document.getElementById("loginPass").value.trim();

  if (email === "" || pass === "") {
    alert("Please fill all fields");
    return;
  }

  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("No registered user found. Please register first.");
    return;
  }

  if (user.email === email && user.pass === pass) {

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", user.name);

    alert("Login Successful");

    window.location = "Catalog.html";

  } else {
    alert("Invalid Email or Password");
  }
}



// ================= CHECK LOGIN =================
function checkLogin() {

  let logged = localStorage.getItem("loggedIn");

  if (!logged) {
    alert("Please login first");
    window.location = "Login.html";
  }
}



// ================= SHOW WELCOME NAME =================
function showWelcome() {

  let name = localStorage.getItem("username");

  if (name) {
    let element = document.querySelector(".welcome-name");

    if (element) {
      element.innerText = name;
    }
  }
}



// ================= ADD TO CART =================
function addToCart(name, price) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {

    cart.push({
      name: name,
      price: price,
      quantity: 1
    });

  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(name + " added to cart!");
}



// ================= DISPLAY CART =================
function displayCart() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let table = document.getElementById("cartTable");

  if (!table) return;

  let totalAmount = 0;

  table.innerHTML = `
  <tr>
  <th>Book</th>
  <th>Quantity</th>
  <th>Price</th>
  <th>Total</th>
  <th>Remove</th>
  </tr>
  `;

  cart.forEach((item, index) => {

    let row = table.insertRow();

    let total = item.price * item.quantity;

    row.insertCell(0).innerText = item.name;
    row.insertCell(1).innerText = item.quantity;
    row.insertCell(2).innerText = "$" + item.price;
    row.insertCell(3).innerText = "$" + total;

    let btn = document.createElement("button");
    btn.innerText = "Remove";
    btn.style.background = "red";
    btn.style.color = "white";

    btn.onclick = function () {
      removeItem(index);
    };

    row.insertCell(4).appendChild(btn);

    totalAmount += total;
  });

  document.getElementById("total").innerText = "Total: $" + totalAmount;
}



// ================= REMOVE ITEM =================
function removeItem(index) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  location.reload();
}



// ================= LOGOUT =================
function logoutUser() {

  localStorage.removeItem("loggedIn");
  localStorage.removeItem("username");
  localStorage.removeItem("cart");

  alert("You have been logged out successfully!");

  window.location = "Login.html";
}