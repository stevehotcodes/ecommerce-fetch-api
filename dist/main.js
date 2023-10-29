"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let productArray = [];
let cart = [];
// let cartProduct:any
const searchButton = document.querySelector("#searchButton");
const viewCart = document.querySelector(".view-cart");
let cartWrapper = document.querySelector(".cart-counter-wrapper");
let cartItemHolder = document.querySelector(`.cart`);
let cartContainerWrapper = document.querySelector(".cart-wrapper");
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    const cartCounter = document.querySelector(".cart-counter");
    cartCounter.innerHTML = String(cartArray.length);
});
//declare an empty cart and global array for products
//using the local storage for cart feature
// localStorage.setItem('cart',JSON.stringify(cart))
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        let promise = new Promise(() => {
            fetch('https://fakestoreapi.com/products')
                .then(response => {
                return response.json();
            })
                .then(data => productArray = data)
                .then(data => displayProducts(data));
        })
            // displayProducts(products))
            // console.log(products))
            .catch(error => {
            console.log("error in fetching the products", error);
        });
    });
}
function fetchOneProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://fakestoreapi.com/products/${id}`);
            // Check if response is okay (status code 200-299)
            (!response.ok) ? console.error("Error fetching product with ID:", id) : null;
            const data = yield response.json();
            // console.log("this is the data for one product",data)
            // Assuming cartProduct is a variable in scope, update it with data
            console.log(`fetched data`, data);
            return data;
        }
        catch (error) {
            console.error("Error in fetching the product with id", id, error);
            return null;
        }
    });
}
function displayProducts(products) {
    // console.log("this i sthe product array", productArray)
    const productsContainer = document.querySelector("#products");
    if (!productsContainer) {
        console.error("Products container not found.");
        return;
    }
    products.forEach((product) => {
        const productContainer = document.createElement('div');
        productContainer.className = 'product';
        let stringfiedProduct = JSON.stringify(product);
        // console.log("data",stringfiedProduct)
        const detailsBtnId = 'details-btn-' + product.id;
        productContainer.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-title" style="font-weight=700">${product.title}</div>
        <div class="product-price" style="font-weight=700"><span id="price">Price</span>: $${product.price}</div>
        <div class="product-category" style="font-weight=700"><span id="category">Category</span>:${product.category}</div>
        <div id="buttons-wrapper">
            <div class="show-details-button" id=${detailsBtnId}>details</div>
            <button class="add-to-cart-btn" onclick="addProductToCart(${product.id})">Add to cart </div>
        </div>
       
    `;
        productsContainer.appendChild(productContainer);
        //event listener for details button
        const detailsButton = document.querySelector("#" + detailsBtnId);
        detailsButton ? detailsButton.addEventListener("click", () => {
            displayOneProduct(product);
        }) : console.log(" The button does not exist", "#" + detailsBtnId);
        document.addEventListener('click', function (e) {
            var _a;
            if (e.target && ((_a = e.target.classList) === null || _a === void 0 ? void 0 : _a.contains('add-to-cart-btn'))) {
                const productId = e.target.getAttribute('data-id');
                const productData = JSON.parse(e.target.getAttribute('data-product'));
                // addItemToCart(product,productData);
            }
        });
    });
    const cartBtn = document.querySelectorAll(".add-to-cart-btn");
    console.log(productsContainer);
}
// event listerner for the add to cart button
//read the values on the dom
function readProductValues(productArray) {
    // let parseProduct=JSON.parse(product)
    console.log(productArray);
    // const productValues={
    //     productTitle:parseProduct.title,
    //     productPrice:parseProduct.price,
    //     productImage:parseProduct. image  
    // }
    // console.log("this function reads the value of this ", productValues)
}
//displaying one prodcut only
function displayOneProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const productsContainer = document.querySelector("#products");
        productsContainer ? productsContainer.innerHTML = " " : null;
        yield fetch(`https://fakestoreapi.com/products/${product.id}`)
            .then(response => { return response.json(); })
            .then(data => {
            const productView = `
        <img src="${data.image}" alt="${data.title}">
        <div class="product-title">${data.title}</div>
        <div class="product-price"> Ksh ${data.price}</div>
        <button class="go-back-button">go back</button>
        

    `;
            productsContainer.innerHTML = productView;
        });
        const goBackBtn = document.querySelector(".go-back-button");
        goBackBtn ? goBackBtn.addEventListener("click", () => { location.reload(); }) : "";
    });
}
//search feature
searchButton.addEventListener('click', () => {
    const sideBar = document.querySelector(".side-bar");
    //clear data in the prodict container
    const productsContainer = document.querySelector("#products");
    productsContainer ? productsContainer.innerHTML = " " : console.log("the products container was not selected");
    //create a head tag of the intended category
    const categoryTitle = document.createElement('div');
    //get the input data
    const searchInput = document.querySelector("#category-search-string");
    if (searchInput.value !== "") {
        //append the categoryTitle to the top bar 
        categoryTitle.innerHTML = ` Search Category by: ${searchInput.value}`;
        sideBar.appendChild(categoryTitle);
        const category = searchInput.value.trim();
        console.log("the button was clicked and this is the value that was entered", category);
        category ? getProductsByCategory(category).then(products => {
            products ? displayProducts(products) : console.log("no products were found of such category ");
        }) : console.log("please enter text to search for products");
    }
    else {
        const p_error = document.createElement("p");
        p_error.innerHTML = "Kindly enter search value";
        p_error.style.color = "white";
        p_error.style.background = "red";
        p_error.style.fontSize = "10px";
        p_error.style.padding = "2px";
        sideBar.appendChild(p_error);
        setInterval(() => {
            location.reload();
        }, 100);
    }
});
//fetching products by category
function getProductsByCategory(category) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fetch(`https://fakestoreapi.com/products/category/${category}`)
                .then(response => { return response.json(); })
                .then(products => displayProducts(products));
            console.log("products were fetched successfully by the category here");
        }
        catch (error) {
            console.log("there was an error in fetching the product by the category", error);
            return null;
        }
    });
}
//add to cart feature
// function addItemToCart(product:IProducts, quantity:number=1){
//     (!product||product.id)?console.log("The product is undefined or has missing Id",product):""
//     let cartItem=cart.find(item=>item.product.id===product.id);
//     cartItem?cartItem.quantity +=quantity:cart.push({product,quantity})
// }
function addProductToCart(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let fetchedProduct = yield fetchOneProduct(id);
        if (!fetchedProduct)
            return;
        console.log("fetched product from API", fetchedProduct);
        //prepare item to be added to cart
        const itemToAddtoCart = Object.assign(Object.assign({}, fetchedProduct), { quantity: 1 });
        addToCart(itemToAddtoCart);
    });
}
function addToCart(newItem) {
    let cartArray = JSON.parse(localStorage.getItem('cart') || '[]');
    //confirm if the item exists in the cart
    const cartCounter = document.querySelector(".cart-counter");
    cartCounter.innerHTML = String(cartArray.length);
    const existItem = cart.find(item => item.id === newItem.id);
    // if item exists ,increment its quantity
    if (existItem) {
        existItem.quantity += newItem.quantity;
        console.log(`item's quantity were adjusted by one check it out, ${existItem.quantity}`, cart);
    }
    else {
        cart.push(newItem);
        console.log("item added successfully to cart", cart);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}
const viewCartBtn = document.querySelector('.view-cart');
let cartArray = JSON.parse(localStorage.getItem('cart') || '[]');
//create the modal 
const cartModal = document.createElement("div");
cartModal.style.width = "50vw";
cartModal.style.height = "10rem";
cartModal.style.overflow = "scroll";
cartModal.style.backgroundColor = "green";
viewCartBtn.addEventListener("click", () => {
    displayCartProducts(cartArray);
});
function displayCartProducts(cartArray) {
    let productsContainer = document.querySelector("#products");
    productsContainer ? productsContainer.innerHTML = " " : null;
    cartArray.forEach((product) => {
        const productContainer = document.createElement('div');
        productContainer.className = 'product';
        const detailsBtnId = 'details-btn-' + product.id;
        productContainer.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-title" style="font-weight=700">${product.title}</div>
        <div class="product-price" style="font-weight=700"><span id="price">Price</span>: $${product.price}</div>
       
        <div >
            <div class="quantity">Quantity:${product.quantity}</div>
            <button class="remove" onclick="removeItem(${product.id})">Remove </div>
        </div>
       
    `;
        productsContainer.appendChild(productContainer);
        // productsContainer=cartItemHolder
        //event listener for remove button
        const removeButton = document.querySelector("#" + detailsBtnId);
        // detailsButton? detailsButton.addEventListener("click",()=>{
        //     delete(product) 
        // }) :console.log(" The button does not exist","#"+detailsBtnId);
        document.addEventListener('click', function (e) {
            var _a;
            if (e.target && ((_a = e.target.classList) === null || _a === void 0 ? void 0 : _a.contains('add-to-cart-btn'))) {
                const productId = e.target.getAttribute('data-id');
                const productData = JSON.parse(e.target.getAttribute('data-product'));
            }
        });
    });
    const totalPrice = document.createElement('div');
    const totalPriceDiv = document.querySelector(".total-price-div");
    totalPrice.className = "total-price-div";
    const priceTitle = document.createElement('div');
    let totalCost = cart.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
    }, 0);
    console.log("this is total price ", totalCost);
    priceTitle.innerText = `${totalCost}`;
    totalPriceDiv.appendChild(priceTitle);
    cartModal.appendChild(cartItemHolder);
}
// cartWrapper.appendChild(cartModal)
//     function displayCartProducts(){
//           //fetch data from local storage
//          
//           const cartProductDiv=document.createElement("div");
//           console.log("retrivig from localstorage",cartArray);
//           console.log("we hav ethis item in the cart",cartArray.length)
//           // let cartWrapper=document.querySelector(".cart") as HTMLDivElement;
//           cartArray.forEach(item=>{
//               cartProductDiv.className="cart-product-card"
//               cartProductDiv.innerHTML=`
//                   <img class="cart-image" src="${item.image}">
//                   <div  class="cart-title" >${item.title}<div>
//                   <div  class="cart-price" >${item.price}</div>
//                   <div  class="cart-price" >${item.quantity}</div>
//               `
//           })
//           cartItemHolder.appendChild(cartProductDiv);
//     }
//         // cartWrapper.appendChild(cartItemHolder)
// //    let lc=localStorage.getItem('cart')
// //     console.log("get cart items from localstorage" ,JSON.parse(lc))
// console.log(priceTitle)
// console.log("total cost",totalCost)
// totalPrice.innerHTML=cart
// cartWrapper.addEventListener('click',()=>{
//     console.log("cart")
//     alert("hello")
// })
//   console.log("this is cartp",cartProduct);
// 
// viewCart.addEventListener("click",(e)=>{
//     console.log(cartProductWrapper)
// })
//updateCartItem
// async function updateCartItem(productID:string){
//     //get the cart item
//     let cartItem=await fetchOneProduct(productID);
//     let cartItemId=cartItem?.id
//     //get whole cart and compare the 
//     cart.find(item=>{item.id===cartItemId})?cartItem?.quantity:cart.push(cartItem)
// }
