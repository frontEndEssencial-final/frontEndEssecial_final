const sectionProdutos = document.querySelector('.produtos')

const getProducts = async () => {
    const response = await fetch('../json/comidas_brasileiras.json')
    const data = await response.json()
    return data
}

const generateCard = async () => {
    const products = await getProducts()
    const listaProdutos = document.querySelector('.lista__produtos')
    listaProdutos.classList.add('card-grid') // Mover o grid para cá
    products.forEach(product => {
        let card = document.createElement('div')
        card.id = product.id
        card.classList.add('card__produto')
        card.innerHTML = `
            <div class="card">
                <img src="${product.imagem}" alt="${product.nome}" />
                <h2>${product.nome}</h2>
                <p>${product.descricao}</p>
                <button class="botao" onclick="alert('Adicionado com Sucesso!')">Adicionar</button>
            </div>
        `
        listaProdutos.appendChild(card)
        preencherCard(card, products)
    })
}


generateCard()
const preencherCard = (card, products) => {
    card.addEventListener('click', (e) => {
        ocultarElemento(sectionProdutos)
        mostrarElemento(botaoVoltar)
        mostrarElemento(sectionDetalhesProduto, 'grid')
        const cardClicado = e.currentTarget
        const idProduto = cardClicado.id
        const produtoClicado = products.find(product => product.id == idProduto)
        preencherDadosProduto(produtoClicado)
    })

}