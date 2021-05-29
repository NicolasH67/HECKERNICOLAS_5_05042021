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
let priceArray = []
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
    e.preventDefault(); 
    let nom = document.getElementById('nom').value
    let prenom = document.getElementById('prenom').value
    let email = document.getElementById('email').value
    let telephon = document.getElementById('telephon').value
    let adresse = document.getElementById('adresse').value
    let codePostal = document.getElementById('codePostal').value
    let ville = document.getElementById('ville').value

    // regex
    const regexnom = /^[A-z\s\-]{2,}$/;
    const regexprenom = /^[A-z\s\-]{2,}$/;
    const regexmail = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}/;
    const regexphone = /^[0-9]{10}$/;
    const regexadresse = /^\w{1,}/;
    const regexzipcode = /^[0-9]{5}$/;
    const regexcity = /^[A-z\-]{1,}/;

    if (regexnom.test(nom) == false) {
        window.alert("Votre nom n'est pas valide, les caractères autorisés sont : les majuscules, les minuscules, les espaces et les -. Ce champ est requis")
    } else if (regexprenom.test(prenom) == false){
        window.alert("Votre prénom n'est pas valide, les caractères autorisés sont : les majuscules, les minuscules et les -. Ce champ est requis")
    } else if (regexmail.test(email) == false){
        window.alert("Votre email n'est pas valide, le format autaurisé est : mail@mail.fr. Ce champ est requis")
    } else if (regexphone.test(telephon) == false){
        window.alert("Votre numéro de téléphone n'est pas valide, le format est 10 chiffres. Ce champ est requis")
    }else if (regexadresse.test(adresse) == false) {
        window.alert("Votre addresse n'est pas valide, le format est (12 rue de paris). Ce champ est requis")
    } else if (regexzipcode.test(codePostal) == false) {
        alert("Votre code postal n'est pas valide, il doit contenire 5 chiffres. Ce champ est requis")
    } else if (regexcity.test(ville) == false) {
        alert(
            "Votre ville n'est pas valide, les caractères autorisés sont : Les majuscules, les minuscules et les -. Ce champ est requis")
    } else {
        localStorage.removeItem("contact")
        let contact = [nom, prenom, email, telephon, adresse, codePostal, ville]
        let JSONcontact = JSON.stringify(contact)
        localStorage.setItem("contact", JSONcontact)
    
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const lstotalPrice = priceArray.reduce(reducer)
    
        localStorage.removeItem("totalPrice")
        localStorage.setItem("totalPrice", lstotalPrice)
        console.log(localStorage.getItem("totalPrice"))
        window.location.href = "./order.html"
    }
})