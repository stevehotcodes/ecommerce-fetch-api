interface IProducts{
    
    id:number;
    title:string
    price:number
    description:string
    category:string
    // quantity: number ;
    image:string
  
}

interface IcartItem  extends IProducts{
 
    quantity:number
}

let productArray:IProducts[]=[]
let cart:IcartItem[]=[]
// let cartProduct:any



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
        
        console.log(`fetched data`,data)
        return data ; 
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
            <button class="add-to-cart-btn" onclick="addProductToCart(${product.id})">Add to cart </div>
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

async function addProductToCart(id:string) {

    

    let fetchedProduct=await fetchOneProduct(id);
    if(!fetchedProduct) return ;

    console.log("fetched product from API",fetchedProduct);

    //prepare item to be added to cart
    const itemToAddtoCart:IcartItem={
        ...fetchedProduct,
        quantity:1,

    };
    //add the item to the cart
    addToCart(itemToAddtoCart)
    // console.log("item added to cart success fully");
    


}
 function addToCart(newItem:IcartItem){
    // let cartData = localStorage.getItem('cart');
    // let cart: IcartItem[] =  [];
    //confirm if the item exists in the cart
    const cartCounter=document.querySelector(".cart-counter") as HTMLParagraphElement;
    cartCounter.innerHTML =String(cart.length);
    const existItem=cart.find(item=>item.id===newItem.id)
    // console.log("does the item exist",existItem)
    // if item exists ,increment its quantity
    if(existItem){
        existItem.quantity+=newItem.quantity

        console.log(`item's quantity were adjusted by one check it out, ${existItem.quantity}`, cart)
    }
    else{
        cart.push(newItem)
        console.log("item added successfully to cart",cart);
        
    }
    localStorage.setItem('cart',JSON.stringify(cart))

}


    let itemsAddedtoCart=localStorage.getItem(JSON.parse('cart'))
    console.log("retrivig from localstorage",itemsAddedtoCart)

    let cartProductWrapper=document.querySelector(".cart") as HTMLDivElement;
    const cartProductDiv=document.createElement("div");
    cartProductDiv.className="cart-product-card"
    cartProductDiv.innerHTML=`
        <img class="cart-image" src="${cart}">
        <div  class="cart-title" >${cart}<div>
        <div  class="cart-price" >${cart}</div>
        // <div  class="cart-price" ></div>
           
    `
    
 

   






//    let lc=localStorage.getItem('cart')
//     console.log("get cart items from localstorage" ,JSON.parse(lc))
    const totalPrice=document.createElement('div');
    totalPrice.className="total-price-div"
    const priceTitle=document.createElement('div');
    let totalCost=cart.reduce((acc,curr)=>{
        return acc+curr.price
    },0)

    priceTitle.innerText=`${totalCost}`
    
    // totalPrice.appendChild(priceTitle);
    // cartProductWrapper.appendChild(totalPrice)
    console.log(priceTitle)

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


