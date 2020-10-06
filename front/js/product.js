
//recupération de l'URL et de son paramètre
const urlParameter = new URL(window.location.href);
const productId = urlParameter.searchParams.get("id");

//function de recupération de données sur le serveur
const getProducts = async function () {
    let response = await fetch(`http://localhost:3000/api/teddies/${productId}`);
    let data = await response.json();
    return data;
};


//création de la page produit
const CreateDom = async () => {
    const data = await getProducts();

    //récuperation des constantes provenant du DOM
    const productName = document.getElementById('product-name');
    const productDescription = document.getElementById('product-description');
    const productColors = document.getElementById('product-colors');
    const productPrice = document.getElementById('product-price');
    const productImage = document.getElementById('product-image');

    //ajout du texte
    productName.textContent = `${data.name}`;
    productDescription.textContent = `${data.description}`;
    productPrice.textContent = `${data.price / 100}€/u`;

    //réglage des attributs
    productImage.setAttribute("style", `background:center / cover no-repeat url(${data.imageUrl})`);

    //créer des options (du select)
    const colors = data.colors;
    colors.map(color => {

        //création de nouveaux elements
        const productColorOption = document.createElement("option");

        //réglage des attributs
        productColorOption.setAttribute("value", `${color}`);

        //ajout du texte
        productColorOption.textContent = `${color}`;

        //ajout dans le DOM
        productColors.appendChild(productColorOption);
    })
};


//enregistrement des infos dans le localStorage

const productQuantity = () => {
    let quantity = document.getElementById('product-quantity').value;
    return quantity;
};

const storageControl = () => {
    const produitLocal = { id: productId, quantity: productQuantity() };
    let createNewStorage = [];
    let StorageLength = localStorage.length;

    //controle si le panier n'est pas vide
    if (StorageLength !== 0 && localStorage.getStorage) {
        let inStorage = JSON.parse(localStorage.getStorage);
        let existe = false;

        //controle si le produit est deja dans le panier
        //si oui, il update simplement la quantité
        //autrement il le rajoute au panier
        inStorage.map(produit => {
            if (produit.id == productId) {
                existe = true;
                produit.quantity = productQuantity();
            }
        });

        if (existe) {
            return JSON.stringify(inStorage);
        } else {
            inStorage.push(produitLocal);
            return JSON.stringify(inStorage);
        }

    } else {
        createNewStorage.push(produitLocal);
        return JSON.stringify(createNewStorage);
    }

};

const addCart = document.getElementById('add-cart');

addCart.addEventListener("click", () => {
    localStorage.setItem(`getStorage`, `${storageControl()}`);
    widgetQuantities();
});


const widgetQuantities = async (quantities) => {
    const widget = document.getElementById("article");
    const teddies = await getQuantities();
    widget.textContent = `${teddies.reduce((total, teddie) => total + parseFloat(teddie.quantity), 0)}`;
    widget.style.display = "block";
};

const getQuantities = async () => {
    const inStorage = JSON.parse(localStorage.getStorage);
    return await Promise.all(inStorage.map(produit => {
        return produit
    }));
};

if (localStorage.getStorage) {
    widgetQuantities();
};

CreateDom();