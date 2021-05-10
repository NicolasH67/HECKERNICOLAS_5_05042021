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
const priceArray = []
console.log(priceArray)

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
console.log(localStorage.length)

if (localStorage.length == 0) {
    sectionBasket.innerHTML = '<h2 class="text-danger fst-italic">Votre panier est vide</h2>'
} 
else {
    for (var i = 0; i < localStorage.length; i++) {
        const productId = localStorage.key(i)
        const product = JSON.parse(localStorage.getItem(productId))
        console.log(product)
        const selectObjectif = product[0]
        const selectQuantity = product[1]
        console.log(selectObjectif, selectQuantity)
        const templateElt = document.getElementById('template-basket');
        
        main()
        
        async function main() {
            const completProduct = await getProducts()
            displayPages(completProduct)
            const sectionPriceTotal = document.getElementById('totalPrice')
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const totalPrice = priceArray.reduce(reducer)
            sectionPriceTotal.textContent = `${totalPrice / 100},00 €`
        }
    
        async function getProducts() {
    
        // get Api
        return fetch(`http://localhost:3000/api/cameras/${productId}`)
            .then((httpBodyResponse) => httpBodyResponse.json())
            .catch((error) => {
                alert(
                    "la connexion au serveur n'a pas pu être effectué"
                )
            })
        };
    
        function displayPages(product) {
                
            // clone template 
            const cloneElt = document.importNode(templateElt.content, true); 
        
            // displayPage
            cloneElt.getElementById('name').textContent = product.name;
            cloneElt.getElementById('price').id = `price${product._id}`;
            cloneElt.getElementById('select-basket').id = `select-basket${product._id}`;
            cloneElt.getElementById('quantity-basket').id = `quantity-basket${product._id}`;
            cloneElt.getElementById('delete').id = `delete${product._id}`;
            cloneElt.getElementById('modif').id = `modif${product._id}`;
        
            // display in page 
        
            const articles = document.getElementById('div-basket'); 
            let newObject = articles.appendChild(cloneElt)
    
            const selectBasket = document.getElementById(`select-basket${product._id}`)
            const quantity = document.getElementById(`quantity-basket${product._id}`)
            product.lenses.forEach(objectif => {
                let option = document.createElement("option"); 
                option.value = objectif; 
                option.textContent = objectif;
                let newOption = selectBasket.appendChild(option); 
            });
    
            selectBasket.value = selectObjectif; 
            quantity.value = selectQuantity; 
            
            const sectionPrice = document.getElementById(`price${product._id}`)
            const price = quantity.value * product.price
            console.log(price)
            sectionPrice.textContent = `${price / 100},00€`
            priceArray.push(price)

            const btnDelete = document.getElementById(`delete${product._id}`)
            const btnModif = document.getElementById(`modif${product._id}`)

            btnDelete.addEventListener('click', (e) => {
                e.preventDefault()
                console.log(productId)
                localStorage.removeItem(productId)
                window.location.href = "./basket.html"
            })
            btnModif.addEventListener('click', (e) => {
                e.preventDefault()
                console.log(productId)
                const newQuantity = document.getElementById(`quantity-basket${product._id}`)
                const newOption = document.getElementById(`select-basket${product._id}`)
                let selectOption = [newOption.value, newQuantity.value]
                console.log(selectOption)
                localStorage.removeItem(productId)
            
                //----- localStorage add element ------------
                
                let JSONarray = JSON.stringify(selectOption)
                localStorage.setItem(`${productId}`, JSONarray)
                window.location.href = "./basket.html"
            })
        }
    }
}

// -------------------  btnCommande function ------------------------------


btnCommande.addEventListener('click', (e) =>{
    const nom = document.getElementById('nom').value
    const prenom = document.getElementById('prenom').value
    const email = document.getElementById('email').value
    const telephon = document.getElementById('telephon').value
    const adresse = document.getElementById('adresse').value
    const codePostal = document.getElementById('codePostal').value
    const ville = document.getElementById('ville').value
    
    localStorage.removeItem("contact")
    let contact = [nom, prenom, email, telephon, adresse, codePostal, ville]
    let JSONcontact = JSON.stringify(contact)
    localStorage.setItem("contact", JSONcontact)

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const lstotalPrice = priceArray.reduce(reducer)

    localStorage.removeItem("totalPrice")
    localStorage.setItem("totalPrice", lstotalPrice)
    console.log(localStorage.getItem("totalPrice"))
})