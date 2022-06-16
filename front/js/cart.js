/* * * * * * * * * * * * * * * * *
 *   Récupération des produits    *
 *    mis dans le localStorage    *
 * * * * * * * * * * * * * * * *  */

function callLocalStorage() {
  let selectProduct = JSON.parse(localStorage.getItem("productSelected"));
  return selectProduct;
}

const recoverData = callLocalStorage();
console.log(recoverData);

/* * * * * * * * * * * * * * * * * * * * *
 *   Créer chaque éléments à afficher    *
 *    à partir d'une ligne du local      *
 * * * * * * * * * * * * * * * * * * * * */
function createSofa(ligneArray) {
  const product = document.getElementById("cart__items");

  //<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
  const articleProduct = document.createElement("article");
  product.appendChild(articleProduct);
  articleProduct.classList.add("cart__item");
  articleProduct.setAttribute("data-id", recoverData[ligneArray].id);
  articleProduct.setAttribute("data-color", recoverData[ligneArray].color);

  //<div class="cart__item__img"></div>
  const divImage = document.createElement("div");
  articleProduct.appendChild(divImage);
  divImage.classList.add("cart__item__img");

  //<img src="../images/product01.jpg" alt="Photographie d'un canapé"></img>
  const imageProduct = document.createElement("img");
  divImage.appendChild(imageProduct);
  imageProduct.src = recoverData[ligneArray].imgUrl;
  imageProduct.alt = recoverData[ligneArray].altTxt;

  //<div class="cart__item__content">
  const divContent = document.createElement("div");
  articleProduct.appendChild(divContent);
  divContent.classList.add("cart__item__content");

  //<div class="cart__item__content__description">
  const divDescription = document.createElement("div");
  divContent.appendChild(divDescription);
  divDescription.classList.add("cart__item__content__description");

  //<h2>Nom du produit</h2>
  const productName = document.createElement("h2");
  divDescription.appendChild(productName);
  productName.textContent = recoverData[ligneArray].name;

  //<p>Vert</p>
  const productColor = document.createElement("p");
  divDescription.appendChild(productColor);
  productColor.textContent = recoverData[ligneArray].color;

  //<p>42,00 €</p>
  const productPrice = document.createElement("p");
  divDescription.appendChild(productPrice);
  productPrice.textContent = recoverData[ligneArray].price;

  //<div class="cart__item__content__settings">
  const divSettings = document.createElement("div");
  divContent.appendChild(divSettings);
  divSettings.classList.add("cart__item__content__settings");

  //<div class="cart__item__content__settings__quantity">
  const divSettingsQuantity = document.createElement("div");
  divSettings.appendChild(divSettingsQuantity);
  divSettingsQuantity.classList.add("cart__item__content__settings__quantity");

  //<p>Qté : </p>
  const productQuantity = document.createElement("p");
  divSettingsQuantity.appendChild(productQuantity);
  productQuantity.textContent = "Qté : ";

  //<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
  const inputQuantity = document.createElement("input");
  divSettingsQuantity.appendChild(inputQuantity);
  inputQuantity.setAttribute("type", "number");
  inputQuantity.setAttribute("name", "itemQuantity");
  inputQuantity.setAttribute("min", "1");
  inputQuantity.setAttribute("max", "100");
  inputQuantity.setAttribute("value", recoverData[ligneArray].quantity);

  //<div class="cart__item__content__settings__delete"></div>
  const divSettingsDelete = document.createElement("div");
  divSettings.appendChild(divSettingsDelete);
  divSettingsDelete.classList.add("cart__item__content__settings__delete");

  //<p class="deleteItem">Supprimer</p>
  const productDelete = document.createElement("p");
  divSettingsDelete.appendChild(productDelete);
  productDelete.textContent = "Supprimer";
}

for (let i in recoverData) {
  createSofa(i);
}

function basketPrice() {
  let quantityTotal = 0;
  let priceTotal = 0;
  let pricePerSofas = 0;

  for (let i in recoverData) {
    quantityTotal += recoverData[i].quantity;
    pricePerSofas = recoverData[i].quantity * recoverData[i].price;
    priceTotal += pricePerSofas;
  }

  const spanTotalQuantity = document.getElementById("totalQuantity");
  spanTotalQuantity.textContent = quantityTotal;

  const spanTotalPrice = document.getElementById("totalPrice");
  spanTotalPrice.textContent = priceTotal;
}

basketPrice();

// quand je change la quantité je modifie la quantité du localStorage
//=> j'écoute "itemQuantity" a chaque changement => modifier la quantité du localStorage
//J'écoute mes inputs
const modifyBasket = document.querySelector("input");
modifyBasket.addEventListener("change", function () {
  //recoverData = mon localStorage
  const articleParent = modifyBasket.closest("article");
  console.log(articleParent);
  const dataId = articleParent.getAttribute("data-id");
  console.log(dataId);
  const dataColor = articleParent.getAttribute("data-color");
  console.log(dataColor);
  const newQuantity = modifyBasket.getAttribute("value");
  console.log(newQuantity); //pourquoi la valeur de mon input change pas quand j'écrit un autre chiffre ?

  /*if (dataId == recoverData[0].id && dataColor == recoverData[0].color) {
    console.log("on rentre dans la condition");

    localStorage.setItem("productSelected", JSON.stringify(recoverData));
  }*/
});

//si la valeur de mon input change alors modifié mon localStorage
// pour savoir quelle ligne modifié ?
// => vérifié data-id et data-color du parent de l'input
// boucle for pour vérifié condition de chaque ligne
// si data-id == recoverData.id[] && data-color == recoverData.color[]
// alors modifié la valeur de quantité dans le localStorage et sortir de la boule
// sinon refaire un tour de boucle
