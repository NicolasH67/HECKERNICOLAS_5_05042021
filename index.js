const objectImg = document.getElementById('object-img');
const objectTitle = document.getElementById('object-title');
const objectPrice = document.getElementById('object-price');
const articles = document.getElementById('articles');
const templateElt = document.getElementById('template');

const cloneElt = document.importNode(templateElt.content, true); 

main(); 

async function main() {
    const products = await getProducts();
    
    displayPages(products); 

}

async function getProducts() {
    return fetch('http://localhost:3000/api/cameras')
        .then((httpBodyResponse) => httpBodyResponse.json())
        .then((products) => products)
        .catch((error) => {
            alert(
                "la connexion au serveur n'a pas pu être effectué"
            )
        })
}; 

function displayPages(products) {
    // Clonage du template 
    console.log(products)
    
    cloneElt.objectImg.src = products.imageUrl;
    cloneElt.objectTitle.textContent = products.name;
    cloneElt.objectPrice.textContent = products.price;
    
    articles.appendChild(cloneElt); 

}