const sectionCarrinho = document.querySelector(".carrinho");
const sectionPagamento = document.querySelector(".pagamento");
const listaProdutos = document.querySelector(".lista__produtos");
const corpoTabela = document.querySelector(".carrinho tbody");
const colunaTotal = document.querySelector(".coluna_total");
const spanSubTotal = document.querySelector(".sub_total");
const spanFrete = document.querySelector(".valor_frete");
const spanDesconto = document.querySelector(".valor_desconto");
const spanTotalCompra = document.querySelector(".total_compra");
const btnCarrinho = document.querySelector(".btn_carrinho");
const btnVoltar = document.querySelector(".voltar");
const btnCalcularFrete = document.querySelector(".btn_calcular");
const btnAplicarCupom = document.querySelector(".btn_aplicar");
const btnContinuar = document.querySelector(".btn_continuar");
const btnFinalizarCompra = document.querySelector(".btn_finalizar_compra");
const inputCupom = document.getElementById("cupom");
const progressBar = document.getElementById("progress-bar");

let cart = [];
let valorFrete = 0;
let valorDesconto = 0;

const getProducts = async () => {
  const response = await fetch("../json/comidas_brasileiras.json");
  const data = await response.json();
  return data;
};

const generateCard = async () => {
  const products = await getProducts();
  listaProdutos.classList.add("card-grid");
  products.forEach((product) => {
    let card = document.createElement("div");
    card.id = product.id;
    card.classList.add("card__produto");
    card.innerHTML = `
            <div class="card">
                <img src="${product.imagem}" alt="${product.nome}" />
                <h2>${product.nome}</h2>
                <p>${product.descricao}</p>
                <span><strong>R$ ${product.preco.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}</strong></span>
                <button class="botao-add-carrinho" data-id="${
                  product.id
                }">Adicionar</button>
            </div>
        `;
    listaProdutos.appendChild(card);
  });
};

// CARRINHO

// Add Carrinho
const addCarrinho = async (productId) => {
  const products = await getProducts();
  const produtoAdicionado = products.find((product) => product.id == productId);
  if (produtoAdicionado) {
    const itemExistente = cart.find((item) => item.id == productId);
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      cart.push({ ...produtoAdicionado, quantidade: 1 });
    }
    atualizarCarrinho();
    atualizarContadorItens();
    alert("Produto adicionado ao carrinho!");
  }
};

// Atualizar
const atualizarCarrinho = () => {
  corpoTabela.innerHTML = "";
  let total = 0;
  cart.forEach((product, index) => {
    const subtotal = product.preco * product.quantidade;
    total += subtotal;
    corpoTabela.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.nome}</td>
                <td>${product.descricao}</td>
                 <td>
                    <input type="number" min="1" value="${
                      product.quantidade
                    }" class="quantity-input" data-index="${index}">
                </td>
                <td>R$ ${subtotal.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}</td>
                <td class='coluna_apagar'>
                    <span class="deletar delete-item" data-index="${index}">
                       X
                    </span>
                </td>
            </tr>
        `;
  });

  colunaTotal.innerHTML = `R$ ${total.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  spanSubTotal.innerHTML = `R$ ${total.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  atualizarTotalCompra();
};

//Atualizar total
const atualizarTotalCompra = () => {
  const subTotal = parseFloat(
    spanSubTotal.innerHTML.replace("R$ ", "").replace(",", ".")
  );
  const totalCompra = subTotal + valorFrete - valorDesconto;
  spanTotalCompra.innerHTML = `R$ ${totalCompra.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// atualizar n itens
const atualizarContadorItens = () => {
  const numeroItens = document.querySelector(".numero_itens");
  const totalItems = cart.reduce((total, item) => total + item.quantidade, 0);
  numeroItens.innerHTML = totalItems;
};

// Remover item do carrinho
const removerCarrinho = (index) => {
  cart.splice(index, 1);
  atualizarCarrinho();
  atualizarContadorItens();
};

// atualizar quantidade
const atualizarQuantidade = (index, newQuantity) => {
  if (newQuantity > 0) {
    cart[index].quantidade = newQuantity;
    atualizarCarrinho();
    atualizarContadorItens();
  } else {
    removerCarrinho(index);
  }
};

// Voltar à lista de produtos
const mostrarListaProdutos= () => {
  listaProdutos.style.display = "grid";
  sectionCarrinho.style.display = "none";
  sectionPagamento.style.display = "none";
  progressBar.style.display = "none";
};

const mostrarCarrinho = () => {
  sectionCarrinho.style.display = "block"
  listaProdutos.style.display = "none";
  sectionPagamento.style.display = "none";
}


const alternarSecoes = (showCart = false, showPayment = false) => {
  listaProdutos.style.display = showCart || showPayment ? "none" : "grid";
  sectionCarrinho.style.display = showCart ? "block" : "none";
  sectionPagamento.style.display = showPayment ? "block" : "none";
};

const calcularFrete = () => {
  valorFrete = 5;
  spanFrete.innerHTML = `R$ ${valorFrete.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  atualizarTotalCompra();
};

const cupomDesconto = () => {
  const couponCode = inputCupom.value.trim();
  if (couponCode === "felipeeshow") {
    const subTotal = parseFloat(
      spanSubTotal.innerHTML
        .replace("R$ ", "")
        .replace(".", "")
        .replace(",", ".")
    );
    valorDesconto = subTotal * 0.1; // 10%
    spanDesconto.innerHTML = `R$ ${valorDesconto.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
    atualizarTotalCompra();
    alert("Cupom aplicado com sucesso!");
  } else {
    alert("Cupom inválido");
  }
};

// Finalizar
const finalizarCompra = (e) => {
  e.preventDefault();
  alert("Compra finalizada com sucesso! Já estamos preparando seu pedido!");
  cart = [];
  atualizarCarrinho();
  atualizarContadorItens();
  alternarSecoes();
};

//----------------------------------------------------------------
listaProdutos.addEventListener("click", (e) => {
  if (e.target.classList.contains("botao-add-carrinho")) {
    const productId = e.target.getAttribute("data-id");
    addCarrinho(productId);
  }
});

corpoTabela.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-item")) {
    const index = e.target.getAttribute("data-index");
    removerCarrinho(index);
  }
});

corpoTabela.addEventListener("change", (e) => {
  if (e.target.classList.contains("quantity-input")) {
    const index = e.target.getAttribute("data-index");
    const newQuantity = parseInt(e.target.value);
    atualizarQuantidade(index, newQuantity);
  }
});

btnCarrinho.addEventListener("click", mostrarCarrinho); //
btnCalcularFrete.addEventListener("click", calcularFrete);
btnAplicarCupom.addEventListener("click", cupomDesconto);
btnContinuar.addEventListener("click", () => alternarSecoes(false, true));
btnFinalizarCompra.addEventListener("click", finalizarCompra);
btnVoltar.addEventListener("click", () => mostrarListaProdutos());

// Iniciar
const init = async () => {
  await generateCard();
  atualizarContadorItens();
  sectionCarrinho.style.display = "none";
  sectionPagamento.style.display = "none";
};

init();
