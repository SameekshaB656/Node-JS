// ================= REGISTER =================
function register(){

let name = document.getElementById("name").value.trim()
let email = document.getElementById("email").value.trim()
let pass = document.getElementById("pass").value.trim()
let confirm = document.getElementById("confirmPass").value.trim()

// Name validation
if(name === ""){
alert("Name cannot be empty")
return
}

// Email validation
let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

if(!email.match(emailPattern)){
alert("Enter a valid email")
return
}

// Password validation
if(pass.length < 6){
alert("Password must be at least 6 characters")
return
}

// Confirm password
if(pass !== confirm){
alert("Passwords do not match")
return
}

// Store user
let user = {
name: name,
email: email,
pass: pass
}

localStorage.setItem("user", JSON.stringify(user))

alert("Registered Successfully")

window.location = "login.html"

}



// ================= LOGIN =================
function login(){

let email = document.getElementById("loginEmail").value.trim()
let pass = document.getElementById("loginPass").value.trim()

// Empty validation
if(email === "" || pass === ""){
alert("Please fill all fields")
return
}

let user = JSON.parse(localStorage.getItem("user"))

if(!user){
alert("No registered user found")
return
}

if(user.email === email && user.pass === pass){

alert("Login Successful")

window.location = "catalog.html"

}else{

alert("Invalid Email or Password")

}

}



// ================= ADD TO CART =================
function addToCart(name,price){

let cart = JSON.parse(localStorage.getItem("cart")) || []

cart.push({
name: name,
price: price
})

localStorage.setItem("cart", JSON.stringify(cart))

alert("Ticket Added")

}



// ================= DISPLAY CART =================
function displayCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || []

let table = document.getElementById("cartTable")

let total = 0

table.innerHTML = ""

cart.forEach((item,index)=>{

let row = `
<tr>
<td>${item.name}</td>
<td>₹${item.price}</td>
<td>
<button class="btn btn-danger btn-sm"
onclick="removeItem(${index})">
Remove
</button>
</td>
</tr>
`

table.innerHTML += row

total += item.price

})

document.getElementById("total").innerText = "Total: ₹" + total

}



// ================= REMOVE ITEM =================
function removeItem(index){

let cart = JSON.parse(localStorage.getItem("cart")) || []

cart.splice(index,1)

localStorage.setItem("cart", JSON.stringify(cart))

location.reload()

}



// ================= LOGOUT =================
function logoutUser(){

localStorage.removeItem("cart")

alert("You have been logged out")

}