function callApi() {
  return fetch("http://localhost:3000/api/products/")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (resultatApi) {
      console.log(resultatApi);
      return resultatApi;
    })
    .catch(function (err) {
      console.log("erreur : " + err);
    });
}

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
  titleProduct.classList.add("productDescription");
  titleProduct.textContent = products.description;
}

async function viewAllProducts() {
  const sofas = await callApi();

  for (let sofa of sofas) {
    console.log(sofa);
    createSofa(sofa);
  }
}

viewAllProducts();
