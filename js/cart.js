
const getProducts = async function(){
    const response = await fetch("http://localhost:3000/api/teddies/");
    if(response.ok){
        const data = await response.json();
        console.log("la machine est lancée")
        return data ;
    }else{
        console.log('server disconnected')
    }
};

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
