// Récuperer l'url de la page

const urlPage = window.location.href;

// Nouvel objet url 

const url = new URL(urlPage)

// Récuperer l'id

const urlId = url.searchParams.get("orderId");


document.getElementById("orderId").innerHTML = urlId;