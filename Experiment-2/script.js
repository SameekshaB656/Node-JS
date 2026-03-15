// Register
function register(){

let name=document.getElementById("name").value
let email=document.getElementById("email").value
let pass=document.getElementById("pass").value
let confirm=document.getElementById("confirmPass").value

if(pass!=confirm){
alert("Passwords do not match")
return
}

let user={
name:name,
email:email,
pass:pass
}

localStorage.setItem("user",JSON.stringify(user))

alert("Registered Successfully")

window.location="login.html"

}


// Login
function login(){

let email=document.getElementById("loginEmail").value
let pass=document.getElementById("loginPass").value

let user=JSON.parse(localStorage.getItem("user"))

if(user && user.email===email && user.pass===pass){

alert("Login Successful")

window.location="catalog.html"

}else{

alert("Invalid Credentials")

}

}


// Add ticket to cart
function addToCart(name,price){

let cart=JSON.parse(localStorage.getItem("cart"))||[]

cart.push({name:name,price:price})

localStorage.setItem("cart",JSON.stringify(cart))

alert("Ticket Added")

}


// Display cart
function displayCart(){

let cart=JSON.parse(localStorage.getItem("cart"))||[]

let table=document.getElementById("cartTable")

let total=0

cart.forEach((item,index)=>{

let row=`
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

table.innerHTML+=row

total+=item.price

})

document.getElementById("total").innerText="Total: ₹"+total

}


// Remove item
function removeItem(index){

let cart=JSON.parse(localStorage.getItem("cart"))

cart.splice(index,1)

localStorage.setItem("cart",JSON.stringify(cart))

location.reload()

}


// Logout
function logoutUser(){

localStorage.removeItem("cart")

}