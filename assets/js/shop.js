const data= [
    {
        id : 0,
        img : '/assets/images/blog-1.jpg',
        name : 'Forex Beginner Course',
        price : 50,
        itemInCart: false
    },
    {
        id : 1,
        img : '/assets/images/blog-2.jpg',
        name : 'Forex Main Course',
        price : 150,
        itemInCart: false
    },
    {
        id : 2,
        img : '/assets/images/blog-3.jpg',
        name : 'Forex In Person Course',
        price : 450,
        itemInCart: false
    },
    {
        id : 3,
        img : '/assets/images/blog-1.jpg',
        name : 'Learn & Earn',
        price : 25,
        itemInCart: false
    },
    {
        id : 4,
        img : '/images/redminote8.jpg',
        name : 'Redmi Note 8',
        price : 200,
        save : 15,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 5,
        img : '/images/redminote9.jpg',
        name : 'Redmi Note 9',
        price : 220,
        save : 25,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 6,
        img : '/images/redmi8.jpg',
        name : 'Redmi 8A Dual',
        price : 160,
        save : 20,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id : 7,
        img : '/images/redmi9.jpg',
        name : 'Redmi 9',
        price : 100,
        save : 10,
        delievery : 'In 3 - 4 days',
        itemInCart: false
    },
];

let cartList=[]; //array to store cart lists

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
// click event to display cart page
cart.addEventListener('click',displayCart)

var carts = document.getElementById('carts');

//click events to add items to cart from details page
carts.addEventListener('click',()=>addToCart(getId))

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

//click events to add items to cart from home page cart icon
addToCarts.forEach(val => {
  const parentNode = val.parentNode;
  val.addEventListener('click', () => addToCart(parentNode.id));
});
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
    if (!data[id].itemInCart) {
      data[id].itemInCart = true; // Update itemInCart property before adding to cartList
      cartList = [...cartList, data[id]];
      addItem();
      updateCartCount(); // Update cart badge
    } else {
      alert('Your item is already there');
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
        console.log(clrNode.childNodes)
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
            
        })
        document.getElementById('total-amount').innerHTML = 'Total Amount : $ ' + totalAmount;
        document.getElementById('total-items').innerHTML = 'Total Items : ' + totalItems;
        document.getElementById('total').style.display= "block";
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
