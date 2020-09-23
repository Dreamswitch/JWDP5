const home = document.getElementById('home');

fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(function(data){

    
    data.forEach(element => {

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
        link.setAttribute("href",`./pages/product.html?id=${element._id}`)
        cardImage.setAttribute("src",`${element.imageUrl}`);
        cardImage.setAttribute("alt",`${element.name}`);

        //ajout du contenu
        cardDescritptionName.textContent=`${element.name}`;
        cardDescritptionColor.textContent="plusieurs couleurs disponibles";
        cardDescritptionPrice.textContent=`${element.price /100}$`;

        //ajout au DOM
        home.appendChild(link);
        link.appendChild(card);
        card.appendChild(cardImage);
        card.appendChild(cardDescritption);
        cardDescritption.appendChild(cardDescritptionName);
        cardDescritption.appendChild(cardDescritptionColor);
        cardDescritption.appendChild(cardDescritptionPrice);

    });

});

