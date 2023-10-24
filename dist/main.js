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
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});
const searchButton = document.querySelector("#searchButton");
//declare an empty cart and global array for products
let productArray = [];
let cart = [];
let cartProduct;
//using the local storage for cart feature
// localStorage.setItem('cart',JSON.stringify(cart))
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch('https://fakestoreapi.com/products')
            .then(response => {
            return response.json();
        })
            .then(data => productArray = data)
            .then(data => displayProducts(data))
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
            cartProduct = data;
            // console.log(cartProduct)
            return cartProduct;
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
        <div class="product-title">${product.title}</div>
        <div class="product-price">${product.price}</div>
        <div class="prodct-category">${product.category}</div>
        <div id="buttons-wrapper">
            <div class="show-details-button" id=${detailsBtnId}>details</div>
            <button class="add-to-cart-btn" onclick="addItemToCart(${product.id})">Add to cart </div>
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
function addItemToCart(id, quantity = 1) {
    let cartProductWrapper = document.querySelector(".cart");
    //get the one product by 
    // cart.push(productData)
    fetchOneProduct(id);
    if (cartProduct.id) {
        cart.push(cartProduct);
    }
    const cartProductDiv = document.createElement("div");
    cartProductDiv.className = "cart-product-card";
    cartProductDiv.innerHTML = `
        <img class="cart-image" src="${cartProduct.image}">
        <div  class="cart-title" >${cartProduct.title}<div>
        <div  class="cart-price" >${cartProduct.price}</div>
        <div  class="cart-price" >${quantity}</div>
           
    `;
    cartProductWrapper === null || cartProductWrapper === void 0 ? void 0 : cartProductWrapper.appendChild(cartProductDiv);
    const totalPrice = document.createElement('div');
    // totalPrice.innerHTML=cart
    const cartCounter = document.querySelector(".cart-counter");
    cartCounter.innerHTML = String(cart.length);
    console.log("this is cartp", cartProduct);
    // 
}
