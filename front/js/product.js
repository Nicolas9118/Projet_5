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
  return (
    fetch("http://localhost:3000/api/products/" + id)
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

/* * * * * * * * * * * * * * * * * * * * * * * *
 *     Récupérer les données choisis           *
 *        l'utilisateur en objet               *
 * * * * * * * * * * * * * * * * * * * * * * * */
function recoverData(products) {
  const color = document.getElementById("colors");
  const choiceColor = color.options[color.selectedIndex].value;

  const quantityOfProduct = document.getElementById("quantity").value;

  const product = {
    id: id,
    color: choiceColor,
    quantity: parseInt(quantityOfProduct, 10),
  };
  console.log(product);
  return product;
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 *      Mettre les objets dans un              *
 *     tableau dans le localStorage            *
 * * * * * * * * * * * * * * * * * * * * * * * */
function addLocalStorage() {
  const addBasket = document.getElementById("addToCart");
  addBasket.addEventListener("click", async function () {
    const sofas = await callApi();
    const product = recoverData(sofas);

    // Condition il faut que les deux données soit rempli sinon message d'erreur
    if (product.color == "" || product.quantity <= 0) {
      alert(
        "Veuiilez sélectionner une couleur et une quantité s'il vous plaît."
      );
    } else {
      let selectProduct = JSON.parse(localStorage.getItem("productSelected"));

      // Vérification si mon panier à déjà un même article
      // si oui savoir sur quelle ligne de mon tableau il est placé
      let verif = 0;
      let boucleNumber = 0;
      for (let i in selectProduct) {
        if (
          selectProduct[i].id == product.id &&
          selectProduct[i].color == product.color
        ) {
          verif++;
          break;
        } else {
          boucleNumber++;
        }
      }

      // mais si mon id && ma color est identique à ma nouvelle entrée
      // alors ajouter modifié juste ma quantité
      if (selectProduct && verif > 0) {
        JSON.parse((selectProduct[boucleNumber].quantity += product.quantity));
        console.log(selectProduct[boucleNumber].quantity);
        console.log("doublons !!!!!!!");
        localStorage.setItem("productSelected", JSON.stringify(selectProduct));
      }

      //si mon local storage n'est pas vide et que mon id est != de ma nouvelle entrée
      // alors implémenter mon tableau
      else if (selectProduct) {
        selectProduct.push(product);
        localStorage.setItem("productSelected", JSON.stringify(selectProduct));
        console.log("pas de doublons");
      }

      //si mon local storage est vide commencer a remplir mon tableau
      else {
        selectProduct = [];
        selectProduct.push(product);
        localStorage.setItem("productSelected", JSON.stringify(selectProduct));
        console.log(selectProduct);
      }
    }
  });
}

/* * * * * * * * * * * * * * * * * * * * * * * * *
 *    Appel des fonctions :                      *
 *      - afficher l'item selon l'id             *
 *      - Ajouter l'objet dans le localStorage   *
 * * * * * * * * * * * * * * * * * * * * * * * * */
viewProduct();
addLocalStorage();
