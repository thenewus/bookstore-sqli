// Cart
let cartIcon = document.querySelector(".navbar__cart__img")
let cartPanel = document.querySelector(".navbar__cart-panel")
let closeCart = document.querySelector("#close-cart")

// open cart panel
cartIcon.onclick = () => {
  cartPanel.classList.add("active")
}

// close cart panel
closeCart.onclick = () => {
  cartPanel.classList.remove("active")
}

// cart working js
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready)
} else {
  ready()
}

// making function
function ready() {
  // remove items from cart
  let removeCartButtons = document.getElementsByClassName("cart-remove")
  console.log(removeCartButtons)
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i]
    button.addEventListener("click", removeCartItem)
  }
  // quantity changes
  let quantityInputs = document.getElementsByClassName("cart-quantity")
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i]
    input.addEventListener("change", quantityChanged)
  }
  // add to cart
  let addCart = document.getElementsByClassName("book-info__add-to-cart")
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i]
    button.addEventListener("click", addCartClicked)
  }
  // buy button work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", butButtonClicked)
}

// but button
function butButtonClicked() {
  alert("Your order is placed")
  let cartContent = document.getElementsByClassName("navbar__cart-content")[0]
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild)
  }
  updateTotal()
}

// remove items from cart
function removeCartItem(event) {
  let buttonClicked = event.target
  buttonClicked.parentElement.remove()
  updateTotal()
}

// quantity changes
function quantityChanged(event) {
  let input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateTotal()
}

// add to cart
function addCartClicked(event) {
  let button = event.target
  let shopProducts = button.closest(".library__container__block")

  let title = shopProducts.getElementsByClassName("book-info__copy__title")[0]
    .innerText
  let price = shopProducts.getElementsByClassName("book-info__copy__price")[0]
    .innerText
  let productImg = shopProducts.getElementsByClassName("book-cover-img")[0].src

  addProductToCart(title, price, productImg)
  updateTotal()
}

function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("div")
  cartShopBox.classList.add("navbar__cart-content__box")
  let cartItems = document.getElementsByClassName("navbar__cart-content")[0]
  let cartItemsNames = cartItems.getElementsByClassName("cart-product-title")
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already add this item to cart")
      return
    }
  }

  let cartBoxContent = `
                <img src="${productImg}" class="cart-img">
                <div class="cart-content__detail-box">
                  <div class="cart-product-title">${title}</div>
                  <div class="cart-price">${price}</div>
                  <input type="number" value="1" class="cart-quantity">
                </div>
                <i class='bx bxs-trash-alt cart-remove'></i>`

  cartShopBox.innerHTML = cartBoxContent
  cartItems.append(cartShopBox)
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem)
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged)
}

// Update total
function updateTotal() {
  let cartContent = document.getElementsByClassName("navbar__cart-content")[0]
  let cartBoxes = cartContent.getElementsByClassName(
    "navbar__cart-content__box"
  )
  let total = 0
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i]
    let priceElement = cartBox.getElementsByClassName("cart-price")[0]
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
    let price = parseFloat(priceElement.innerText.replace("$", ""))
    let quantity = quantityElement.value
    total = total + price * quantity
  }
    // If price contain some cents value
    total = Math.round(total * 100) / 100

    document.getElementsByClassName("total-price")[0].innerText = "$" + total
}