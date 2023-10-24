interface IProducts{
    quantity: number;
    id:string;
    title:string
    price:number
    description:string
    category:string
    image:string
  
}

interface IcartItem extends IProducts {
    product:IProducts
    quantity:number
}

let productArray:IProducts[]=[]
let cart:IcartItem[]=[]
let cartProduct:any



document.addEventListener('DOMContentLoaded',()=>{
    fetchProducts();
});

const searchButton=document.querySelector("#searchButton") as HTMLButtonElement;
const viewCart=document.querySelector(".view-cart") as HTMLDivElement;
let cartWrapper=document.querySelector(".cart-counter-wrapper") as HTMLDivElement
//declare an empty cart and global array for products

//using the local storage for cart feature
// localStorage.setItem('cart',JSON.stringify(cart))

 async function fetchProducts(){

    let promise = new Promise<{error?:string, data: any[]}>(()=>{
        fetch('https://fakestoreapi.com/products')
        .then(response=>{
            return response.json();
        })
        .then(data=> productArray=data)
         .then(data=>displayProducts(data))
    })


     
        // displayProducts(products))
        // console.log(products))

    .catch(error=>{
        console.log("error in fetching the products",error);
    })
}
async function fetchOneProduct(id: string) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        
        // Check if response is okay (status code 200-299)
        (!response.ok)?console.error("Error fetching product with ID:", id):null;
    
        const data: IProducts = await response.json();
        // console.log("this is the data for one product",data)
        // Assuming cartProduct is a variable in scope, update it with data
        cartProduct = data;
        // console.log(cartProduct)
        return cartProduct ; 
    } catch (error) {
        console.error("Error in fetching the product with id", id, error);
        return null;
    }
}



function displayProducts(products: IProducts[]) {
    // console.log("this i sthe product array", productArray)
    const productsContainer=document.querySelector("#products");

    if(!productsContainer) {
        console.error("Products container not found.");
        return;
    }
    products.forEach((product)=>{
        const productContainer=document.createElement('div');
        productContainer.className='product'

        let stringfiedProduct = JSON.stringify(product);
        // console.log("data",stringfiedProduct)
        const detailsBtnId = 'details-btn-' + product.id
        productContainer.innerHTML=`
        <img src="${product.image}" alt="${product.title}">
        <div class="product-title" style="font-weight=700">${product.title}</div>
        <div class="product-price" style="font-weight=700"><span id="price">Price</span>: $${product.price}</div>
        <div class="product-category" style="font-weight=700"><span id="category">Category</span>:${product.category}</div>
        <div id="buttons-wrapper">
            <div class="show-details-button" id=${detailsBtnId}>details</div>
            <button class="add-to-cart-btn" onclick="addItemToCart(${product.id})">Add to cart </div>
        </div>
       
    `
    ;

    productsContainer.appendChild(productContainer);
        
    //event listener for details button
    const detailsButton=document.querySelector("#"+detailsBtnId) as HTMLDivElement;
    detailsButton? detailsButton.addEventListener("click",()=>{
        displayOneProduct(product) 
    }) :console.log(" The button does not exist","#"+detailsBtnId);
    
    document.addEventListener('click', function(e:any) {
        if (e.target && e.target.classList?.contains('add-to-cart-btn')) {
            const productId = e.target.getAttribute('data-id');
            const productData = JSON.parse(e.target.getAttribute('data-product'));
            // addItemToCart(product,productData);
        }
    });
    
    

    });


    const cartBtn=document.querySelectorAll(".add-to-cart-btn");
 
    

    console.log(productsContainer)

}

// event listerner for the add to cart button

//read the values on the dom


function readProductValues(productArray:IProducts){
    // let parseProduct=JSON.parse(product)
    console.log(productArray)

    // const productValues={
    //     productTitle:parseProduct.title,
    //     productPrice:parseProduct.price,
    //     productImage:parseProduct. image  
    // }
    // console.log("this function reads the value of this ", productValues)
}








