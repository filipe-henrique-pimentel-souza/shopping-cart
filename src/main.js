import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import {
  createCartProductElement,
  createProductElement,
  somarTotal,
} from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// Requisito 4 - Loading durante a requisição dos produtos (RQ3)

const carregarPagina = (produtos) => {
  const elementoCarregando = document.createElement('h1');
  elementoCarregando.innerText = 'Carregando Produtos...';
  elementoCarregando.className = 'loading';
  produtos.appendChild(elementoCarregando);
};

const fimDoCarregamento = (produtos) => {
  const elCarregado = document.querySelector('.products .loading');
  produtos.removeChild(elCarregado);
};

// // Requisito 5 - Tratamento de erros

const exibirErro = () => {
  const deuErro = document.createElement('h1');
  deuErro.innerText = 'Algum erro ocorreu';
  deuErro.className = 'error';
  document.querySelector('.products').appendChild(deuErro);
};

// Requisito 3 - Carregamento dos produtos em section.products

(async () => {
  const produtos = document.querySelector('.products');
  carregarPagina(produtos); // RQ4
  const listarProdutos = await fetchProductsList('computador');
  listarProdutos.forEach((element) => {
    produtos.appendChild(createProductElement(element));
  });
  fimDoCarregamento(produtos);
})().catch(exibirErro); // RQ5

// Requisito 9 - Carregar carrinho do LocalStorage

window.onload = async () => {
  const resgatarCarrinho = getSavedCartIDs();
  const promessa = Promise.all(
    resgatarCarrinho.map((itemAdd) => fetchProduct(itemAdd)),
  );
  (await promessa).forEach((item) => {
    const itensLS = createCartProductElement(item);
    document.querySelector('.cart__products').appendChild(itensLS);
  });
  somarTotal(); // RQ10
};

// RQ10

const carrinho = document.querySelector('.cart__products');

carrinho.addEventListener('click', () => {
  somarTotal();
});
