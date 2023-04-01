let shop = document.getElementById('shop');


let cart = JSON.parse(localStorage.getItem("mobilesdata")) || [];
console.log(shop);

let generateShop = ()=>{
    return shop.innerHTML= shopMobileItems.map((x)=>{
        let {id, name, price, description, img} = x;
        let search = cart.find((x)=> x.id === id) || [];
        return `
    <div id="product-id-${id}" class="item">
        <img width="220" height="150"src="${img}" alt="">
        <div class="details">
            <h2>${name}</h2>
            <P>${description}</P>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>`}).join(" ")
}

generateShop();

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
    
    localStorage.setItem("mobilesdata", JSON.stringify(cart));
};

let update = (id) => {
    let search = cart.find((x) => x.id === id);
    
    let quantity = document.getElementById(id).innerHTML = search.item;
    console.log(search.item)
    calculate();
};

let calculate = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = cart.map((x)=>x.item).reduce((x,y)=>x+y, 0)
   
}
calculate();
