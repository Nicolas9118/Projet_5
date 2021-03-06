/* * * * * * * * * * * * * * * * * * *
 *  Récupérer les données de l'API   *
 * * * * * * * * * * * * * * * * * * */
function callApi() {
  return fetch("http://localhost:3000/api/products/")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(function (err) {
      console.log("erreur : " + err);
    });
}

/* * * * * * * * * * * * * * * * * * *
 *  Créer l'item produits à partir   *
 *       des données de l'API        *
 * * * * * * * * * * * * * * * * * * */
function createSofa(products) {
  const product = document.getElementById("items");

  const cardProduct = document.createElement("a");
  product.appendChild(cardProduct);
  cardProduct.href = "./product.html?id=" + products._id;

  const articleProduct = document.createElement("article");
  cardProduct.appendChild(articleProduct);

  const imageProduct = document.createElement("img");
  articleProduct.appendChild(imageProduct);
  imageProduct.src = products.imageUrl;
  imageProduct.alt = products.altTxt;

  const titleProduct = document.createElement("h3");
  articleProduct.appendChild(titleProduct);
  titleProduct.classList.add("productName");
  titleProduct.textContent = products.name;

  const descriptionProduct = document.createElement("p");
  articleProduct.appendChild(descriptionProduct);
  descriptionProduct.classList.add("productDescription");
  descriptionProduct.textContent = products.description;
}

/* * * * * * * * * * * * * * * * * * *
 *  Fonction qui attend le résultat  *
 *      de la promise a chaque       *
 *          boucle produits          *
 * * * * * * * * * * * * * * * * * * */
async function viewAllProducts() {
  const sofas = await callApi();
  console.log(sofas);
  for (let sofa of sofas) {
    console.log(sofa);
    createSofa(sofa);
  }
}

/* * * * * * * * * * * * * * * * * * *
 *    Appel de la fonction pour      *
 *        afficher les cards         *
 * * * * * * * * * * * * * * * * * * */
viewAllProducts();
