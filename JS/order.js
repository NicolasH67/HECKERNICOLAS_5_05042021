const contactElt = document.getElementById('contact')

main()

async function main() {
    displayContactElt()
}

function displayContactElt() {

    // function pour afficher les éléments de contact
    
    const contact = JSON.parse(localStorage.getItem("contact"))
    const lastName = contact[0]
    const firstName = contact[1]
    const mail = contact[2]
    const phoneNumber = contact[3]
    const address = contact[4]
    const zipCode = contact[5]
    const city = contact[6]
    const commandNumber = Math.floor(Math.random() * 100000000);
    console.log(contact)
    contactElt.innerHTML = `   

    <div>
        <h2 class="h2 text-success fw-bolder">Merci pour votre Commande M(me)<span class="text-uppercase">${lastName} ${firstName}</span></h2>
        <p>Votre numéro de commande : <span class="fw-bolder">${commandNumber}</span></p>
        <p>Votre adresse : <br />${address}<br />${zipCode} ${city}</p>
        <p>Vos coordonnée :<br />Téléphone : ${phoneNumber}<br />Mail : ${mail}</p>
    </div>`

    // function pour afficher le prix total
    const sectionTotalPrice = document.getElementById('totalPrice')
    const totalPrice = JSON.parse(localStorage.getItem("totalPrice"))
    sectionTotalPrice.textContent =  `${totalPrice / 100},00 €`
    
    // function pour supprimer les éléments qui ne sont pas des article 
    localStorage.removeItem("contact")
    localStorage.removeItem("totalPrice")
    for (var i = 0; i < localStorage.length; i++) {
        const productId = localStorage.key(i)
        const product = JSON.parse(localStorage.getItem(productId))
        console.log(product)
        const selectObjectif = product[0]
        const selectQuantity = product[1]
        console.log(selectObjectif, selectQuantity)
        const templateElt = document.getElementById('templateOrder');
        
        mainDisplayProduct()
        
        async function mainDisplayProduct() {
            const completProduct = await getProducts()
            displayPages(completProduct)
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
            cloneElt.getElementById('objectif').textContent = selectObjectif;
            cloneElt.getElementById('quantity').textContent = selectQuantity;
            cloneElt.getElementById('price').textContent = `${product.price * selectQuantity / 100},00€`;
        
            // display in page 
        
            const articles = document.getElementById('product'); 
            let newObject = articles.appendChild(cloneElt)
    
        }
    }
    
}
