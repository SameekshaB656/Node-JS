// ================= REGISTER =================
function register() {
    alert("Register function is working");

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
  let confirmPass = document.getElementById("confirmPass").value;

  // get selected gender
  let genderObj = document.querySelector('input[name="gender"]:checked');

  // validations
  if (name === "" || email === "" || pass === "" || confirmPass === "") {
    alert("Please fill all fields");
    return;
  }

  if (pass !== confirmPass) {
    alert("Passwords do not match");
    return;
  }

  if (!genderObj) {
    alert("Please select gender");
    return;
  }

  let gender = genderObj.value;

  // store user in localStorage
  let user = {
    name: name,
    email: email,
    pass: pass,
    gender: gender
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Registered Successfully 🎉");

  window.location = "Login.html";
}



// ================= LOGIN =================
function login() {
  let email = document.getElementById("loginEmail").value;
  let pass = document.getElementById("loginPass").value;

  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.email === email && user.pass === pass) {

    // store login session
    localStorage.setItem("loggedIn", "true");

    // ✅ ADD THIS LINE
    localStorage.setItem("username", user.name);

    alert("Login Successful");
    window.location = "Catalog.html";

  } else {
    alert("Invalid Credentials");
  }
}



// ================= ADD TO CART =================
function addToCart(name, price) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // check if item already exists
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;   // increase quantity
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

  let totalAmount = 0;

  // clear old rows except header
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

    // name
    row.insertCell(0).innerText = item.name;

    // quantity
    row.insertCell(1).innerText = item.quantity;

    // price
    row.insertCell(2).innerText = "$" + item.price;

    // total
    row.insertCell(3).innerText = "$" + total;

    // remove button
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

  localStorage.removeItem("cart");

  alert("You have been logged out successfully!");

  window.location = "Login.html";
}