//displaying one prodcut only
async function displayOneProduct(product:IProducts){
    const productsContainer=document.querySelector("#products") as HTMLDivElement;

    productsContainer?productsContainer.innerHTML=" " :  null
  await fetch(`https://fakestoreapi.com/products/${product.id}`)
    .then(response=>{return response.json()})
    .then(data=>{   
         const productView=`
        <img src="${data.image}" alt="${data.title}">
        <div class="product-title">${data.title}</div>
        <div class="product-price"> Ksh ${data.price}</div>
        <button class="go-back-button">go back</button>
        

    `
    productsContainer.innerHTML=productView
    })
    

    const goBackBtn=document.querySelector(".go-back-button") as HTMLButtonElement;

    goBackBtn?goBackBtn.addEventListener("click",()=>
    {location.reload ()}) : ""

}

//search feature
 searchButton.addEventListener('click',()=>{
    const sideBar=document.querySelector(".side-bar") as HTMLDivElement
    //clear data in the prodict container
    const productsContainer=document.querySelector("#products") as HTMLDivElement;
    productsContainer?productsContainer.innerHTML=" ":console.log("the products container was not selected");

    //create a head tag of the intended category
    const categoryTitle=document.createElement('div');
   //get the input data
    const searchInput=document.querySelector("#category-search-string") as HTMLInputElement;

    if(searchInput.value!==""){
        //append the categoryTitle to the top bar 
    categoryTitle.innerHTML= ` Search Category by: ${searchInput.value}`
   
    sideBar.appendChild(categoryTitle);

    const category=searchInput.value.trim();

    console.log("the button was clicked and this is the value that was entered",category)

    category?getProductsByCategory(category).then(products=>{
        products?displayProducts(products) : console.log("no products were found of such category ")
    }) : console.log("please enter text to search for products")
    }

    else{
        const p_error=document.createElement("p")
         p_error.innerHTML="Kindly enter search value";
         p_error.style.color="white";
         p_error.style.background="red";
         p_error.style.fontSize="10px";
         p_error.style.padding="2px"

         sideBar.appendChild(p_error);
         setInterval(() => {
            location.reload();
         }, 100);
        
    }
    
    
 })    

 //fetching products by category
async function getProductsByCategory(category:string){
 try {
    await fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(response=>{return response.json()})
    .then(products=>displayProducts(products))
    console.log("products were fetched successfully by the category here")
    
 } catch (error) {
    console.log("there was an error in fetching the product by the category",error);
    return null
    
 }
       
}

//add to cart feature
// function addItemToCart(product:IProducts, quantity:number=1){
//     (!product||product.id)?console.log("The product is undefined or has missing Id",product):""
//     let cartItem=cart.find(item=>item.product.id===product.id);
//     cartItem?cartItem.quantity +=quantity:cart.push({product,quantity})
// }

async function addItemToCart(id:string,quantity=1) {

    let cartProductWrapper=document.querySelector(".cart") as HTMLDivElement;
   
    //get the one product by 

    // cart.push(productData)

    
    
     await fetchOneProduct(id)
    console.log(cartProduct.id);

    if(cartProduct.id){ cart.push(cartProduct)}
    if(cart.length===0){console.log("cart is empty")}
    const cartProductDiv=document.createElement("div");
    cartProductDiv.className="cart-product-card"
    cartProductDiv.innerHTML=`
        <img class="cart-image" src="${cartProduct.image}">
        <div  class="cart-title" >${cartProduct.title}<div>
        <div  class="cart-price" >${cartProduct.price}</div>
        <div  class="cart-price" >${quantity}</div>
           
    `
    cartProductWrapper.appendChild(cartProductDiv)
    
    
    
   
    
    const totalPrice=document.createElement('div');

    // totalPrice.innerHTML=cart
    const cartCounter=document.querySelector(".cart-counter") as HTMLParagraphElement;
    cartCounter.innerHTML =String(cart.length);

    cartWrapper.addEventListener('click',()=>{
        console.log("cart")
        alert("hello")
    })
    

    
  console.log("this is cartp",cartProduct);
  
// 
}
// viewCart.addEventListener("click",(e)=>{
//     console.log(cartProductWrapper)
   
// })


