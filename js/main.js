const home = document.getElementById('home');
const articleInCart = document.getElementById("article");


const getProducts = async function(){
 let response = await fetch("http://localhost:3000/api/teddies");
 let data = await response.json();
 return data ;
};

const postDomElements = async () => {

    const produits = await getProducts()
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
        link.setAttribute("href",`./pages/product.html?id=${produit._id}`)
        cardImage.setAttribute("src",`${produit.imageUrl}`);
        cardImage.setAttribute("alt",`${produit.name}`);

        //ajout du contenu
        cardDescritptionName.textContent=`${produit.name}`;
        cardDescritptionColor.textContent="many colors availables";
        cardDescritptionPrice.textContent=`${produit.price /100}€ /u`;

        //ajout au DOM
        home.appendChild(link);
        link.appendChild(card);
        card.appendChild(cardImage);
        card.appendChild(cardDescritption);
        cardDescritption.appendChild(cardDescritptionName);
        cardDescritption.appendChild(cardDescritptionColor);
        cardDescritption.appendChild(cardDescritptionPrice);

    });
};
    
postDomElements();

const haribo =()=>{
    articleInCart.textContent = `${JSON.parse(localStorage.getStorage).length}`;
};
if(localStorage.getStorage !== undefined){
    haribo();
};