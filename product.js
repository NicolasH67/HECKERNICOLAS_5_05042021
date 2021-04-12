main(); 

async function main() {
    const products = await getProducts();
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

