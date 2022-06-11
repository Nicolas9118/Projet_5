/* * * * * * * * * * * * * * * * * * *
 *  Récupérer récupérer la valeur    *
 *       de la variable "id" de      *
 *          l'URL courante           *
 * * * * * * * * * * * * * * * * * * */
const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

/* * * * * * * * * * * * * * * * * * *
 *  Récupérer les données de l'API   *
 * * * * * * * * * * * * * * * * * * */
function callApi() {
  return fetch("http://localhost:3000/api/products/" + id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (resultatApi) {
      return resultatApi;
      console.log(resultatApi);
    })
    .catch(function (err) {
      console.log("erreur : " + err);
    });
}

/* * * * * * * * * * * * * * * * * * * * *
 *   Créer chaque éléments à afficher    *
 *    à partir des données de l'API      *
 * * * * * * * * * * * * * * * * * * * * */
function createProduct(products) {
  const itemImg = document.getElementsByClassName("item__img");
  const firstItemImg = itemImg[0];
  const imageProduct = document.createElement("img");
  firstItemImg.appendChild(imageProduct);
  imageProduct.src = products.imageUrl;
  imageProduct.alt = products.altTxt;

  const titleProduct = document.getElementById("title");
  titleProduct.textContent = products.name;
  console.log(titleProduct.textContent);

  const priceProduct = document.getElementById("price");
  priceProduct.textContent = products.price;
  console.log(priceProduct.textContent);

  const descriptionProduct = document.getElementById("description");
  descriptionProduct.textContent = products.description;
  console.log(descriptionProduct.textContent);

  const colorsOptions = document.getElementById("colors");

  for (let i in products.colors) {
    const options = document.createElement("option");
    colorsOptions.appendChild(options);
    options.setAttribute("value", products.colors[i]);
    options.textContent = products.colors[i];
    console.log(options.textContent);
  }
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 *   Fonction qui attend le résultat de la     *
 *    promise pour appeler "createProduct"     *
 * * * * * * * * * * * * * * * * * * * * * * * */
async function viewProduct() {
  const sofas = await callApi();

  console.log(sofas);
  createProduct(sofas);
}

/* * * * * * * * * * * * * * * * * * * * * * *
 *    Appel de la fonction pour afficher     *
 *            les éléments créer             *
 * * * * * * * * * * * * * * * * * * * * * * */
viewProduct();

/* * * * * * * * * * * * * * * * * * * * * * * *
 *     Récupérer les données couleur et        *
 *     quantité choisis par l'utilisateur      *
 * * * * * * * * * * * * * * * * * * * * * * * */
async function recoverData() {
  const sofas = await callApi();

  const color = document.getElementById("colors");
  const choiceColor = color.addEventListener("change", function () {
    localStorage.setItem(
      "productColor",
      color.options[color.selectedIndex].value
    );
  });

  const quantity = document.getElementById("quantity");
  const quantityOfProduct = quantity.addEventListener("change", function () {
    localStorage.setItem("productQuantity", quantity.value); // Obliger d'appuyer sur entrer ou de recliquer autre part
  });
}
recoverData();
