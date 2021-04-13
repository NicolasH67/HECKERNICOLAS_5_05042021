const productId = window.location.search.substr(1);

main(); 

async function main() {
    const product = await getProducts();

    console.log(productId)
    displayPages(product)
}


async function getProducts() {

    // get Api
    return fetch('http://localhost:3000/api/cameras/${productId}')
        .then((httpBodyResponse) => httpBodyResponse.json())
        .catch((error) => {
            alert(
                "la connexion au serveur n'a pas pu être effectué"
            )
        })
};

function displayPages(product) {
    const name = document.getElementById('name'); 
    const img = document.getElementById('img'); 
    const description = document.getElementById('sup'); 
    const price = document.getElementById('price'); 

    name.textContent = product.name; 
    img.textContent = product.imageUrl; 
    description.textContent = product.description; 
    price.textContent = product.price; 

}