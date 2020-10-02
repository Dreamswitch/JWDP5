const emptyCartLoader = () => {
    const main = document.getElementById("main");

    const title = document.createElement("h1");
    title.textContent = "error 404";
    title.classList.add("cart-title", "cart-title--empty-cart");

    const button = document.createElement("a");
    button.textContent = "retourner a l'accueil";
    button.classList.add("cart-btn", "cart-btn--empty");
    button.setAttribute("href", "../index.html");

    main.appendChild(title);
    main.appendChild(button);
};


if (!sessionStorage.order) {
    emptyCartLoader();
} else {
    const createPage = async () => {
        const inSessionStorage = JSON.parse(sessionStorage.order);
        const total = JSON.parse(localStorage.totalOrder);

        const main = document.getElementById("main");

        const orderContainer = document.createElement("div");
        const orderTitle = document.createElement("h1");
        const introductionTitle = document.createElement("h2");
        const congratulationText = document.createElement("p");
        const orderNumberContainer = document.createElement("div");
        const orderNumberLeft = document.createElement("p");
        const orderNumberRight = document.createElement("p");
        const containerTotal = document.createElement("div");
        const containerTotalLeft = document.createElement("p");
        const containerTotalRight = document.createElement("p");
        const containerOrder = document.createElement("div");

        orderContainer.classList.add("order-container");
        orderTitle.classList.add("order-container__title");
        introductionTitle.classList.add("order-container__introduction");
        congratulationText.classList.add("order-container__message");
        containerOrder.classList.add("order-container__container")
        orderNumberContainer.classList.add("order-container__container__order-container");
        orderNumberLeft.classList.add("order-container__container__order-container__left");
        orderNumberRight.classList.add("order-container__container__order-container__right");
        containerTotal.classList.add("order-container__container__container-total");
        containerTotalLeft.classList.add("order-container__container__container-total__left");
        containerTotalRight.classList.add("order-container__container__container-total__right");

        introductionTitle.textContent = "Congratulations!";
        orderTitle.textContent = `Hello ${inSessionStorage.contact.firstName},`;
        congratulationText.textContent = "Your sweet order has been confirmed and will be shipping in the next 3 days."
        orderNumberLeft.textContent = "Order Number:";
        orderNumberRight.textContent = `${inSessionStorage.orderId}`;
        containerTotalLeft.textContent = "In total:"
        containerTotalRight.textContent = `${total}`

        main.appendChild(orderContainer);
        orderContainer.appendChild(orderTitle);
        orderContainer.appendChild(introductionTitle);
        orderContainer.appendChild(congratulationText);
        orderContainer.appendChild(containerOrder);
        containerOrder.appendChild(orderNumberContainer);
        containerOrder.appendChild(containerTotal);
        orderNumberContainer.appendChild(orderNumberLeft);
        orderNumberContainer.appendChild(orderNumberRight);
        containerTotal.appendChild(containerTotalLeft);
        containerTotal.appendChild(containerTotalRight);
    };


    createPage();
};

localStorage.clear();
sessionStorage.clear();