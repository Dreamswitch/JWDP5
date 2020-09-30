if (!localStorage.getStorage) {
    emptyPageLoader();
} else {
    const serverPrice = [];

    const getServer = async function (produitId) {
        let response = await fetch(`http://localhost:3000/api/teddies/${produitId}`);
        let data = await response.json();
        return data;
    };


    const getProducts = async (selector) => {

        const inStorage = JSON.parse(localStorage.getStorage);

        switch (selector) {
            case "displayCart":
                return await Promise.all(inStorage.map(async produit => {
                    //recupere les données dans la base
                    const teddie = await getServer(produit.id);
                    teddie.sousTotal = produit.quantity * (teddie.price / 100);
                    createTeddieRow(teddie, produit);
                    //sauvegarde des prix du serveur
                    serverPrice[`${produit.id}`] = `${teddie.price}`;
                    return teddie;
                }));
            case "updateTotal":
                return await Promise.all(inStorage.map(async produit => {
                    //recupere les données dans la base
                    /*                 const teddie = await getServer(produit.id); //méthode appel API
                                    teddie.sousTotal = produit.quantity * (teddie.price / 100);
                     */
                    produit.sousTotal = (produit.quantity) * (serverPrice[`${produit.id}`] / 100);
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
                emptyPageLoader();
            }
        });

        //ajout de la fonction de changement de quantité
        productQuantity.addEventListener("change", () => {
            const teddieQuantity = document.querySelector(`#${(teddie.name).replace(/ /g, "_")} .product-quantity`);
            produit.sousTotal = (teddieQuantity.value) * (teddie.price / 100);
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


    //partie formulaire--------------------------------->

    const name = document.getElementById("name");
    const firstName = document.getElementById("first-name");
    const adress = document.getElementById("adress");
    const town = document.getElementById("town");
    const email = document.getElementById("email");
    const form = document.getElementById("form");

    //mes regexs ----------------------->
    const isACorrectNameSyntax = /^(([^ ][\wÀ-Ýà-ï]+)(-| )?){1,3}[^- ]$/;
    const isACorrectAdressSyntax = /^([^ ][\w\dÀ-Ýà-ï]+ ?)+$/;
    const isACorrectMailSyntax = /^[\w\d](([_\.\-]?[\w\d]+)*)@([\w\d]+)(([_\.\-]?[\w\d]+)*)\.([\w]{2,})$/

    //fonction de controle de regex
    const regexControl = (variableToControl, typeOfRegex) => {
        if (variableToControl.validity.valid && typeOfRegex.test(variableToControl.value)) {
            variableToControl.style.backgroundColor = "unset";
            console.log(variableToControl.value);
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
            { variable: adress, regexControl: isACorrectAdressSyntax },
            { variable: email, regexControl: isACorrectMailSyntax }
        ];
        return await Promise.all(inputsToControl.map(async input => {
            const data = await regexControl(input.variable, input.regexControl);
            return data;
        }));
    };


    const formIsOk = async () => {
        const data = await inputsAreOk();
        let contact = {
            prénom: name.value,
            nom: firstName.value,
            adresse: adress.value,
            ville: town.value,
            courriel: email.value
        };
        if (data.includes(false) || !localStorage.getStorage) {
            alert("votre formulaire contient des erreurs");
        } else {
            console.log(contact);
            alert(`chouette bientot un teddie pour melle ${name.value}`);
        };
    };


    form.addEventListener("submit", (event) => {
        event.preventDefault();
        formIsOk();
    });


}

const emptyPageLoader =()=>{
    const main = document.querySelector("main");
    main.parentNode.removeChild(main);

    const body = document.querySelector("body");

    const title = document.createElement("h1");
    title.textContent="votre panier est vide";
    title.classList.add("cart-title","cart-title--empty-cart");

    const button = document.createElement("a");
    button.textContent="retourner a l'accueil";
    button.classList.add("cart-btn","cart-btn--empty");
    button.setAttribute("href","../index.html");

    body.appendChild(title);
    body.appendChild(button);
};
