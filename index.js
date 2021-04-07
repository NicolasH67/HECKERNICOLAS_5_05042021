main()

async function main() {
    const objects = await getObjects()

    for (object of objects) {
        displayObject(object)
    }
}

function getObjects() {
    return fetch("http://localhost:3000/api/cameras")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json
        })
        .then(function(objects) {
            return objects
        })
        .catch(function(errror) {
            alert(error)
        })

}

function displayObject(object) {
    const templateElt = document.getElementById("templateObject")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("object-title").textContent = object.name
    cloneElt.getElementById("object-price").textContent = object.price
    cloneElt.getElementById("object-img").textContent = object.imgUrlr

    document.getElementById("object").appendChild(cloneElt)
}