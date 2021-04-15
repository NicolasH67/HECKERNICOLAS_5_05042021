// Event go basket.html

const basket = document.getElementById('icon-nav'); 

basket.addEventListener('click', (e) =>  {
    window.location.href="./basket.html"; 
    e.preventDefault()
})

// Recovery info 

btnAdd.addEventListener('click', function e() {
    const id = window.location.search.substr(1);
    const objectif = select.value; 
    const selectQuantity = quantity.value; 
    let optionProduit= [id, objectif, selectQuantity]

    //----- localStorage add element ------------
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit")); 
    
    console.log(produitLocalStorage); 
    
    if (produitLocalStorage) {
        produitLocalStorage.push(optionProduit); 
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage)); 
        console.log(produitLocalStorage); 
        
    } 
    else {
        produitLocalStorage = []; 
        produitLocalStorage.push(optionProduit); 
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage)); 
        console.log(produitLocalStorage); 
    }
    
})
