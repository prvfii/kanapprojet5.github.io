let url = "http://localhost:3000/api/products";


fetch(url)
        .then(Response => Response.json())
        .then((data) => {
            
            console.log(data);    
        })
        .catch(err => console.log("Une erreur a été détectée."));





const displayKanap = async () => {


    
    document.getElementById("items").innerHTML = `<a href="${[0]._id}"><article>
    <img src="${data[0].imageUrl}" alt="">
    <h3 class="productName">${[0].name}</h3>
    <p>Excepteur sint occaecat …it anim id est laborum.</p>
  </article></a>`
  
};

displayKanap();