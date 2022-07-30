const kanap = window.location;
const urlProduct = new URL(kanap);
const url = "http://localhost:3000/api/products";
let data = "";


// Get l'ID du canapé sélectionner 

let id = urlProduct.searchParams.get("id");
let URLID = url + "/" + id;

/* On crée une fonction qui va contenir la méthode fetch et la manipulation du dom 
pour afficher le produit selectionné + la spécifications pour les champs de saisie. */


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
         for (i = 0; i < data.colors.length; i++) {
            document.getElementById("colors").innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
         }
      })


}


fetchID();




let addToCartBtn = document.getElementById("addToCart");

addToCartBtn.addEventListener("click", (event) => {

   // Le produit qui sera envoyé vers le localStorage
event.preventDefault()


   let product = {
      id,
      color: document.getElementById("colors").value,
      quantity: parseInt(document.getElementById("quantity").value)
   };
   // LOCALSTORAGE
   // stocker les valeurs du formulaire dans le local storage


   let productInLocalstorage = JSON.parse(localStorage.getItem("produit"));

   const confirmation = () => {
      if (window.confirm("Produit(s) ajouté(s), appuyer sur OK pour consulter votre panier.")) {
         window.location.href = "./cart.html";
      }

   }

if(product.color == "" || product.quantity == 0){
      alert("Choissisez une couleur et/ou une couleur")
   } else { 

   // Il y a déja des produits enregistrés
   if (productInLocalstorage) {
      for (i = 0; i < productInLocalstorage.length; i++) {
         if (product.id == productInLocalstorage[i].id) {
            if(product.color == productInLocalstorage[i].color){
               productInLocalstorage[i].quantity += product.quantity;  
               localStorage.setItem("produit", JSON.stringify(productInLocalstorage));
               console.log("cc");    
               console.log(productInLocalstorage[i].quantity)
               confirmation();
            }else {
               productInLocalstorage.push(product);
               localStorage.setItem("produit", JSON.stringify(productInLocalstorage));
               console.log(productInLocalstorage);
               console.log("salut");
               confirmation();
               return
            }
          
            

     
      }
   
}} // Il n'y a pas de produits dans le localstorage
   else if(!productInLocalstorage){
      productInLocalstorage = [];
      productInLocalstorage.push(product);
      localStorage.setItem("produit", JSON.stringify(productInLocalstorage));
      console.log(productInLocalstorage)
      console.log("tqui");
      confirmation();
      


   

   }}

});
