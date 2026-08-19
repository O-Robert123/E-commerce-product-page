const closeBtn = document.querySelector('#close-icon')
const lightbox = document.querySelector('.lightbox')
const mainImage = document.querySelector('.main-image')
const mainLightboxImage = document.querySelector('.lightbox-main-image')
const cartPanel = document.querySelector('#cart-panel')
const cart = document.querySelector('#cart-icon')
const addBtn = document.querySelector('#plus-btn')
const subtractBtn = document.querySelector('#minus-btn')
const nextBtn = document.querySelector('#forward-btn')
const backBtn = document.querySelector('#back-btn')
const addToCartBtn = document.querySelector('#add-to-cart-btn')
const checkoutBtn = document.querySelector('#checkout-btn')
const cartCounter = document.querySelector('#cart-product-qty')
const cartArray = []
const product = {
    id: 1,
    name: 'Fall Limited Edition Sneakers',
    price: 125,
    thumbnail: 'images/image-product-1-thumbnail.jpg'
}
const cartPanelBody = document.querySelector('#cart-panel-body')
const menuBtn = document.querySelector('#mobile-menu')
const mobileMenu = document.querySelector('#menu-container')
const cartPanelBodyText = document.querySelector('#cart-body-text')
var currentQuantity = document.querySelector('#quantity-value')
var mainImages = [
    'images/image-product-1.jpg',
    'images/image-product-2.jpg',
    'images/image-product-3.jpg',
    'images/image-product-4.jpg'
]
const productThumbnails = document.querySelectorAll('.prod-gallery')
const productThumbnailsArray = Array.from(productThumbnails)
const lightboxThumbnails = document.querySelectorAll('.lb-gallery')
const lightboxThumbnailsArray = Array.from(lightboxThumbnails)
checkoutBtn.hidden = true
cartCounter.hidden = true

closeBtn.addEventListener('click', () => {
    lightbox.hidden = true
})

mainImage.addEventListener('click', () => {
    lightbox.hidden = false
    mainLightboxImage.firstElementChild.src = mainImage.firstElementChild.src
    lightboxThumbnails.forEach(item => {
        item.classList.remove('selected')
        item.firstElementChild.classList.remove('darkened')
    })
    const selectedThumbnail = document.querySelector('.prod-gallery.selected')
    const index = productThumbnailsArray.indexOf(selectedThumbnail)
    console.log(index)
    lightboxThumbnailsArray[index].classList.add('selected')
    lightboxThumbnailsArray[index].firstElementChild.classList.add('darkened')
})

cart.addEventListener('click', () => {
    cartPanel.hidden = !cartPanel.hidden
})

function addQuantity() {
    var newQuantity = Number(currentQuantity.textContent) + 1
    currentQuantity.textContent = newQuantity
    console.log(currentQuantity)
}

function subtractQuantity() {
    var newQuantity = Number(currentQuantity.textContent) - 1
    currentQuantity.textContent = newQuantity
    console.log(currentQuantity)
}
addBtn.addEventListener('click', addQuantity)
subtractBtn.addEventListener('click', subtractQuantity)

function updateImage(array, mainImg) {
    array.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function () {
            array.forEach(e => {
                e.firstElementChild.classList.remove('darkened')
            })
            console.log(this)
            this.firstElementChild.classList.add('darkened')
            mainImg.firstElementChild.src = mainImages[index]
            array.forEach(box => {
                box.classList.remove('selected')
            })
            this.classList.add('selected')
        })
    })
}
updateImage(productThumbnails, mainImage)
updateImage(lightboxThumbnails, mainLightboxImage)

nextBtn.addEventListener('click', () => {
    var selected = document.querySelector('.lb-gallery.selected')
    var indexOfSelected = lightboxThumbnailsArray.indexOf(selected)
    console.log(indexOfSelected)
    if (indexOfSelected < lightboxThumbnailsArray.length - 1) {
        var nextSelected = lightboxThumbnailsArray[indexOfSelected + 1]
        selected.classList.remove('selected')
        selected.firstElementChild.classList.remove('darkened')
        nextSelected.classList.add('selected')
        nextSelected.firstElementChild.classList.add('darkened')
        mainLightboxImage.firstElementChild.src = mainImages[indexOfSelected + 1]
    }
})

backBtn.addEventListener('click', () => {
    var selected = document.querySelector('.lb-gallery.selected')
    var indexOfSelected = lightboxThumbnailsArray.indexOf(selected)
    console.log(indexOfSelected)
    if (indexOfSelected > 0) {
        var nextSelected = lightboxThumbnailsArray[indexOfSelected - 1]
        selected.classList.remove('selected')
        selected.firstElementChild.classList.remove('darkened')
        nextSelected.classList.add('selected')
        nextSelected.firstElementChild.classList.add('darkened')
        mainLightboxImage.firstElementChild.src = mainImages[indexOfSelected - 1]
    }
})

addToCartBtn.addEventListener('click', () => {
    cartPanelBodyText.hidden = true
    checkoutBtn.hidden = false
    const cartItem = {
        ...product,
        quantity: currentQuantity.textContent
    }
    const existingProduct = cartArray.find(item => item.id === cartItem.id)
    if (existingProduct) {
        existingProduct.quantity = Number(existingProduct.quantity) + Number(currentQuantity.textContent)
        cartItem.quantity = existingProduct.quantity
        const price = document.querySelector('#price-values')
        price.innerHTML = `$${cartItem.price.toFixed(2)} x ${cartItem.quantity} <strong>$${(cartItem.price * cartItem.quantity).toFixed(2)}</strong>`
    }
    else {
        cartArray.push(cartItem);
        const itemElement = document.createElement('div')
        itemElement.classList.add('cart-item')
        itemElement.innerHTML =
            `<img src='${cartItem.thumbnail}' id="cart-item-image">
        <div id='cart-item-text'><p>${cartItem.name}</p>
        <p id='price-values'>$${cartItem.price.toFixed(2)} x ${cartItem.quantity} <strong>$${(cartItem.price * cartItem.quantity).toFixed(2)}</strong></p></div>
        <img class='delete-item' src='images/icon-delete.svg'>`
        cartPanelBody.append(itemElement)
    }
    cartCounter.hidden = false
    cartCounter.textContent = cartItem.quantity

    const deleteCartItemBtns = document.querySelectorAll('.delete-item')
    deleteCartItemBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            this.closest('.cart-item').remove()
            cartArray.pop()
            if (cartArray.length === 0) {
                cartPanelBodyText.hidden = false
                checkoutBtn.hidden = true
                cartCounter.hidden = true
            }
        })

    })
})

menuBtn.addEventListener('click', () => {
    mobileMenu.hidden = !mobileMenu.hidden
    mobileMenu.hidden ? menuBtn.firstElementChild.src = 'images/icon-menu.svg' : menuBtn.firstElementChild.src = 'images/icon-close.svg'

})
