const templateElt = document.getElementById('template');

main(); 

async function main() {
    const products = await getProducts();
    console.log(products);
    
    products.forEach(product => {
        displayPages(product); 
    });
}

async function getProducts() {

    // get Api
    return fetch('http://localhost:3000/api/cameras')
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
    cloneElt.getElementById('object-img').src = product.imageUrl;
    cloneElt.getElementById('object-img').alt = 'image du '+product.name;
    cloneElt.getElementById('object-title').textContent = product.name;
    cloneElt.getElementById('object-price').textContent = `${product.price / 100}.00 €`;
    cloneElt.getElementById('object-link').href = `./product.html?${product._id}`;
    
    // display in page 
    
    const articles = document.getElementById('articles'); 
    var newObject = articles.appendChild(cloneElt)
}
