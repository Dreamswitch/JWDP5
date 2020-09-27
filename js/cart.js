
/**
 * const getProducts = async function(){
    const serverTeddies = await fetch("http://localhost:3000/api/teddies/");
    if(serverTeddies.ok){
        const data = await serverTeddies.json();
        console.log("la machine est lancée")
        return data ;
    }else{
        console.log('server disconnected')
    }
};

 */
/**
 * const getServer = async function(produitId){
    const serverTeddies = await fetch(`http://localhost:3000/api/teddies/${produitId}`);
    if(serverTeddies.ok){
        const data = await serverTeddies.json();
        return data ;
    }else{
        console.log('server disconnected')
    }
};
 * 
 */
const totalCase = document.getElementById('product-total');

 
const getServer = async function(produitId){
    let response = await fetch(`http://localhost:3000/api/teddies/${produitId}`);
    let data = await response.json();
    return data ;
   };


const getProducts =async function() {
    const inStorage =  JSON.parse(localStorage.getStorage);
    let tabSousTotaux = [1];

    // element du DOM a incrementer
    const cartBody = document.getElementById("cart__body");

    //parcours les produits du panier et créer les éléments du panier
    await inStorage.map( async produit =>{

        //recupere les données dans la base
        const serverTeddies = await getServer(produit.id);
        const sousTotal = produit.quantity*(serverTeddies.price/100);
        tabSousTotaux.push(sousTotal);

        //créer les éléménts
        const cartBodyRow = document.createElement("tr");
        const cartBodyRowData = document.createElement("td");
        const cartProduct = document.createElement("div");
        const cartProductContainerUn = document.createElement("div");
        const cartProductContainerUnImage = document.createElement("img");
        const cartProductContainerDeux = document.createElement("div");
        const cartProductContainerDeuxHeading = document.createElement("h2");
        const cartProductContainerDeuxDescription = document.createElement("p");
        const cartBodyRowDataDeux = document.createElement("td");
        const cartBodyRowDataTrois = document.createElement("td");
        const productQuantity = document.createElement("input");
        const cartBodyRowDataQuatre = document.createElement("td");
        const cartBodyRowDataCinq = document.createElement("td");
        const productDelete = document.createElement("button");

        // ajout du contenu
        cartProductContainerDeuxHeading.textContent=`${serverTeddies.name}`;
        cartProductContainerDeuxDescription.textContent=`${serverTeddies.description}`;
        cartBodyRowDataDeux.textContent=`${serverTeddies.price/100}€`;
        cartBodyRowDataQuatre.textContent=`${sousTotal}€`;
        productDelete.textContent=`delete`;

        //ajout des classes
        cartBodyRow.classList.add('cart__body__row');
        cartBodyRowData.classList.add('cart__body__row__data');
        cartProduct.classList.add('cart-product');
        cartProductContainerUn.classList.add('cart-product__container-1');
        cartProductContainerUnImage.classList.add('cart-product__container-1__image');
        cartProductContainerDeux.classList.add('cart-product__container-2');
        cartProductContainerDeuxHeading.classList.add('cart-product__container-2__heading');
        cartProductContainerDeuxDescription.classList.add('cart-product__container-2__description');
        cartBodyRowDataDeux.classList.add('cart__body__row__data');
        cartBodyRowDataTrois.classList.add('cart__body__row__data');
        productQuantity.classList.add('product-quantity');
        cartBodyRowDataQuatre.classList.add('cart__body__row__data');
        cartBodyRowDataQuatre.classList.add('text-center');
        cartBodyRowDataCinq.classList.add('cart__body__row__data');
        productDelete.classList.add('button-delete-product-cart');
        
        //ajout des attributs
        cartProductContainerUnImage.setAttribute("src",`${serverTeddies.imageUrl}`);
        cartProductContainerUnImage.setAttribute("alt",`photo de teddies: ${serverTeddies.name}`);
        productQuantity.setAttribute("type",`number`);
        productQuantity.setAttribute("value",`${produit.quantity}`);

        //ajout dans le DOM
        cartBody.appendChild(cartBodyRow);
        cartBodyRow.appendChild(cartBodyRowData);
        cartBodyRowData.appendChild(cartProduct);
        cartProduct.appendChild(cartProductContainerUn);
        cartProductContainerUn.appendChild(cartProductContainerUnImage);
        cartProduct.appendChild(cartProductContainerDeux);
        cartProductContainerDeux.appendChild(cartProductContainerDeuxHeading);
        cartProductContainerDeux.appendChild(cartProductContainerDeuxDescription);
        cartBodyRow.appendChild(cartBodyRowDataDeux);
        cartBodyRow.appendChild(cartBodyRowDataTrois);
        cartBodyRowDataTrois.appendChild(productQuantity);
        cartBodyRow.appendChild(cartBodyRowDataQuatre);
        cartBodyRow.appendChild(cartBodyRowDataCinq);
        cartBodyRowDataCinq.appendChild(productDelete);

        console.log("un elément a été ajouté à votre panier")

    });
    return tabSousTotaux;
};


const total = async ()=>{
    let sousTotaux = await getProducts();
    totalCase.textContent=`${sousTotaux.reduce((total,num)=>{return total + num;})} euros`;
};
total();

