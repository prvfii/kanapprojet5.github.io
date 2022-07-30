// Récupérer les produits du localstorage

let addCart = JSON.parse(localStorage.getItem("produit"));
console.log(addCart);



function cartAppear() {


    // Si le panier est vide 
    if (addCart === null) {
        document.querySelector(".cart").innerHTML = "<h1>OOPS ! Votre panier est vide</h1>";
    } else {
        console.log("Votre pannier n'est pas vide");

        // Si le localstorage contient des produits

        for (let i = 0; i < addCart.length; i++) {
            fetch(`http://localhost:3000/api/products/${addCart[i].id}`)
                .then((res) => {
                    return res.json();
                })

                .then((data) => {
                    let cart__items = document.querySelector("#cart__items");
                    cart__items.innerHTML += `<article class="cart__item" data-id="${addCart[i].id}" data-color="${addCart[i].colors}">
                                                                    <div class="cart__item__img">
                                                                        <img src="${data.imageUrl}" alt="${data.txtAlt}">
                                                                    </div>
                                                                    <div class="cart__item__content">
                                                                    <div class="cart__item__content__description">
                                                                        <h2>${data.name}</h2>
                                                                        <p>${addCart[i].color}</p>
                                                                        <p>${data.price}€</p>
                                                                    </div>
                                                                    <div class="cart__item__content__settings">
                                                                        <div class="cart__item__content__settings__quantity">
                                                                            <p>Qté : ${addCart[i].quantity} </p>
                                                                            <input type="number" data-id="${addCart[i]._id}" data-color="${addCart[i].color}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1">
                                                                        </div>
                                                                        <div class="cart__item__content__settings__delete">
                                                                            <p class="deleteItem" data-id="${addCart[i]._id}" data-color="${addCart[i].color}">Supprimer</p>
                                                                        </div>
                                                                    </div>
                                                            </article>`;
                                                                    
  
//Problème survenu à régler
 let price = data.price;


    //Le prix total des produits
  totalPrice = 0;
  totalPrice += addCart[i].quantity * price;
  console.log("totalPrice =" + addCart[i].quantity + "x" + price ) 
  document.getElementById("totalPrice").innerText = totalPrice;
    


                                                                    
                                                                    totalQuantity();

                })
        }



    }
}

cartAppear();



function totalQuantity() {
    totalCartQuantity = 0;
    
    for (var i in addCart) {

        
        // La quantité totale des produits
        totalCartQuantity += addCart[i].quantity;
        console.log("TOTAL ARTICLES", totalCartQuantity)
        localStorage.setItem("TOTAL ARTICLES", JSON.stringify(totalCartQuantity));
        document.getElementById("totalQuantity").innerText = totalCartQuantity;

      
    }
}








// ___________________________________________GESTION DU FORMULAIRE__________________________________________
// Donner des variables aux input

function validateForm() {
    //LES REGEX//
    let regexPrenom = /^[a-zA-Z\-\‘]+$/;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    // selection des balises du formulaire 
    const formFirstName = document.querySelector('#firstName');
    const formLastName = document.querySelector('#lastName');
    const formAddress = document.querySelector('#address');
    const formCity = document.querySelector('#city');
    const formEmail = document.querySelector('#email');

    // Vérification du prénom 

    formFirstName.addEventListener('change', (e) => {
        e.preventDefault();
        if (regexPrenom.test(formFirstName.value)) {
            document.querySelector('#firstNameErrorMsg').innerHTML = ' ';
            console.log("test")
        } else {
            document.querySelector('#firstNameErrorMsg').innerHTML = 'Prénom non valide';
        }
    });

    // Vérification du nom

    formLastName.addEventListener('change', (e) => {
        e.preventDefault();
        if (regexPrenom.test(formLastName.value)) {
            document.querySelector('#lastNameErrorMsg').innerHTML = ' ';
        } else {
            document.querySelector('#lastNameErrorMsg').innerHTML = 'Nom non valide';
        }
    });

    // Vérificationde l'adresse 

    formAddress.addEventListener('change', (e) => {
        e.preventDefault();
        if (regexPrenom.test(formAddress.value)) {
            document.querySelector('#addressErrorMsg').innerHTML = '';
        } else {
            document.querySelector('#addressErrorMsg').innerHTML = 'Ville non valide.';
        }

    })


    // Vérification de la ville 

    formCity.addEventListener('change', (e) => {
        e.preventDefault();
        if (regexPrenom.test(formCity.value)) {
            document.querySelector('#cityErrorMsg').innerHTML = ' ';
        } else {
            document.querySelector('#cityErrorMsg').innerHTML = 'Ville non valide';
        }
    });

    // Vérification de l'email 

    formEmail.addEventListener('change', (e) => {
        e.preventDefault();
        if (regexEmail.test(formEmail.value)) {
            document.querySelector('#emailErrorMsg').innerHTML = ' ';
            console.log("email valide")
        } else {
            document.querySelector('#emailErrorMsg').innerHTML = `un email valide est : unnom@monfournisseur.com`;
        }
    })


}

function sendToBackEnd() {

    //Récupérer le formulaire
    let orderForm = document.querySelector('.cart__order__form');
    
// selection des balises du formulaire 
const formFirstName = document.querySelector('#firstName');
const formLastName = document.querySelector('#lastName');
const formAddress = document.querySelector('#address');
const formCity = document.querySelector('#city');
const formEmail = document.querySelector('#email');

    orderForm.addEventListener('click', (e) => {
        e.preventDefault();
        validateForm();
        // vérifier que tout les forms sont bon
        if (validateForm) {
            let productID = [];
            // Récupere l'ID des produits et création d'un array
            for (i = 0; i < addCart.length; i++) {
                productID.push(addCart[i].id)
            }
            console.log(productID);

            const order = {
                contact: {
                    firstName: formFirstName.value,
                    lastName: formLastName.value,
                    address: formAddress.value,
                    city: formCity.value,
                    email: formEmail.value,
                },
                products: productID,
            }

            //server request method's
            const options = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
            }; 


            fetch("http://localhost:3000/api/products/order", options)
            .then((res) => Response.json())
            .then((data) => {
                localStorage.clear();
                document.location.href = `confirmation.html?id=${data.orderId}`;
            })
        }
    })

}

sendToBackEnd();