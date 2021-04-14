// Event go basket.html

const basket = document.getElementById('icon-nav'); 

basket.addEventListener('click', (e) =>  {
    window.location.href="./basket.html"; 
    e.preventDefault()
})

// Recovery info 

btnAdd.addEventListener('click', function e() {
    let id = window.location.search.substr(1);
    let objectif = select.value; 
    let selectQuantity = quantity.value; 
})