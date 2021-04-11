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
    return fetch('http://localhost:3000/api/cameras')
    .then((httpBodyResponse) => httpBodyResponse.json())
    .catch((error) => {
        alert(
            "la connexion au serveur n'a pas pu être effectué"
            )
        })
    }; 
    
function displayPages(product) {
    // Clonage du template 
    const articles = document.querySelector('#articles'); 
    const cloneElt = document.importNode(templateElt.content, true); 
        
    console.log(product);
    console.log(product.imageUrl);
    console.log(product.name);
    console.log(product.price);
    console.log(product._id);

    cloneElt.getElementById('object-img').src = product.imageUrl;
    cloneElt.getElementById('object-img').alt = 'image du '+product.name;
    cloneElt.getElementById('object-title').textContent = product.name;
    cloneElt.getElementById('object-price').textContent = `${product.price / 100}.00 €`;
    cloneElt.getElementById('object-link').href = `/products.html?id=${product._id}`;
        
    console.log(cloneElt); 

    var newObject = articles.appendChild(cloneElt)

}