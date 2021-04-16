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


if (produitLocalStorage === null) {
    sectionBasket.innerHTML = '<div class="empty-basket"><p class="h2 text-danger font-italic">Votre Panier est vide </p></div>'
} 
else {
    
    for (let i = 0; i < produitLocalStorage.length; i++) {
        const product = produitLocalStorage[i];
        console.log(product);
        const productId = product[0];
        console.log(productId);
        const productObjectif = product[1];
        const productQuantity = product[2];
        
        main()

        async function main() {
            const completeProduct = await getProduct()
            console.log(completeProduct)
            displayPages(completeProduct)
        }

        async function getProduct() {
            return fetch(`http://localhost:3000/api/cameras/${productId}`)
            .then((httpBodyResponse) => httpBodyResponse.json())
            .catch((error) => {
                alert(
                    "la connexion au serveur n'a pas pu être effectué"
                )
            }); 
        }

        
        function displayPages(product) {
            const templateElt = document.getElementById('template-basket')
            // clone template 
            const cloneElt = document.importNode(templateElt.content, true); 
    
            // displayPage
            cloneElt.getElementById('name').textContent = product.name;
    
            // display in page 
    
            const basket = document.getElementById('div-basket'); 
            let newObject = basket.appendChild(cloneElt)

       }
    }

}