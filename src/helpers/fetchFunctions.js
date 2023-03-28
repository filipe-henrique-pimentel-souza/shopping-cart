// Requisito 7 - Requisição à API de 1 produto específico

export const fetchProduct = async (id) => {
  // seu código aqui
  if (id === undefined) {
    throw new Error('ID não informado');
  }
  try {
    const urlProduto = `https://api.mercadolibre.com/items/${id}`;
    const fetchID = await fetch(urlProduto);
    const response = await fetchID.json();
    return response;
  } catch (error) {
    return error.message;
  }
};

// Requisito 2 - Requisição para API do Mercado Livre

export const fetchProductsList = async (input) => {
  // seu código aqui
  if (input === undefined) {
    throw new Error('Termo de busca não informado');
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${input}`;
  const urlJson = await fetch(url);
  const response = await urlJson.json();
  return response.results;
};

// Fim RQ2
