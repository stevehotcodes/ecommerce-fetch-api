"use strict";
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});
function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => {
        return response.json();
    })
        .then(products => displayProducts(products))
        .catch(error => {
        console.log("error in fetching the products", error);
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
        productContainer.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-title">${product.title}</div>
        <div class="product-price">${product.price}</div>
        <div class="show-details-button">details</div>
    `;
        //event listener for details button
        const detailsButton = document.querySelector(".show-details-button");
        detailsButton ? detailsButton.addEventListener("click", () => {
            displayOneProduct(product);
        }) : " The button does not exist";
        productsContainer.appendChild(productContainer);
        console.log(productsContainer);
    });
}
function displayOneProduct(product) {
    const productsContainer = document.querySelector("#products");
    productsContainer ? productsContainer.innerHTML = " " : "";
    const productView = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-title">${product.title}</div>
        <div class="product-price">${product.price}</div>
        <div class="go-back-button">details</div>

    `;
    productsContainer.innerHTML = productView;
    // const goBackBtn=document.querySelector(".go-back-button");
    // goBackBtn?goBackBtn.addEventListener("click",()=>{
    //     displayProducts(products)<IProducts[]>
    // }) :
}
