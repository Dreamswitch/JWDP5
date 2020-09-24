
const getProducts = async function(){
    let response = await fetch("http://localhost:3000/api/teddies/");
    let data = await response.json();
    return data ;
};

getProducts()
.then(function(data){
    let productIds=[];
    let productNames=[];
    let productPrices=[];
    data.forEach(element => {
        productIds.push(element._id)
        productNames.push(element.name)
        productPrices.push(element.price)
        console.log();
    });
    for(let i=0 ; i<productIds.length ; i++){
        let inCart = localStorage.getItem(`${productIds[i]}`);
        if(inCart){
            // element du DOM a incrementer
            const cartTablebody = document.getElementById("cart-tablebody");

            //créer les éléménts
            const tableRow = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdPrice = document.createElement('td');
            const tdQuantity = document.createElement('td');

            // ajout du contenu
            tdName.textContent=`${productNames[i]}`;
            tdPrice.textContent=`${productPrices[i]/100}€ /u`;
            tdQuantity.textContent=`${inCart}`;

            //ajout des classes
            tableRow.classList.add('cart__body__row');
            tdName.classList.add('cart__body__row__data');
            tdPrice.classList.add('cart__body__row__data');
            tdQuantity.classList.add('cart__body__row__data');

            //ajout dans le DOM
            cartTablebody.appendChild(tableRow);
            tableRow.appendChild(tdName);
            tableRow.appendChild(tdQuantity);
            tableRow.appendChild(tdPrice);
        }else{
            console.log(`${productNames[i]} n'est pas dans le panier`);
        }
    }
});

const but = document.getElementById("confirm-command");
but.addEventListener("click",function(){
    
});