
const emptyCartLoader = () => {
    const main = document.querySelector("main");
    main.parentNode.removeChild(main);

    const body = document.querySelector("body");

    const title = document.createElement("h1");
    title.textContent = "Your cart is empty";
    title.classList.add("cart-title", "cart-title--empty-cart");

    const button = document.createElement("a");
    button.textContent = "Go to Home";
    button.classList.add("cart-btn", "cart-btn--empty");
    button.setAttribute("href", "../index.html");

    body.appendChild(title);
    body.appendChild(button);
};

const serverPrice = [];

const getServer = async function (produitId) {
    let response = await fetch(`http://localhost:3000/api/teddies/${produitId}`);
    let data = await response.json();
    return data;
};

const postServer = async (order) => {
    try {
        const response = await fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            body: JSON.stringify(order),
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new error("problem server transmission");
        };
    } catch (error) {
        console.error(error);
    }
};

const getProducts = async (selector) => {

    const inStorage = JSON.parse(localStorage.getStorage);

    switch (selector) {
        case "displayCart":
            return await Promise.all(inStorage.map(async produit => {
                //recupere les données dans la base
                const teddie = await getServer(produit.id);
                teddie.sousTotal = produit.quantity * (teddie.price / 100);
                inStorage.price = teddie.price / 100;
                createTeddieRow(teddie, produit);
                //sauvegarde des prix du serveur
                serverPrice[`${produit.id}`] = `${teddie.price}`;
                return teddie;
            }));
        case "updateTotal":
            return await Promise.all(inStorage.map(async produit => {
                //recupere les données dans la base
                /*                     const teddie = await getServer(produit.id); //méthode appel API
                                    teddie.sousTotal = produit.quantity * (teddie.price / 100);
                 */
                produit.sousTotal = (produit.quantity) * (serverPrice[`${produit.id}`] / 100);
                return produit;
            }));
        case "productOrder":
            return await Promise.all(inStorage.map(async product => {
                return product.id;
            }));
        default:
            throw new error("problème getProducts selector");
    };

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
    cartBodyRowDataDeux.classList.add('cart__body__row__data', "cart__body__row__data--euro");
    cartBodyRowDataTrois.classList.add('cart__body__row__data');
    productQuantity.classList.add('product-quantity');
    cartBodyRowDataQuatre.classList.add('cart__body__row__data', "cart__body__row__data--euro", 'text-center');
    cartBodyRowDataCinq.classList.add('cart__body__row__data');
    productDelete.classList.add('button-delete-product-cart');

    //ajout des attributs
    cartProductContainerUnImage.setAttribute("src", `${teddie.imageUrl}`);
    cartProductContainerUnImage.setAttribute("alt", `photo de teddies: ${teddie.name}`);
    productQuantity.setAttribute("type", `number`);
    productQuantity.setAttribute("min", `1`);
    productQuantity.setAttribute("value", `${produit.quantity}`);
    cartBodyRow.setAttribute("id", `${(teddie.name).replace(/ /g, "_")}`);

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
    productDelete.addEventListener("click", () => {
        const teddieRow = document.getElementById(`${(teddie.name).replace(/ /g, "_")}`);
        teddieRow.remove();
        deleteInStorage(produit);
        updateTotal();
        widgetQuantities();
        //efface le localStorage si le panier est vide
        if (JSON.parse(localStorage.getStorage).length === 0) {
            localStorage.clear();
            emptyCartLoader();
        }
    });

    //ajout de la fonction de changement de quantité
    productQuantity.addEventListener("change", () => {
        const teddieQuantity = document.querySelector(`#${(teddie.name).replace(/ /g, "_")} .product-quantity`);
        produit.sousTotal = (teddieQuantity.value) * (teddie.price / 100);
        cartBodyRowDataQuatre.textContent = `${produit.sousTotal}`;
        produit.quantity = teddieQuantity.value;
        updateInStorageQuantity(produit);
        updateTotal();
        widgetQuantities();
    });
};


const displayCart = async () => {
    const totalCase = document.getElementById('product-total');
    const teddies = await getProducts("displayCart");
    totalCase.textContent = `${teddies.reduce((total, teddie) => total + teddie.sousTotal, 0)}€`;
};

const updateInStorageQuantity = (produit) => {
    const inStorage = JSON.parse(localStorage.getStorage);
    inStorage.map(teddie => {
        if (teddie.id == produit.id) {
            teddie.quantity = produit.quantity;
            let newDataStorage = JSON.stringify(inStorage);
            localStorage.setItem(`getStorage`, `${newDataStorage}`);
        }
    });
};

