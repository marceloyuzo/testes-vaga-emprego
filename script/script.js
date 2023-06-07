let productsHTML = document.querySelector('.productsLine')
let req = new XMLHttpRequest()
let buttonMoreProducts = document.getElementById('buttonMoreProducts')

req.open('GET', 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1')
req.send()

req.onload = carregarProdutos

function carregarProdutos() {
    if(req.status === 200) {
        let produtos = JSON.parse(req.response)
        
        for(let i=0; i<=7; i++) {
            productsHTML.innerHTML += `
            <div class="products" id="product${produtos.products[i].id}">
                <div class="imageProduct">
                    <img src="${produtos.products[i].image}" alt="">
                </div>
                <span class="nameProduct">${produtos.products[i].name}</span>
                <span class="descriptionProduct">${produtos.products[i].description}</span>
                <span class="valueProduct">De: R$${produtos.products[i].oldPrice}</span>
                <span class="promotionValue">Por: R$${produtos.products[i].price}</span>
                <span class="otherValue">ou ${produtos.products[i].installments.count}x de R$${produtos.products[i].installments.value}</span>
    
                <button class="buy">Comprar</button>
            </div>
            `
        }

        buttonMoreProducts.addEventListener('click', carregarProximaPagina)
    }
}

function carregarProximaPagina() {
    
    let produtos = JSON.parse(req.response)
    console.log(produtos.nextPage)
    req.open('GET', `https://${produtos.nextPage}`)
    req.send()

    req.onload = carregarProdutos
}