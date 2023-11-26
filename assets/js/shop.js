let cartList=[]; //array to store cart lists

const data= [
    {
        id : 0,
        img : './images/blog-1.jpg',
        name : 'Forex Beginner Course',
        price : 50,
        itemInCart: false
    },
    {
        id : 1,
        img : './images/blog-2.jpg',
        name : 'Forex Main Course',
        price : 150,
        itemInCart: false
    },
    {
        id : 2,
        img : './images/blog-3.jpg',
        name : 'Forex In Person Course',
        price : 450,
        itemInCart: false
    },
    {
        id : 3,
        img : './images/blog-1.jpg',
        name : 'Learn & Earn',
        price : 25,
        itemInCart: false
    },
];



var i;
var detail =document.getElementsByClassName('card-item');
var detailsImg = document.getElementById('details-img')
var detailTitle = document.getElementById('detail-title')
var detailPrice = document.getElementById('detail-price')
var youSave = document.getElementById('you-save');
var detailsPage = document.getElementById('details-page');
var back = document.getElementById('buy')
back.addEventListener('click',refreshPage)
var addToCarts = document.querySelectorAll('#add-to-cart')
var cart = document.getElementById('cart');
var detail = document.querySelectorAll('.card-item');
var checkoutBtn = document.getElementById('checkoutBtn');


// click event to display cart page
cart.addEventListener('click',displayCart);

// stripe key


window.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('#add-to-cart');
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', function() {
      const itemId = this.getAttribute('data-item-id');
      addToCart(itemId);
    });
  });
}); 


var carts = document.getElementById('carts');

//click events to add items to cart from details page
//carts.addEventListener('click',()=>addToCart(getId))

var home = document.getElementById('logo');

//click event to hide cart page and return to home page
home.addEventListener('click',hideCart);

//events on dynamically created element to remove items from list
document.addEventListener('click',function (e){
    if(e.target.id=='remove'){
        var itemId = e.target.parentNode.id
        removeFromCart(itemId)
    }
})


//click event to display details page
for (var i = 0; i < detail.length; i++) {
    detail[i].addEventListener('click', handleDetail);
  }

var getId;

// click events to add items to cart from home page cart icon
addToCarts.forEach((button, index) => {
  button.addEventListener('click', function() {
    const itemId = detail[index].id;
    addToCart(itemId);
  });
});
  
 // Function to load cart items from localStorage
 function loadCartItems() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      cartList = JSON.parse(savedCartItems);
      updateCartCount(); // Update cart badge
      addItem(); // Update cart display
    }
  }
  
  // Call the loadCartItems function when the page loads
  loadCartItems();

// details function
function handleDetail(e){
    detailsPage.style.display = 'block'
    getId= this.parentNode.id;
    detailsImg.src= data[getId].img;
    detailTitle.innerHTML=   data[getId].name;
    detailPrice.innerHTML= 'Price : $ ' +data[getId].price;
}

// Function to update the cart count in the badge
function updateCartCount() {
    const cartBadgeElement = document.getElementById('cart-badge');
    cartBadgeElement.textContent = cartList.length.toString();
  }

// add item to the cart
function addToCart(id) {
  if (data[id] && !data[id].itemInCart) {
    data[id].itemInCart = true; // Update itemInCart property before adding to cartList
    cartList.push(data[id]); // Add item to the cartList array
    addItem(); // Update the cart display
    updateCartCount(); // Update the cart count badge
    saveCartItems(); // Save cart items in localStorage
  } else {
    alert('Item is already in the cart or does not exist');
  }
}

//back to main page
function refreshPage(){
    detailsPage.style.display = 'none'
}  

// hide your cart page
function hideCart(){
   document.getElementById('main').style.display= "block";
}

//display your cart page
function displayCart(){
    document.getElementById('details-page').style.display= "none";
}

var totalAmount;
var totalItems;

//add item to the cart
function addItem(){
    totalAmount=0;
    totalItems = 0;
    var clrNode=document.getElementById('item-body');
        clrNode.innerHTML= '';
        
        if (cartList.length > 0) {
        cartList.map((cart)=> 
        {
            var cartCont = document.getElementById('item-body');
            totalAmount = totalAmount + cart.price;
            totalItems = totalItems + 1;

            var tempCart = document.createElement('div')
            tempCart.setAttribute('class','cart-list');
            tempCart.setAttribute('id',cart.id);

            var listImg = document.createElement('img');
            listImg.setAttribute('id','list-img');
            listImg.src = cart.img
            tempCart.appendChild(listImg)

            var listName = document.createElement('h3');
            listName.setAttribute('class','list-name');
            listName.innerHTML = cart.name;
            tempCart.appendChild(listName)

            var listPay = document.createElement('h3');
            listPay.setAttribute('class','pay');
            listPay.innerHTML = cart.price;
            tempCart.appendChild(listPay);

            var listQuantity = document.createElement('h3');
            listQuantity.setAttribute('class','quantity');
            listQuantity.innerHTML = '1';
            tempCart.appendChild(listQuantity);

            var listTrash = document.createElement('i');
            listTrash.setAttribute('class','fa fa-trash ');
            listTrash.setAttribute('id','remove');
            tempCart.appendChild(listTrash);

            cartCont.appendChild(tempCart)
        });

    
    document.getElementById('total-amount').innerHTML = 'Total Amount: $ ' + totalAmount;
    document.getElementById('total-items').innerHTML = 'Total Items: ' + totalItems;
    document.getElementById('total').style.display = "block";
    document.getElementById('cart-with-items').style.display = "block";
    document.getElementById('empty-cart').style.display = "none";
  } else {
    document.getElementById('cart-with-items').style.display = "none";
    document.getElementById('empty-cart').style.display = "block";
}
}

//remove item from the cart
function removeFromCart(itemId){
    data[itemId].itemInCart = false
    cartList = cartList.filter((list)=> list.id != itemId);
    addItem()
    updateCartCount(); // Call updateCartCount() after removing an item
    if(cartList.length == 0){
        document.getElementById('cart-with-items').style.display = "none";
        document.getElementById('empty-cart').style.display = "block";
    }
}
// Function to save cart items in localStorage
function saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(cartList));
  }
  
 // Add event listener to the "Add to Cart" button on the "details" page
var addToCartDetails = document.getElementById('add-to-cart-details');
addToCartDetails.addEventListener('click', function() {
  addToCart(getId);
});


  // Event listener for the checkout button
checkoutBtn.addEventListener("click", checkout);



// Function to handle the checkout process
function checkout() {
    // Perform the checkout functionality here
    // You can redirect the user to a checkout page, send a request to a server, etc.
    // Add your own code to handle the checkout process
    const checkoutbtn = document.querySelector("#checkoutBtn");

    checkoutBtn.addEventListener("click", () => {
      fetch("/stripe-checkout", {
        method: "post",
        headers: new Headers({ "Content-Type": "applicatin/Json" }),
        body: JSON.stringify({
          items: JSON.parse(localStorage.getItem("cartItems")),
        }),
      })
      .then((res) => res.json())
      .then((url) => {
        location.href = url;
      })
      .catch((err) => console.log(err));
    });

    // Clear the cart and update the UI as needed
    cartList = [];
    addItem();
    updateCartCount();
  
  }
  
