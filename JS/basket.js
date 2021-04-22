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
const price = []

btnHome.addEventListener('click', (e) =>  {
    window.location.href="./index.html"; 
    e.preventDefault()
})

btnClear.addEventListener('click', (e) =>  {
    localStorage.clear()
    e.preventDefault()
    window.location.href = "./basket.html"

})

//----------------display basket ---------------
const sectionBasket = document.getElementById('div-basket'); 
let produitLocalStorage = JSON.parse(localStorage.getItem("produit")); 
console.log(produitLocalStorage)


if (produitLocalStorage === null) {
    sectionBasket.innerHTML = '<div class="empty-basket"><p class="h2 text-danger font-italic">Votre Panier est vide </p></div>'
} 
else {
    for (let i = 0; i < produitLocalStorage.length; i++) {
        const product = produitLocalStorage[i];
        const productId = product[0];
        const productObjectif = product[1];
        const productQuantity = product[2];
        
        main()
        
        async function main() {
            const completeProduct = await getProduct()
            displayPages(completeProduct)
            
            const quantityBasket = document.getElementById(`quantity-basket${completeProduct._id}`); 
            quantityBasket.value = productQuantity;
            
            // ----------------- function Prix total -----------------------------
            
            const sectionPrice = document.getElementById(`price${completeProduct._id}`); 
            const sectionPriceQuantity = document.getElementById(`quantity-basket${completeProduct._id}`)
            const productPrice = completeProduct.price
            const finalPrice = sectionPriceQuantity.value * productPrice
            sectionPrice.textContent = `Prix : ${finalPrice / 100},00€`
            price.push(finalPrice)
            const reducer = (accumulator, currentValue) => accumulator + currentValue; 
            const totalPrice = price.reduce(reducer); 
            document.getElementById('totalPrice').textContent = `${totalPrice / 100},00€`
            
            // ------------------- end function -------------------------------------
            
            completeProduct.lenses.forEach(objectif => {
                let option = document.createElement("option"); 
                option.value = objectif; 
                option.textContent = objectif;
                const selectBasket = document.getElementById(`select-basket${completeProduct._id}`)
                
                let newOption = selectBasket.appendChild(option);
                
                // select value 
                selectBasket.value = productObjectif; 
                
            }); 
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
                // clone template 
                const templateElt = document.getElementById('template-basket')
                const cloneElt = document.importNode(templateElt.content, true); 
                
                // displayPage
                cloneElt.getElementById('article').id = `article${product._id}`;
                cloneElt.getElementById('name').textContent = product.name;
                cloneElt.getElementById('select-basket').id = `select-basket${product._id}`;
                cloneElt.getElementById('quantity-basket').id = `quantity-basket${product._id}`;
                cloneElt.getElementById('price').id = `price${product._id}`
                cloneElt.getElementById('delete').id = `delete${product._id}`
                
                // display in page 
                
                const basket = document.getElementById('div-basket'); 
                let newObject = basket.appendChild(cloneElt)

                const btnDelete = document.getElementById(`delete${product._id}`); 
                btnDelete.addEventListener('click', (e) => {
                    e.preventDefault()
                    const product = produitLocalStorage[i];
                    console.log(product); 
                    deleteItems(i)

                    function deleteItems(i) {
                        console.log(i)
                        localStorage.removeItem(i)
                        console.log(produitLocalStorage)
                        console.log(localStorage.getItem(product._id))
                    }
                })
                
            }
    }    
}

