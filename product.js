const productId = window.location.search.substr(1);
const btnBack = document.getElementById('btnBack');
const btnAdd = document.getElementById('btnAdd');
const select = document.getElementById('select');
const quantity = document.getElementById('quantity');

main(); 

async function main() {
    const product = await getProducts();

    console.log(productId);
    displayPages(product);
}

btnBack.addEventListener('click', (e) =>  {
    window.location.href="./index.html"; 
    e.preventDefault()
})

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
    const name = document.getElementById('name'); 
    const img = document.getElementById('img'); 
    const description = document.getElementById('sup'); 
    const price = document.getElementById('price'); 

    name.textContent = product.name; 
    img.src = product.imageUrl; 
    img.alt = 'image du '+product.name; 
    description.innerHTML = product.description;  
    price.textContent = `${product.price / 100}.00 €`; 

    product.lenses.forEach(objectif => {
        let option = document.createElement("option"); 
        option.value = objectif; 
        option.textContent = objectif;
        let newOption = select.appendChild(option); 
    });
}