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
        <div class="prodct-category">${product.category}</div>
        <div class="show-details-button" id=${detailsBtnId}>details</div>
    `;
        productsContainer.appendChild(productContainer);
        //event listener for details button
        const detailsButton = document.querySelector("#" + detailsBtnId);
        detailsButton ? detailsButton.addEventListener("click", () => {
            displayOneProduct(product);
        }) : console.log(" The button does not exist", "#" + detailsBtnId);
    });
    console.log(productsContainer);
}
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
searchButton.addEventListener('click', () => {
    //clear data in the prodict container
    const productsContainer = document.querySelector("#products");
    productsContainer ? productsContainer.innerHTML = " " : console.log("the products container was not selected");
    //create a head tag of the intended category
    const categoryTitle = document.createElement('div');
    //get the input data
    const searchInput = document.querySelector("#category-search-string");
    //append the categoryTitle to the top bar 
    categoryTitle.innerHTML = ` Search Category by: ${searchInput.value}`;
    productsContainer.appendChild(categoryTitle);
    const category = searchInput.value.trim();
    console.log("the button was clicked and this is the value that was entered", category);
    category ? getProductsByCategory(category).then(products => {
        products ? displayProducts(products) : console.log("no products were found of such category ");
    }) : console.log("please enter text to search for products");
});
function getProductsByCategory(category) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fetch(`https://fakestoreapi.com/products/category/${category}`)
                .then(response => { return response.json(); })
                .then(products => displayProducts(products));
            console.log("products were fetched successfully by the category here");
            // if (!response.ok) {
            //     throw new Error('Network response was not ok.');
            // }
            // const products:IProducts[]=await response.json()
            //  return products
        }
        catch (error) {
            console.log("there was an error in fetching the product by the category", error);
            return null;
        }
    });
}