const deleteInStorage = (produit) => {
    const inStorage = JSON.parse(localStorage.getStorage);
    inStorage.map(teddie => {
        if (teddie.id == produit.id) {
            const index = inStorage.indexOf(teddie);
            if (index > -1) {
                inStorage.splice(index, 1);
                let newDataStorage = JSON.stringify(inStorage);
                localStorage.setItem(`getStorage`, `${newDataStorage}`);
            }
        }
    });
};

// transmet le changement de total au DOM
const updateTotal = async () => {
    const totalCase = document.getElementById('product-total');
    const teddies = await getProducts("updateTotal");
    totalCase.textContent = `${teddies.reduce((total, teddie) => total + teddie.sousTotal, 0)}€`;
};

//affiche le nombre d'éléments présents dans le panier
const widgetQuantities = async (quantities) => {
    const widget = document.getElementById("article");
    if (localStorage.getStorage) {
        const teddies = await getProducts("updateTotal");
        widget.textContent = `${teddies.reduce((total, teddie) => total + parseFloat(teddie.quantity), 0)}`;
        widget.style.display = "block"
    } else {
        widget.style.display = "none";
    }
};

//partie formulaire--------------------------------->

const name = document.getElementById("name");
const firstName = document.getElementById("first-name");
const address = document.getElementById("adress");
const town = document.getElementById("town");
const email = document.getElementById("email");
const form = document.getElementById("form");

//mes regexs ----------------------->
const isACorrectNameSyntax = /^(([a-zA-ZÀ-Ýà-ï]+)(-| )?){1,2}[a-zA-ZÀ-Ýà-ï]+$/;
const isACorrectAddressSyntax = /^([\wÀ-Ýà-ï]+ ?)+[\wÀ-Ýà-ï]$/;
const isACorrectMailSyntax = /^[\w](([_\.\-]?[\w]+)*)@([\w]+)(([_\.\-]?[\w]+)*)\.([\w]{2,})$/

//fonction de controle de regex
const regexControl = (variableToControl, typeOfRegex) => {
    if (typeOfRegex.test(variableToControl.value)) {
        variableToControl.style.backgroundColor = "unset";
        return true;
    } else if (variableToControl.value == "") {
        variableToControl.style.backgroundColor = "unset";
        return false;
    } else {
        variableToControl.value = "syntax error";
        variableToControl.style.color = "hsla(349, 100%, 50%, 0.9)";
        return false;
    };
};

// let's go, all control is comming
const inputsAreOk = async () => {
    const inputsToControl = [
        { variable: name, regexControl: isACorrectNameSyntax },
        { variable: firstName, regexControl: isACorrectNameSyntax },
        { variable: town, regexControl: isACorrectNameSyntax },
        { variable: address, regexControl: isACorrectAddressSyntax },
        { variable: email, regexControl: isACorrectMailSyntax }
    ];
    return await Promise.all(inputsToControl.map(async input => {
        const data = await regexControl(input.variable, input.regexControl);
        return data;
    }));
};

const formIsOk = async () => {
    try {
        const data = await inputsAreOk();
        let contact = {
            firstName: firstName.value.trim(),
            lastName: name.value.trim(),
            address: address.value.trim(),
            city: town.value.trim(),
            email: email.value.trim()
        };
        if (data.includes(false) || !localStorage.getStorage) {
            throw new Error("error input formData");
        } else {
            return contact;
        };
    } catch (error) {
        console.error(error.message);
    }
};

//controle que les données saisies respectes la syntaxe attendue
//et que les patterns HTML n'aient pas été éffacés
form.addEventListener("submit", async (event) => {
    try {
        event.preventDefault();
        const contact = await formIsOk();
        const productsId = await getProducts("productOrder");
        if (contact) {
            const order = {};
            order.contact = contact;
            order.products = productsId;
            const postOrderResponse = await postServer(order);
            orderPage(postOrderResponse);
            emptyCartLoader();
        } else {
            throw new Error('HTML "pattern" erased by user');
        };
    } catch (error) {
        console.error(error.message);
    };
});

//si tout est OK, 
//supprime le localStorage,update le widget,sauvegarde la commande dans le sessionStorage et le total dans le localStorage
const orderPage = async (order) => {
    function clearStorage() {
        const total = document.getElementById("product-total").textContent;
        localStorage.clear();
        widgetQuantities();
        return total;
    };
    localStorage.setItem("totalOrder", `${JSON.stringify(clearStorage())}`);
    sessionStorage.setItem("order", `${JSON.stringify(order)}`);
    window.open(`./order-confirmation.html?orderId=${order.orderId}`);
};


//contenu en fonction de la présence de la clée dans le localStorage
if (!localStorage.getStorage) {
    emptyCartLoader();
} else {
    displayCart();
    widgetQuantities();
};