/*
getProducts().then(()=>{setTimeout(() => {
    const total = tabSousTotaux.reduce((tot,num)=>{
        return tot + num ;
    });
    totalCase.textContent +=`${total} euros`;
}, 100);});

//controle du nombre d'éléments présent dans le panier
const articleInCart = document.getElementById("article");
const haribo =()=>{
    articleInCart.textContent = `${JSON.parse(localStorage.getStorage).length}`;
};

if(localStorage.getStorage !== undefined){
    haribo();
};


/*
getProducts()
.then(function(data){
    console.log("...votre panier est en cours de création")
    //récupération des data classé par type
    
    const productIds=[];
    const productNames=[];
    const productPrices=[];
    const productDescription=[];
    const productImages=[];
    data.forEach(element => {
        productIds.push(element._id)
        productNames.push(element.name)
        productPrices.push(element.price)
        productDescription.push(element.description)
        productImages.push(element.imageUrl)
    });

    //parcours les données du localStorage afin de générer les produits commandé dans le panier
    for(let i=0 ; i<productIds.length ; i++){
        let inCart = localStorage.getItem(`${productIds[i]}`);
        if(inCart){
            
            // element du DOM a incrementer
            const cartBody = document.getElementById("cart__body");

            //créer les éléménts
            const cartBodyRow = document.createElement("tr");
            const cartBodyRowData = document.createElement("td");
            const cartProduct = document.createElement("div");
            const cartProductContainerUn = document.createElement("div");
            const cartProductContainerUnImage = document.createElement("img");
            const cartProductContainerDeux = document.createElement("div");
            const cartProductContainerDeuxHeading = document.createElement("h2");
            const cartProductContainerDeuxDescription = document.createElement("p");
            const cartBodyRowDataDeux = document.createElement("td");
            const cartBodyRowDataTrois = document.createElement("td");
            const productQuantity = document.createElement("input");
            const cartBodyRowDataQuatre = document.createElement("td");
            const cartBodyRowDataCinq = document.createElement("td");
            const productDelete = document.createElement("button");

            // ajout du contenu
            cartProductContainerDeuxHeading.textContent=`${productNames[i]}`;
            cartProductContainerDeuxDescription.textContent=`${productDescription[i]}`;
            cartBodyRowDataDeux.textContent=`${productPrices[i]/100}€`;
            cartBodyRowDataQuatre.textContent=`${productPrices[i]/100}€`;
            productDelete.textContent=`delete`;

            //ajout des classes
            cartBodyRow.classList.add('cart__body__row');
            cartBodyRowData.classList.add('cart__body__row__data');
            cartProduct.classList.add('cart-product');
            cartProductContainerUn.classList.add('cart-product__container-1');
            cartProductContainerUnImage.classList.add('cart-product__container-1__image');
            cartProductContainerDeux.classList.add('cart-product__container-2');
            cartProductContainerDeuxHeading.classList.add('cart-product__container-2__heading');
            cartProductContainerDeuxDescription.classList.add('cart-product__container-2__description');
            cartBodyRowDataDeux.classList.add('cart__body__row__data');
            cartBodyRowDataTrois.classList.add('cart__body__row__data');
            productQuantity.classList.add('product-quantity');
            cartBodyRowDataQuatre.classList.add('cart__body__row__data');
            cartBodyRowDataQuatre.classList.add('text-center');
            cartBodyRowDataCinq.classList.add('cart__body__row__data');
            productDelete.classList.add('button-delete-product-cart');
            
            //ajout des attributs
            cartProductContainerUnImage.setAttribute("src",`${productImages[i]}`);
            cartProductContainerUnImage.setAttribute("alt",`photo de teddies: ${productNames[i]}`);
            productQuantity.setAttribute("type",`number`);
            productQuantity.setAttribute("value",`${inCart}`);
            productQuantity.setAttribute("id",`product-quantity`);
            cartProductContainerDeuxDescription.setAttribute("id",`product-description`);
            cartBodyRowDataDeux.setAttribute("id",`product-price`);
            cartBodyRowDataQuatre.setAttribute("id",`product-subTotal`);
            productDelete.setAttribute("id",`product-delete`);

            //ajout dans le DOM
            cartBody.appendChild(cartBodyRow);
            cartBodyRow.appendChild(cartBodyRowData);
            cartBodyRowData.appendChild(cartProduct);
            cartProduct.appendChild(cartProductContainerUn);
            cartProductContainerUn.appendChild(cartProductContainerUnImage);
            cartProduct.appendChild(cartProductContainerDeux);
            cartProductContainerDeux.appendChild(cartProductContainerDeuxHeading);
            cartProductContainerDeux.appendChild(cartProductContainerDeuxDescription);
            cartBodyRow.appendChild(cartBodyRowDataDeux);
            cartBodyRow.appendChild(cartBodyRowDataTrois);
            cartBodyRowDataTrois.appendChild(productQuantity);
            cartBodyRow.appendChild(cartBodyRowDataQuatre);
            cartBodyRow.appendChild(cartBodyRowDataCinq);
            cartBodyRowDataCinq.appendChild(productDelete);

            console.log("un elément a été ajouté à votre panier")
            
        }else{
            console.log(`${productNames[i]} est tombé du manège`);
        }
    }
    return console.log("C'est à toi, n'oublies pas de remplir le formulaire");
});
*/