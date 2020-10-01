
const createPage = async () => {
const inSessionStorage = JSON.parse(sessionStorage.order);
const inLocalStorage = JSON.parse(localStorage.getStorage);

    const quantity = async()=>{
        return await Promise.all(inLocalStorage.map(produit=>{
            
        }));
    }
    const sousTotal = async () => {
        return await Promise.all(inSessionStorage.products.map(prix => {
            return prix
        }));
    };
    
    const totalCalcul = async () => {
        const totalToPaid = await sousTotal();
        return`${totalToPaid.reduce((total, product) => total + parseFloat(product.price)/100, 0)}`;
    };
    
    
    const total = await totalCalcul();
    
    const main = document.getElementById("main");

    const orderContainer = document.createElement("div");
    const orderTitle = document.createElement("h1");
    const introductionTitle = document.createElement("h2");
    const congratulationText = document.createElement("p");
    const orderNumberContainer = document.createElement("div");
    const orderNumberLeft = document.createElement("p");
    const orderNumberRight = document.createElement("p");
    const containerTotal = document.createElement("div")
    const containerTotalLeft = document.createElement("p")
    const containerTotalRight = document.createElement("p")

    orderContainer.classList.add("order-container");
    orderTitle.classList.add("order-container__title");
    introductionTitle.classList.add("order-container__introduction");
    congratulationText.classList.add("order-container__message");
    orderNumberContainer.classList.add("order-container__order-container");
    orderNumberLeft.classList.add("order-container__order-container__left");
    orderNumberRight.classList.add("order-container__order-container__right");
    containerTotal.classList.add("container-total");
    containerTotalLeft.classList.add("container-total__left");
    containerTotalRight.classList.add("container-total__right");

    orderTitle.textContent = "Congratulations!";
    introductionTitle.textContent = `Hello ${inSessionStorage.contact.firstName},`;
    congratulationText.textContent = "Your sweet order has been confirmed and will be shipping in the next 3 days."
    orderNumberLeft.textContent = "Order Number:";
    orderNumberRight.textContent = `${inSessionStorage.orderId}`;
    containerTotalLeft.textContent = "In total:"
    containerTotalRight.textContent = `${await totalCalcul()}€`

    main.appendChild(orderTitle);
    main.appendChild(introductionTitle);
    main.appendChild(congratulationText);
    main.appendChild(orderNumberContainer);
    main.appendChild(containerTotal);
    orderNumberContainer.appendChild(orderNumberLeft);
    orderNumberContainer.appendChild(orderNumberRight);
    containerTotal.appendChild(containerTotalLeft);
    containerTotal.appendChild(containerTotalRight);
};


createPage();
