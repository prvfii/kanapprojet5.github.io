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

        for (let item of addCart) {
            fetch(`http://localhost:3000/api/products/${item.id}`)
                .then((res) => {
                    return res.json();
                })

                .then((data) => {
                    createCart(item.id, item.color, data.imageUrl, data.altTxt, data.name, data.price, item.quantity, item);



                    //Problème survenu à régler
                    let price = data.price;


                    // changeQuantity(i);
                    totalQuantity();
                    totalPrices(item, price);


                })
        }



    }
}
cartAppear();


function createCart(id, color, chemin, altImg, nom, prix, quantity, item) {
    let cart__items = document.getElementById("cart__items");
    let article = document.createElement("article");
    article.className = "cart__item";
    article.setAttribute("data-id", id);
    article.setAttribute("data-color", color);

    let cart__item__img = document.createElement("div");
    cart__item__img.className = "cart__item__img";

    let img = document.createElement("img");
    img.setAttribute("src", chemin);
    img.setAttribute("alt", altImg);
    cart__item__img.appendChild(img);
    article.appendChild(cart__item__img);

    let cart__item__content = document.createElement("div");
    cart__item__content.className = "cart__item__content";

    let cart__item__content__description = document.createElement("div");
    cart__item__content__description.className = "cart__item__content__description";

    let name = document.createElement("h2");
    name.innerText = nom;
    let couleur = document.createElement("p");
    couleur.innerText = color;
    let price = document.createElement("p");
    price.innerText = prix + "€";
    cart__item__content__description.appendChild(name);
    cart__item__content__description.appendChild(couleur);
    cart__item__content__description.appendChild(price);
    cart__item__content.appendChild(cart__item__content__description);

    let cart__item__content__settings = document.createElement("div");
    cart__item__content__settings.className = "cart__item__content__settings";

    let cart__item__content__settings__quantity = document.createElement("div");
    cart__item__content__settings__quantity.className = "cart__item__content__settings__quantity";

    let paragraph = document.createElement("p");
    paragraph.innerText = "Qté :  " + quantity;

    let itemQuantity = document.createElement("input");
    itemQuantity.setAttribute("type", "number");
    itemQuantity.className = "itemQuantity";
    itemQuantity.setAttribute("name", "itemQuantity");
    itemQuantity.setAttribute("min", "1");
    itemQuantity.setAttribute("max", "100");
    itemQuantity.setAttribute("value", quantity);
    itemQuantity.addEventListener("change", () => {

        // Modification d'une quantité de produit

        quantity = itemQuantity.value;
        item.quantity = quantity;
        console.log(item.quantity)
        let index = addCart.indexOf(item);
        totalPrice = 0;
        if (index > -1) {
            addCart.splice(index, 1);
            addCart.push(item);
            window.localStorage.setItem("produit", JSON.stringify(addCart));
            totalPrices(item, prix)
            
            paragraph.innerText = "Qté :  " + quantity;
        }
       
        
       
        


    })

    cart__item__content__settings__quantity.appendChild(paragraph);
    cart__item__content__settings__quantity.appendChild(itemQuantity);

    cart__item__content__settings.appendChild(cart__item__content__settings__quantity);



    let cart__item__content__settings__delete = document.createElement("div");
    cart__item__content__settings__delete.className = "cart__item__content__settings__delete";

    let supp = document.createElement("p");
    supp.className = "deleteItem";
    supp.innerText = "Supprimer";
    //Fonction pour supprimer un article
    supp.addEventListener("click", () => {
        console.log(id);
        let index = addCart.indexOf(item);
        if (index >-1) {
            addCart.splice(index, 1);
            window.localStorage.setItem("produit", JSON.stringify(addCart));
            cart__items.removeChild(article);
            totalPrices(item, (prix * -1))
            totalQuantity()
            location.reload()
        }
    });

    cart__item__content__settings__delete.appendChild(supp);
    cart__item__content__settings.appendChild(cart__item__content__settings__delete);

    cart__item__content.appendChild(cart__item__content__settings);

    article.appendChild(cart__item__content)

    cart__items.appendChild(article);





}





function totalQuantity() {
    totalCartQuantity = 0;

    for (var i in addCart) {


        // La quantité totale des produits
        totalCartQuantity += parseInt(addCart[i].quantity);
        console.log("TOTAL ARTICLES", totalCartQuantity)



    } document.getElementById("totalQuantity").innerText = totalCartQuantity;
}
totalPrice = 0;
function totalPrices(item, price) {

    //Le prix total des produits
    

    totalPrice += item.quantity * price;
    console.log(totalPrice)


    console.log("totalPrice =" + item.quantity + "x" + price)
    document.getElementById("totalPrice").innerText = totalPrice;



}


















// ___________________________________________GESTION DU FORMULAIRE__________________________________________
// Donner des variables aux input

function validateForm() {
    validate = false;
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


    if (regexPrenom.test(formFirstName.value)) {
        validate = true;

        document.querySelector('#firstNameErrorMsg').innerHTML = ' ';
        console.log("test")
    } else {
        validate = false;

        document.querySelector('#firstNameErrorMsg').innerHTML = 'Prénom non valide';
    }


    // Vérification du nom



    if (regexPrenom.test(formLastName.value)) {
        validate = true;

        document.querySelector('#lastNameErrorMsg').innerHTML = ' ';
    } else {
        validate = false;

        document.querySelector('#lastNameErrorMsg').innerHTML = 'Nom non valide';
    }


    // Vérificationde l'adresse 


    if (regexPrenom.test(formAddress.value)) {
        validate = true;

        document.querySelector('#addressErrorMsg').innerHTML = '';
    } else {
        validate = false;

        document.querySelector('#addressErrorMsg').innerHTML = 'Ville non valide.';
    }




    // Vérification de la ville 


    if (regexPrenom.test(formCity.value)) {
        validate = true;

        document.querySelector('#cityErrorMsg').innerHTML = ' ';
    } else {
        validate = false;

        document.querySelector('#cityErrorMsg').innerHTML = 'Ville non valide';
    }

    // Vérification de l'email 


    if (regexEmail.test(formEmail.value)) {
        validate = true;

        document.querySelector('#emailErrorMsg').innerHTML = ' ';
        console.log("email valide")
    } else {
        validate = false;

        document.querySelector('#emailErrorMsg').innerHTML = `un email valide est : unnom@monfournisseur.com`;
    }

    return validate;

}

function sendToBackEnd() {

    //Récupérer le formulaire

    let order = document.getElementById('order');

    // selection des balises du formulaire 
    const formFirstName = document.querySelector('#firstName');
    const formLastName = document.querySelector('#lastName');
    const formAddress = document.querySelector('#address');
    const formCity = document.querySelector('#city');
    const formEmail = document.querySelector('#email');

    order.addEventListener('click', (e) => {
        e.preventDefault();
        const valid = validateForm();
        console.log(valid)
        // vérifier que tout les forms sont bon
        if (valid) {
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

            const { contact, products } = order;
            //server request method's
            const options = {
                method: 'POST',
                body: JSON.stringify({ contact, products }),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
            };


            fetch("http://localhost:3000/api/products/order", options)
                .then((res) => res.json())
                .then((data) => {
                    localStorage.clear();
                    document.location.href = `confirmation.html?id=${data.orderId}`;
                })
        }
    })

}

sendToBackEnd();