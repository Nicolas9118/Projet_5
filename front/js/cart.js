/* * * * * * * * * * * * * * * * * * * * * * * *
 *       Récupérer les données de l'API        *
 * * * * * * * * * * * * * * * * * * * * * * * */
function callApi() {
  return (
    fetch("http://localhost:3000/api/products/")
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      /*.then(function (resultatApi) {
        return resultatApi;
        console.log(resultatApi);
      })*/
      .catch(function (err) {
        console.log("erreur : " + err);
      })
  );
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 *          Récupération des produits          *
 *           mis dans le localStorage          *
 * * * * * * * * * * * * * * * * * * * * * * * */
function callLocalStorage() {
  let selectProduct = JSON.parse(localStorage.getItem("productSelected"));
  return selectProduct;
}
const recoverData = callLocalStorage();

/* * * * * * * * * * * * * * * * * * * * * * * *
 *     Créer un tableau avec chaque objet      *
 *             ajouter au panier               *
 *        Un objet == donnée du local          *
 *             + donnée de l'API               *
 * * * * * * * * * * * * * * * * * * * * * * * */
async function recoverAll() {
  const recoverApi = await callApi();
  let recover = [];

  for (let i in recoverData) {
    let j = 0;
    while (recoverData[i].id != recoverApi[j]._id) {
      j++;
    }

    const sofa = {
      id: recoverData[i].id,
      quantity: recoverData[i].quantity,
      color: recoverData[i].color,
      name: recoverApi[j].name,
      price: recoverApi[j].price,
      imgUrl: recoverApi[j].imageUrl,
      altTxt: recoverApi[j].altTxt,
      description: recoverApi[j].description,
    };

    recover.push(sofa);
  }
  return recover;
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 *      Créer mon noeud d'éléments du DOM      *
 *        à partir d'une ligne du local        *
 * * * * * * * * * * * * * * * * * * * * * * * */
function createSofa(rowArray) {
  const product = document.getElementById("cart__items");

  //<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
  const articleProduct = document.createElement("article");
  product.appendChild(articleProduct);
  articleProduct.classList.add("cart__item");
  articleProduct.setAttribute("data-id", rowArray.id);
  articleProduct.setAttribute("data-color", rowArray.color);

  //<div class="cart__item__img"></div>
  const divImage = document.createElement("div");
  articleProduct.appendChild(divImage);
  divImage.classList.add("cart__item__img");

  //<img src="../images/product01.jpg" alt="Photographie d'un canapé"></img>
  const imageProduct = document.createElement("img");
  divImage.appendChild(imageProduct);
  imageProduct.src = rowArray.imgUrl;
  imageProduct.alt = rowArray.altTxt;

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
  productName.textContent = rowArray.name;

  //<p>Vert</p>
  const productColor = document.createElement("p");
  divDescription.appendChild(productColor);
  productColor.textContent = rowArray.color;

  //<p>42,00 €</p>
  const productPrice = document.createElement("p");
  divDescription.appendChild(productPrice);
  productPrice.textContent = rowArray.price + " €";

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
  inputQuantity.setAttribute("value", rowArray.quantity);

  //<div class="cart__item__content__settings__delete"></div>
  const divSettingsDelete = document.createElement("div");
  divSettings.appendChild(divSettingsDelete);
  divSettingsDelete.classList.add("cart__item__content__settings__delete");

  //<p class="deleteItem">Supprimer</p>
  const productDelete = document.createElement("p");
  divSettingsDelete.appendChild(productDelete);
  productDelete.textContent = "Supprimer";
}

/* * * * * * * * * * * * * * * * * * * * *
 *         Appel de la fonction          *
 *       pour chaque ligne du local      *
 * * * * * * * * * * * * * * * * * * * * */
async function itemBasket() {
  const recover = await recoverAll();
  for (let reco of recover) {
    createSofa(reco);
  }
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 *       Créer chaque éléments à afficher      *
 *        et faire le total d'item/prix        *
 *               du localStorage               *
 * * * * * * * * * * * * * * * * * * * * * * * */
async function basketTotal() {
  let quantityTotal = 0;
  let priceTotal = 0;
  let pricePerSofas = 0;
  const recover = await recoverAll();

  for (let i in recover) {
    quantityTotal += parseInt(recover[i].quantity, 10);
    pricePerSofas = recover[i].quantity * recover[i].price;
    priceTotal += pricePerSofas;
  }

  const spanTotalQuantity = document.getElementById("totalQuantity");
  spanTotalQuantity.textContent = quantityTotal;

  const spanTotalPrice = document.getElementById("totalPrice");
  spanTotalPrice.textContent = priceTotal;
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 *   Pour chaque input enfant d'un article     *
 *    s'il y a un changement sauvegarder       *
 *    la nouvelle valeur dans le panier        *
 *           et le localStortage               *
 * * * * * * * * * * * * * * * * * * * * * * * */
async function quantityBasket() {
  const modifyQuantityBasket = document.querySelectorAll("article input");
  modifyQuantityBasket.forEach((input) => {
    input.addEventListener("change", function changeQuantityBasket() {
      //recoverData = mon localStorage
      const articleParent = input.closest("article");
      console.log(articleParent);
      const dataId = articleParent.getAttribute("data-id");
      console.log(dataId);
      const dataColor = articleParent.getAttribute("data-color");
      console.log(dataColor);

      if (input.value > 100 || input.value < 1) {
        alert(
          "Veuiilez sélectionner une quantité entre 1 et 100 s'il vous plaît."
        );
      } else {
        const newQuantity = input.value;
        console.log(newQuantity);

        for (let i in recoverData) {
          if (
            dataId == recoverData[i].id &&
            dataColor == recoverData[i].color
          ) {
            console.log("on rentre dans la condition");
            recoverData[i].quantity = newQuantity;
            localStorage.setItem(
              "productSelected",
              JSON.stringify(recoverData)
            );
            basketTotal();
          }
        }
      }
    });
  });
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 *         Si un clic sur "supprimer"          *
 *     alors supprimer l'article du panier     *
 *            et du localStortage              *
 * * * * * * * * * * * * * * * * * * * * * * * */
async function deleteBasket() {
  const deleteItemBasket = document.querySelectorAll(
    "article div.cart__item__content__settings__delete p"
  );
  deleteItemBasket.forEach((input) => {
    input.addEventListener("click", function deleteArticle() {
      //recoverData = mon localStorage
      const articleParent = input.closest("article");
      console.log(articleParent);
      const dataId = articleParent.getAttribute("data-id");
      console.log(dataId);
      const dataColor = articleParent.getAttribute("data-color");
      console.log(dataColor);

      for (let i in recoverData) {
        if (dataId == recoverData[i].id && dataColor == recoverData[i].color) {
          console.log("on va supprimer");
          const deleteItem = recoverData.splice(i, 1);
          localStorage.setItem("productSelected", JSON.stringify(recoverData));
          basketTotal();
          break;
        }
      }
      /* si productSelected vide alors clear localStorage */
      if (recoverData.length == 0) {
        localStorage.clear();
        location.reload();
      }
      location.reload();
    });
  });
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 *             Si panier vide alors            *
 *             cacher le formulaire            *
 * * * * * * * * * * * * * * * * * * * * * * * */
function activeForm() {
  if (recoverData == null) {
    console.log("panier vide");
    form = document.querySelectorAll("form");
    form.forEach((div) => {
      div.style.display = "none";
    });
    alert(
      "Panier vide ! Pour valider une commande un article doit être ajouter au panier."
    );
  }
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 *        Déclarer mes variable erreur         *
 * * * * * * * * * * * * * * * * * * * * * * * */
const firstNameError = document.getElementById("firstNameErrorMsg");
const lastNameError = document.getElementById("lastNameErrorMsg");
const adressError = document.getElementById("addressErrorMsg");
const cityError = document.getElementById("cityErrorMsg");
const emailError = document.getElementById("emailErrorMsg");

/* * * * * * * * * * * * * * * * * * * * * * * *
 *          Vérifier si les champs du          *
 *           formulaire sont correct           *
 * * * * * * * * * * * * * * * * * * * * * * * */
function verifForm() {
  // => mettre dans une variable mon regex
  const regexString = /^[A-Za-z\-éèçàï ]{2,18}$/;
  const regexLongString = /^[A-Za-z0-9\-éèçàï ]{2,50}$/;
  const regexEmail = /^[A-Za-z0-9\.-_]+@[a-z]+\.[a-z]{2,4}$/;

  if (
    regexString.test(document.getElementById("firstName").value) &&
    regexString.test(document.getElementById("lastName").value) &&
    regexLongString.test(document.getElementById("address").value) &&
    regexString.test(document.getElementById("city").value) &&
    regexEmail.test(document.getElementById("email").value)
  ) {
    return true;
  } else if (
    regexString.test(document.getElementById("firstName").value) == false
  ) {
    firstNameError.textContent = "Le prénom n'est pas valide";
  }
  // => Si le Nom n'est pas correct alors afficher un message d'erreur
  else if (
    regexString.test(document.getElementById("lastName").value) == false
  ) {
    lastNameError.textContent = "Le nom n'est pas valide";
  }
  // => Si l'adresse n'est pas correct alors afficher un message d'erreur
  else if (
    regexLongString.test(document.getElementById("address").value) == false
  ) {
    adressError.textContent = "L'adresse n'est pas valide";
  }
  // => Si la ville n'est pas correct alors afficher un message d'erreur
  else if (regexString.test(document.getElementById("city").value) == false) {
    cityError.textContent = "La ville n'est pas valide";
  }
  // => Si l'email n'est pas correct alors afficher un message d'erreur
  else if (regexEmail.test(document.getElementById("email").value) == false) {
    emailError.textContent = "L'email n'est pas valide";
  }
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 *      Envoyer les données du formulaire      *
 *           et du panier à l'API              *
 * * * * * * * * * * * * * * * * * * * * * * * */
function sendApi(contact, products) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Response was not ok : " + res.status);
      }
    })
    .then(function (data) {
      document.location = "confirmation.html?orderId=" + data.orderId;
      //window.location.replace(`confirmation.html?orderId=${datas.orderId}`);
      localStorage.clear();
    })
    .catch(function (err) {
      console.log("erreur : " + err);
    });
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 *             Si verifForm ok alors           *
 *         créer contact et appel sendApi      *
 *             sinon afficher erreur           *
 * * * * * * * * * * * * * * * * * * * * * * * */
async function validForm() {
  const recover = await recoverAll();
  const order = document.getElementById("order");
  order.addEventListener("click", function (event) {
    event.preventDefault();
    // => remise a zéro des messages d'erreurs a chaque fois que l'on clique sur le bouton commander
    firstNameError.textContent = "";
    lastNameError.textContent = "";
    adressError.textContent = "";
    cityError.textContent = "";
    emailError.textContent = "";

    // => Si tous les champs sont correct
    if (verifForm()) {
      alert("Tout est valide");
      // => alors mettre les valeurs des champs sans un objet
      const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      };

      // création d'un array avec tous les IDs des produits dans le panier
      const products = recover.map((product) => product.id);

      console.log(products);

      sendApi(contact, products);
    }

    verifForm();
  });
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 *          Appel des fonctions dans           *
 *          le bon ordre d'execution           *
 * * * * * * * * * * * * * * * * * * * * * * * */
(async () => {
  await itemBasket();
  activeForm();
  await basketTotal();
  await quantityBasket();
  await deleteBasket();
  await validForm();
})();
