let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name : 'black Tshirt',
        tag : 'blacktshirt',
        price: 200,
        inCart: 0
    },
    {
        name : 'yellow Tshirt',
        tag : 'yellowtshirt',
        price: 250,
        inCart: 0
    },
    {
        name : 'grey Tshirt',
        tag : 'greytshirt',
        price: 300,
        inCart: 0
    },
    {
        name : 'white Tshirt',
        tag : 'whitetshirt',
        price: 150,
        inCart: 0
    }
    
];

for(let i=0; i<carts.length; i++)
{
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers+1);
        document.querySelector('.cart span').textContent=productNumbers+1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent=1;
    }

    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]:product
    }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    //console.log("total cost is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("my cartcost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else{
        localStorage.setItem("totalCost", product.price);
    }
    
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <table class="table">
                <tr>
                <td><i class="fa fa-times-circle" aria-hidden="true"></i></td>
                <td><img src="./images/${item.tag}.jpg"><span>${item.name}</span></td>
                <td>Rs. ${item.price}.00</td>
                <td>
                <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
                <span id="span">${item.inCart}</span>
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                </td>
                <td>Rs. ${item.inCart * item.price}.00</td>
                </tr>
            </table>
            `;
        });
        productContainer.innerHTML += `
        <div class = "basketTotalContainer">
            <h4 class = "basketTotalTitle">
                Basket Total
            </h4>
            <h4 class = "basketTotal">
                $${cartCost}.00
            </h4>
        </div>
        `
        
    }
}

onLoadCartNumbers();
displayCart();