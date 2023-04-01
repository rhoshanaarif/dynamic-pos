let cart = JSON.parse(localStorage.getItem("mobilesdata")) || [];
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
console.log(cart);

let calculate = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = cart.map((x)=>x.item).reduce((x,y)=>x+y, 0)
   
}
calculate();

let generateCartItems = () => {
    if(cart.length!=0){
        return(shoppingCart.innerHTML = cart.map((x)=>{
            console.log(x);
            let {id, item} = x;
            let search = shopMobileItems.find((y)=>y.id===id) || [];
            return `
            <div class=cart-items >
                <img width="100" height = "100" src="${search.img}" /> 
                 <div class="details">
                     <div class="title-price-x">
                        <h4 class="title-price">
                        <p> ${search.name}</p>
                        <p class="cart-item-price"> $ ${search.price}</p>
                        <h4>

                        


                    </div>
                    <i onclick = "removeItem(${id})" class="bi bi-x-circle-fill"></i>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h2>$ ${item*search.price}</h2>


                </div>

            </div>`
        }).join(" ") );

    } 
    
    else{
        shoppingCart.innerHTML = "";
        label.innerHTML= `
        <h2 class="empty">Cart is Empty </h2>
        <a href="index.html">
        <button class="homebtn">Go back to Home</button>
        `

        
        

    }
}
generateCartItems();

let increment = (id) => {
    let search = cart.find((x) => x.id === id);
  
    if (search === undefined) {
      cart.push({
        id: id,
        item: 1,
      });
    } else {
      search.item += 1;
    }

  
    generateCartItems();
    update(id);
    localStorage.setItem("mobilesdata", JSON.stringify(cart));
    
    
  };


let decrement = (id) => {
    let search = cart.find((x) => x.id === id);
    if(search==undefined) return ;
  
    else if (search.item === 0) return; 

    else {
      search.item -= 1;
    }
  
    update(id)
    cart = cart.filter((x)=> x.item !== 0);
    generateCartItems();
    
    localStorage.setItem("mobilesdata", JSON.stringify(cart));
    
};

let update = (id) => {
    let search = cart.find((x) => x.id === id);
    
    let quantity = document.getElementById(id).innerHTML = search.item;
    console.log(search.item)
    calculate();
    TotalAmount();
};

let removeItem = (id) => {
    let selectedItem = id
    console.log(selectedItem);
    cart = cart.filter((x)=>x.id != id);
    generateCartItems();
    localStorage.setItem("mobilesdata", JSON.stringify(cart));
    TotalAmount();
    calculate();
    
}




let TotalAmount = () => {
    if (cart.length !== 0) {
      let amount = cart
        .map((x) => {
          let { id, item } = x;
          let filterData = shopMobileItems.find((x) => x.id === id);
          return filterData.price * item;
        })
        .reduce((x, y) => x + y, 0);
  
      return (label.innerHTML = `
      <h2>Total Bill : $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `);
    } else return;
  };

TotalAmount();


let clearCart = () => {
    cart = [];
    generateCartItems();
    calculate();
    localStorage.setItem("mobilesdata", JSON.stringify(cart));
    


}
