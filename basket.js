//------------ Event go basket.html --------------

const basket = document.getElementById('icon-nav'); 

basket.addEventListener('click', (e) =>  {
    window.location.href="./basket.html"; 
    e.preventDefault()
})

//----------------- basket.html --------------------

const btnHome = document.getElementById('btnHome'); 
const btnClear = document.getElementById('btnClear'); 
const btnCommande = document.getElementById('btnCommande'); 

btnHome.addEventListener('click', (e) =>  {
    window.location.href="./index.html"; 
    e.preventDefault()
})

btnClear.addEventListener('click', (e) =>  {
    localStorage.clear()
    e.preventDefault()
    sectionBasket.innerHTML = '<div class="empty-basket"><p class="h2 text-danger font-italic">Votre Panier est vide </p></div>'

})

btnCommande.addEventListener('click', (e) =>  {
    window.location.href="./orderConfirm.html"; 
    e.preventDefault()
})

//----------------display basket ---------------
const sectionBasket = document.getElementById('div-basket'); 
let produitLocalStorage = JSON.parse(localStorage.getItem("produit")); 


console.log(produitLocalStorage)
if (produitLocalStorage === null) {
    sectionBasket.innerHTML = '<div class="empty-basket"><p class="h2 text-danger font-italic">Votre Panier est vide </p></div>'
} 
else {
    console.log(localStorage)
}