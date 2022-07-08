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



addToCartBtn.onclick = () => {

   //Créer un array pour le localStorage, et un produit 
   let basket = [];

   let product = {
      id,
      quantity: parseInt(document.getElementById("quantity").value),
      color: document.getElementById("colors").value
   };


   if (product.color == 0 && product.quantity == 0) {
      alert("Veuillez séléctionner une couleur et une quantité d'articles.");
   } else if (product.color == 0 || product.quantity == 0) {
      alert("Veuillez séléctionner une quantité d'articles/ou une couleur.");
   } else if(product.quantity >= 1){

      if(basket.length === 0){
         basket.push(product);
      localStorage.setItem("product", JSON.stringify(product));
      
   }else {
      for(i = 0; i < basket.length; i++){

         if(basket[i].id == product.id && basket[i].color == product.color){
            console.log("test"),
               basket[i].quantity++,
               
               localStorage.setItem("product", JSON.stringify(basket))
               
            


         }

      }
   }

      if (product.quantity == 1) {
         //Changement bouton
         addToCartBtn.innerHTML = `Ajouté au panier`
         addToCartBtn.style.color = "green";
      } else if (product.quantity > 1){
         //Changement bouton
         addToCartBtn.innerHTML = `Ajoutés au panier`
         addToCartBtn.style.color = "green";
      }

   }
   
   
   

      

}