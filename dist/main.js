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
//declare an empty cart 
let cart = [];
//using the local storage for cart feature
localStorage.setItem('cart', JSON.stringify(cart));
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch('https://fakestoreapi.com/products')
            .then(response => {
            return response.json();
        })
            .then(products => displayProducts(products))
            .catch(error => {
            console.log("error in fetching the products", error);
        });
    });
}
function displayProducts(products) {
    const productsContainer = document.querySelector("#products");
    if (!productsContainer) {
        console.error("Products container not found.");
        return;
    }
    products.forEach((product) => {
        const productContainer = document.createElement('div');
        productContainer.className = 'product';
        const detailsBtnId = 'details-btn-' + product.id;
        productContainer.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-title">${product.title}</div>
        <div class="product-price">${product.price}</div>
        <div class="prodct-category">${product.category}</div>
        <div id="buttons-wrapper">
            <div class="show-details-button" id=${detailsBtnId}>details</div>
            <button class="add-to-cart-btn" >Add to cart </div>
        </div>
       
    `;
        productsContainer.appendChild(productContainer);
        //event listener for details button
        const detailsButton = document.querySelector("#" + detailsBtnId);
        detailsButton ? detailsButton.addEventListener("click", () => {
            displayOneProduct(product);
        }) : console.log(" The button does not exist", "#" + detailsBtnId);
    });
    const cartBtn = document.querySelector(".add-to-cart-btn");
    cartBtn.addEventListener('click', () => { addItemToCart(product.Id); });
    console.log(productsContainer);
}
//event listerner for the add to cart button
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
        <div class="product-price">${data.price}</div>
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
// function addItemToCart(product:IProducts, quantity = 1) {
//     if (!product || typeof product.id === 'undefined') {
//         console.error("Invalid product:", product);
//         return;
//     }
//     let cartItem = cart.find(item => {
//         if (!item || !item.product) {
//             console.error("Invalid item in cart:", item);
//             return false;
//         }
//         return item.product.id === product.id;
//     });
//     cartItem ? cartItem.quantity += quantity : cart.push({ product, quantity });
// }
