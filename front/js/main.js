const errorServerConnexion = () => {
    const main = document.querySelector("main");
    main.parentNode.removeChild(main);

    const body = document.querySelector("body");

    const title = document.createElement("h1");
    title.textContent = "Sorry, server is done ;(";
    title.classList.add("cart-title", "cart-title--empty-cart");

    const button = document.createElement("a");
    button.textContent = "Try again";
    button.classList.add("cart-btn", "cart-btn--empty");
    button.setAttribute("href", "./index.html");

    body.appendChild(title);
    body.appendChild(button);
};

const home = document.getElementById('home');
const articleInCart = document.getElementById("article");

const getProducts = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/teddies');
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    };
};

const postDomElements = async () => {
    try {
        const produits = await getProducts();
        if (produits) {
            produits.map(produit => {

                //creation de la structure HTML des différents produits
                const link = document.createElement('a');
                const card = document.createElement('section');
                const cardImage = document.createElement('img');
                const cardDescritption = document.createElement('div');
                const cardDescritptionName = document.createElement('h2');
                const cardDescritptionColor = document.createElement('p');
                const cardDescritptionPrice = document.createElement('p');

                //ajout des classes
                link.classList.add('link');
                card.classList.add('link__card');
                cardImage.classList.add('link__card__image');
                cardDescritption.classList.add('link__card__description');
                cardDescritptionName.classList.add('link__card__description__name');
                cardDescritptionColor.classList.add('link__card__description__color');
                cardDescritptionPrice.classList.add('link__card__description__price');

                //ajout des attributs
                link.setAttribute("href", `./pages/product.html?id=${produit._id}`)
                cardImage.setAttribute("src", `${produit.imageUrl}`);
                cardImage.setAttribute("alt", `${produit.name}`);

                //ajout du contenu
                cardDescritptionName.textContent = `${produit.name}`;
                cardDescritptionColor.textContent = "many colors availables";
                cardDescritptionPrice.textContent = `${produit.price / 100}€ /u`;

                //ajout au DOM
                home.appendChild(link);
                link.appendChild(card);
                card.appendChild(cardImage);
                card.appendChild(cardDescritption);
                cardDescritption.appendChild(cardDescritptionName);
                cardDescritption.appendChild(cardDescritptionColor);
                cardDescritption.appendChild(cardDescritptionPrice);

            });
        } else {
            errorServerConnexion();
            throw new Error("server is done");
        };
    } catch (error) {
        console.error(error.message);
    }
};

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

postDomElements();