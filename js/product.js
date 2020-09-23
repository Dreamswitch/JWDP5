const product = document.getElementById('product');


//recupération de l'URL et de son paramètre
const urlParameter = new URL(window.location.href);
const productId = urlParameter.searchParams.get("id");

fetch(`http://localhost:3000/api/teddies/${productId}`)
.then(response => response.json())
.then(function(data){
    
    //récuperation des constantes provenant du DOM
    const productName = document.getElementById('product-name');
    const productDescription= document.getElementById('product-description');
    const productColors= document.getElementById('product-colors');
    const productQuantity= document.getElementById('product-quantity');
    const productPrice= document.getElementById('product-price');
    const productImage= document.getElementById('product-image');

    
    //ajout du texte
    productName.textContent=`${data.name}`;
    productDescription.textContent=`${data.description}`;
    productPrice.textContent=`${data.price/100}$/u`;

    //réglage des attributs
    productImage.setAttribute("style",`background:center / cover no-repeat url(${data.imageUrl})`);

    const colors = data.colors;
    for(let color of colors){
        //récuperation des constantes provenant du DOM

        //création de nouveaux elements
        const productColorContainer = document.createElement("div");
        const productColorInput = document.createElement("input");
        const productColorLabel = document.createElement("label");

        //réglage des attributs
        productColorInput.setAttribute("type","radio");
        productColorInput.setAttribute("id",`${color}`);
        productColorInput.setAttribute("name","color");
        productColorLabel.setAttribute("for",`${color}`);

        //ajout du texte
        productColorLabel.textContent=` ${color}`;

        //ajout dans le DOM
        productColors.appendChild(productColorContainer);
        productColorContainer.appendChild(productColorInput);
        productColorContainer.appendChild(productColorLabel);
    }

    
});