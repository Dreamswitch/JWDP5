
const serverPrice = [];

const getServer = async function (produitId) {
    let response = await fetch(`http://localhost:3000/api/teddies/${produitId}`);
    let data = await response.json();
    return data;
};


const getProducts = async (selector) => {

    const inStorage = JSON.parse(localStorage.getStorage);

    switch(selector){
        case "displayCart" :
            return await Promise.all(inStorage.map(async produit => {
                //recupere les données dans la base
                const teddie = await getServer(produit.id);
                teddie.sousTotal = produit.quantity * (teddie.price / 100);
                createTeddieRow(teddie, produit);
                //sauvegarde des prix du serveur
                serverPrice[`${produit.id}`] = `${teddie.price}`;
                return teddie;
            }));
        case "updateTotal" :
            return await Promise.all(inStorage.map(async produit => {
                //recupere les données dans la base
/*                 const teddie = await getServer(produit.id); //méthode appel API
                teddie.sousTotal = produit.quantity * (teddie.price / 100);
 */             
            produit.sousTotal = (produit.quantity) * (serverPrice[`${produit.id}`]/100);
            return produit;
            }));
    }
    
};

const createTeddieRow = (teddie, produit) => {

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
    cartProductContainerDeuxHeading.textContent = `${teddie.name}`;
    cartProductContainerDeuxDescription.textContent = `${teddie.description}`;
    cartBodyRowDataDeux.textContent = `${teddie.price / 100}`;
    cartBodyRowDataQuatre.textContent = `${teddie.sousTotal}`;
    productDelete.textContent = `delete`;

    //ajout des classes
    cartBodyRow.classList.add('cart__body__row');
    cartBodyRowData.classList.add('cart__body__row__data');
    cartProduct.classList.add('cart-product');
    cartProductContainerUn.classList.add('cart-product__container-1');
    cartProductContainerUnImage.classList.add('cart-product__container-1__image');
    cartProductContainerDeux.classList.add('cart-product__container-2');
    cartProductContainerDeuxHeading.classList.add('cart-product__container-2__heading');
    cartProductContainerDeuxDescription.classList.add('cart-product__container-2__description');
    cartBodyRowDataDeux.classList.add('cart__body__row__data',"cart__body__row__data--euro");
    cartBodyRowDataTrois.classList.add('cart__body__row__data');
    productQuantity.classList.add('product-quantity');
    cartBodyRowDataQuatre.classList.add('cart__body__row__data',"cart__body__row__data--euro",'text-center');
    cartBodyRowDataCinq.classList.add('cart__body__row__data');
    productDelete.classList.add('button-delete-product-cart');

    //ajout des attributs
    cartProductContainerUnImage.setAttribute("src", `${teddie.imageUrl}`);
    cartProductContainerUnImage.setAttribute("alt", `photo de teddies: ${teddie.name}`);
    productQuantity.setAttribute("type", `number`);
    productQuantity.setAttribute("value", `${produit.quantity}`);
    cartBodyRow.setAttribute("id",`${(teddie.name).replace(/ /g,"_")}`);

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

    //ajout de la fonction pour supprimer un produit
    productDelete.addEventListener("click",()=>{
        const teddieRow = document.getElementById(`${(teddie.name).replace(/ /g,"_")}`);
        teddieRow.remove();
        deleteInStorage(produit);
        updateTotal();
        widgetQuantities();
    });

    //ajout de la fonction de changement de quantité
    productQuantity.addEventListener("change",()=>{
        const teddieQuantity = document.querySelector(`#${(teddie.name).replace(/ /g,"_")} .product-quantity`);
        produit.sousTotal = (teddieQuantity.value)*(teddie.price/100);
        cartBodyRowDataQuatre.textContent = `${produit.sousTotal}`;
        produit.quantity = teddieQuantity.value;
        savingInStorage(produit);
        updateTotal();
        widgetQuantities();
    });
};


const displayCart = async () => {
    const totalCase = document.getElementById('product-total');
    const teddies = await getProducts("displayCart");
    totalCase.textContent = `${teddies.reduce((total, teddie) => total + teddie.sousTotal, 0)}€`;
};

const savingInStorage = (produit) => {
    const inStorage = JSON.parse(localStorage.getStorage);
    inStorage.map(teddie =>{
        if(teddie.id == produit.id){
            teddie.quantity = produit.quantity;
            let newDataStorage = JSON.stringify(inStorage);
            localStorage.setItem(`getStorage`,`${newDataStorage}`);        
        }
    });
};

const deleteInStorage = (produit) => {
    const inStorage = JSON.parse(localStorage.getStorage);
    inStorage.map(teddie =>{
        if(teddie.id == produit.id){
            const index = inStorage.indexOf(teddie);
            if (index > -1) {
                inStorage.splice(index, 1);
                let newDataStorage = JSON.stringify(inStorage);
                localStorage.setItem(`getStorage`,`${newDataStorage}`);        
            }
        }
    });
};

const updateTotal = async () => {
    const totalCase = document.getElementById('product-total');
    const teddies = await getProducts("updateTotal");
    totalCase.textContent = `${teddies.reduce((total, teddie) => total + teddie.sousTotal, 0)}€`;
};

const widgetQuantities = async (quantities) => {
    const widget = document.getElementById("article");
    const teddies = await getProducts("updateTotal");
    widget.textContent = `${teddies.reduce((total, teddie) => total + parseFloat(teddie.quantity), 0)}`;
};

displayCart();
widgetQuantities();