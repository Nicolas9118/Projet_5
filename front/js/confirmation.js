/* * * * * * * * * * * * * * * * * * * * * *
 *  Récupérer récupérer la valeur de la    *
 *  variable "orderId" de l'URL courante   *
 * * * * * * * * * * * * * * * * * * * * * */
const id = new URL(window.location.href).searchParams.get("orderId");
console.log(id);

const orderId = document.getElementById("orderId");
orderId.textContent = id;
