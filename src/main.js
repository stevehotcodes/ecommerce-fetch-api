var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener('DOMContentLoaded', function () {
    fetchProducts();
});
var searchButton = document.querySelector("#searchButton");
//declare an empty cart and global array for products
var productArray = [];
var cart = [];
var cartProduct;
//using the local storage for cart feature
// localStorage.setItem('cart',JSON.stringify(cart))
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            promise = new Promise(function () {
                fetch('https://fakestoreapi.com/products')
                    .then(function (response) {
                    return response.json();
                })
                    .then(function (data) { return productArray = data; })
                    .then(function (data) { return displayProducts(data); });
            })
                // displayProducts(products))
                // console.log(products))
                .catch(function (error) {
                console.log("error in fetching the products", error);
            });
            return [2 /*return*/];
        });
    });
}
function fetchOneProduct(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://fakestoreapi.com/products/".concat(id))];
                case 1:
                    response = _a.sent();
                    // Check if response is okay (status code 200-299)
                    (!response.ok) ? console.error("Error fetching product with ID:", id) : null;
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    // console.log("this is the data for one product",data)
                    // Assuming cartProduct is a variable in scope, update it with data
                    cartProduct = data;
                    // console.log(cartProduct)
                    return [2 /*return*/, cartProduct];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error in fetching the product with id", id, error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function displayProducts(products) {
    // console.log("this i sthe product array", productArray)
    var productsContainer = document.querySelector("#products");
    if (!productsContainer) {
        console.error("Products container not found.");
        return;
    }
    products.forEach(function (product) {
        var productContainer = document.createElement('div');
        productContainer.className = 'product';
        var stringfiedProduct = JSON.stringify(product);
        // console.log("data",stringfiedProduct)
        var detailsBtnId = 'details-btn-' + product.id;
        productContainer.innerHTML = "\n        <img src=\"".concat(product.image, "\" alt=\"").concat(product.title, "\">\n        <div class=\"product-title\">").concat(product.title, "</div>\n        <div class=\"product-price\">").concat(product.price, "</div>\n        <div class=\"prodct-category\">").concat(product.category, "</div>\n        <div id=\"buttons-wrapper\">\n            <div class=\"show-details-button\" id=").concat(detailsBtnId, ">details</div>\n            <button class=\"add-to-cart-btn\" onclick=\"addItemToCart(").concat(product.id, ")\">Add to cart </div>\n        </div>\n       \n    ");
        productsContainer.appendChild(productContainer);
        //event listener for details button
        var detailsButton = document.querySelector("#" + detailsBtnId);
        detailsButton ? detailsButton.addEventListener("click", function () {
            displayOneProduct(product);
        }) : console.log(" The button does not exist", "#" + detailsBtnId);
        document.addEventListener('click', function (e) {
            var _a;
            if (e.target && ((_a = e.target.classList) === null || _a === void 0 ? void 0 : _a.contains('add-to-cart-btn'))) {
                var productId = e.target.getAttribute('data-id');
                var productData = JSON.parse(e.target.getAttribute('data-product'));
                // addItemToCart(product,productData);
            }
        });
    });
    var cartBtn = document.querySelectorAll(".add-to-cart-btn");
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
    return __awaiter(this, void 0, void 0, function () {
        var productsContainer, goBackBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productsContainer = document.querySelector("#products");
                    productsContainer ? productsContainer.innerHTML = " " : null;
                    return [4 /*yield*/, fetch("https://fakestoreapi.com/products/".concat(product.id))
                            .then(function (response) { return response.json(); })
                            .then(function (data) {
                            var productView = "\n        <img src=\"".concat(data.image, "\" alt=\"").concat(data.title, "\">\n        <div class=\"product-title\">").concat(data.title, "</div>\n        <div class=\"product-price\"> Ksh ").concat(data.price, "</div>\n        <button class=\"go-back-button\">go back</button>\n        \n\n    ");
                            productsContainer.innerHTML = productView;
                        })];
                case 1:
                    _a.sent();
                    goBackBtn = document.querySelector(".go-back-button");
                    goBackBtn ? goBackBtn.addEventListener("click", function () { location.reload(); }) : "";
                    return [2 /*return*/];
            }
        });
    });
}
//search feature
searchButton.addEventListener('click', function () {
    var sideBar = document.querySelector(".side-bar");
    //clear data in the prodict container
    var productsContainer = document.querySelector("#products");
    productsContainer ? productsContainer.innerHTML = " " : console.log("the products container was not selected");
    //create a head tag of the intended category
    var categoryTitle = document.createElement('div');
    //get the input data
    var searchInput = document.querySelector("#category-search-string");
    if (searchInput.value !== "") {
        //append the categoryTitle to the top bar 
        categoryTitle.innerHTML = " Search Category by: ".concat(searchInput.value);
        sideBar.appendChild(categoryTitle);
        var category = searchInput.value.trim();
        console.log("the button was clicked and this is the value that was entered", category);
        category ? getProductsByCategory(category).then(function (products) {
            products ? displayProducts(products) : console.log("no products were found of such category ");
        }) : console.log("please enter text to search for products");
    }
    else {
        var p_error = document.createElement("p");
        p_error.innerHTML = "Kindly enter search value";
        p_error.style.color = "white";
        p_error.style.background = "red";
        p_error.style.fontSize = "10px";
        p_error.style.padding = "2px";
        sideBar.appendChild(p_error);
        setInterval(function () {
            location.reload();
        }, 100);
    }
});
//fetching products by category
function getProductsByCategory(category) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("https://fakestoreapi.com/products/category/".concat(category))
                            .then(function (response) { return response.json(); })
                            .then(function (products) { return displayProducts(products); })];
                case 1:
                    _a.sent();
                    console.log("products were fetched successfully by the category here");
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log("there was an error in fetching the product by the category", error_2);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//add to cart feature
// function addItemToCart(product:IProducts, quantity:number=1){
//     (!product||product.id)?console.log("The product is undefined or has missing Id",product):""
//     let cartItem=cart.find(item=>item.product.id===product.id);
//     cartItem?cartItem.quantity +=quantity:cart.push({product,quantity})
// }
function addItemToCart(id, quantity) {
    if (quantity === void 0) { quantity = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var cartProductWrapper, cartProductDiv, totalPrice, cartCounter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cartProductWrapper = document.querySelector(".cart");
                    //get the one product by 
                    // cart.push(productData)
                    return [4 /*yield*/, fetchOneProduct(cartProduct.id)];
                case 1:
                    //get the one product by 
                    // cart.push(productData)
                    _a.sent();
                    if (cartProduct.id) {
                        cart.push(cartProduct);
                    }
                    cartProductDiv = document.createElement("div");
                    cartProductDiv.className = "cart-product-card";
                    cartProductDiv.innerHTML = "\n        <img class=\"cart-image\" src=\"".concat(cartProduct.image, "\">\n        <div  class=\"cart-title\" >").concat(cartProduct.title, "<div>\n        <div  class=\"cart-price\" >").concat(cartProduct.price, "</div>\n        <div  class=\"cart-price\" >").concat(quantity, "</div>\n           \n    ");
                    cartProductWrapper === null || cartProductWrapper === void 0 ? void 0 : cartProductWrapper.appendChild(cartProductDiv);
                    totalPrice = document.createElement('div');
                    cartCounter = document.querySelector(".cart-counter");
                    cartCounter.innerHTML = String(cart.length);
                    console.log("this is cartp", cartProduct);
                    return [2 /*return*/];
            }
        });
    });
}
