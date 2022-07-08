// Création de la variable qui contient le lien

const url = "http://localhost:3000/api/products";

// On crée une fonction qui va contenir la méthode fetch et la manipulation du dom pour afficher les produits.

let fetchCards = function () {

   fetch(url)

      .then(response => response.json())
      .then((data) => {

         console.log(data)

         let products = document.getElementById("items");

         // La boucle for pour afficher toutes les cartes 


         for (i = 0; i < data.length; i++) {

            const cards =

               `<a href="./product.html?id=${data[i]._id}">
                  <article>
                    <img
                      src="${data[i].imageUrl}"
                      alt="${data[i].altTxt}"
                    />
                    <h3 class="productName">${data[i].name}</h3>
                    <p class="productDescription">
                      ${data[i].description}
                    </p>
                  </article>
                </a>
              `;
            products.innerHTML += cards;

         }


      })
}

// Appel de la fonction

fetchCards();