
//Création des variables
//La page qu'on récupere
const kanap = window.location;

//Création d'une url
const urlProduct = new URL(kanap);
// URL API
const url = "http://localhost:3000/api/products";


// Get l'ID du canapé sélectionner 
let id = urlProduct.searchParams.get("id");
let URLID = url + "/" + id;

/* On crée une fonction qui va contenir la méthode fetch et la manipulation du dom 
pour afficher le produit selectionné  */


const fetchID = async () => {

   fetch(URLID)
      .then(Response => Response.json())
      .then(async function (res) {

         data = await res;

         //Image du canapé
         document.querySelector(".item__img").innerHTML = `<img src="${data.imageUrl}" alt"${data.altTxt}">`
         //Nom du canapé
         document.querySelector("#title").innerHTML = `<h1 id="title">${data.name}</h1>`
         //Prix du canapé
         document.querySelector("#price").innerHTML = `<span id="price">${data.price}</span>`
         // Description du canapé
         document.querySelector("#description").innerHTML = `<p id="description">${data.description}</p>`
         //Couleurs du canapé
         //Boucle for pour afficher toutes les couleurs
         for (i = 0; i < data.colors.length; i++) {
            document.getElementById("colors").innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
         }
      })


}


fetchID();





addToPanier();
function addToPanier() {

   let addToCartBtn = document.getElementById("addToCart");
   addToCartBtn.addEventListener("click", (event) => {


      event.preventDefault()
      // Le produit qui sera envoyé vers le localStorage

      let product = {
         id,
         color: document.getElementById("colors").value,
         quantity: parseInt(document.getElementById("quantity").value)
      };
      // LOCALSTORAGE
      // stocker les valeurs du formulaire dans le local storage


      let productInLocalstorage = JSON.parse(localStorage.getItem("produit"));

      //Constante pour la confirmation du panier

      const confirmation = () => {
         if (window.confirm("Produit(s) ajouté(s), appuyer sur OK pour consulter votre panier.")) {
            window.location.href = "./cart.html";
         }

      }

      //Si les champs sont vides

      if (product.color === "" || product.quantity === 0) {
         alert("Choissisez une couleur et/ou un nombre");
         document.location.reload();
         addToPanier();
      } else {
         //Les champs sont remplis
         // Il n'y a pas de produits dans le localstorage
         if (!productInLocalstorage) {
            productInLocalstorage = [];
            productInLocalstorage.push(product);
            localStorage.setItem("produit", JSON.stringify(productInLocalstorage));
            console.log(productInLocalstorage)
            console.log("tqui");
            confirmation();
         }
         //Il y a des produits dans le localstorage
         else if (productInLocalstorage.length != 0) {
            var okay = 0;
            for (i = 0; i < productInLocalstorage.length; i++) {
               if ((product.id === productInLocalstorage[i].id) && (product.color === productInLocalstorage[i].color)) {
                  okay++;
                  productInLocalstorage[i].quantity += product.quantity;
                  localStorage.setItem("produit", JSON.stringify(productInLocalstorage));
                  console.log("cc");
                  console.log(productInLocalstorage[i].quantity)
                  confirmation();
               }
            } if (okay === 0) {
               productInLocalstorage.push(product);
               localStorage.setItem("produit", JSON.stringify(productInLocalstorage));
               console.log(productInLocalstorage);
               console.log("bonsoir");
               confirmation();
            }
         }
      }

   });
}
