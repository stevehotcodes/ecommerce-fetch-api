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
// async function fetchOneProduct(productId:number):Promise<IProducts | null>{
//      try {
//             const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok.');
//             }
//             const product: IProducts = await response.json();
//             return product;
//         } catch (error) {
//             console.error('There was a problem fetching the product:', error);
//             return null;
//         }
//  } 
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
        <div class="show-details-button" id=${detailsBtnId}>details</div>
    `;
        productsContainer.appendChild(productContainer);
        //event listener for details button
        const detailsButton = document.querySelector("#" + detailsBtnId);
        detailsButton ? detailsButton.addEventListener("click", () => {
            displayOneProduct(product);
        }) : console.log(" The button does not exist", "#" + detailsBtnId);
        // console.log(productsContainer)
    });
}
function displayOneProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const productsContainer = document.querySelector("#products");
        productsContainer ? productsContainer.innerHTML = " " : "";
        yield fetch(`https://fakestoreapi.com/products/${product.id}`)
            .then(response => { return response.json(); })
            .then(data => {
            const productView = `
        <img src="${data.image}" alt="${data.title}">
        <div class="product-title">${data.title}</div>
        <div class="product-price">${data.price}</div>
        <div class="go-back-button">details</div>
        

    `;
            productsContainer.innerHTML = productView;
        });
        // const goBackBtn=document.querySelector(".go-back-button");
        // goBackBtn?goBackBtn.addEventListener("click",()=>{
        //     displayProducts(products)<IProducts[]>
        // }) :
    });
}
