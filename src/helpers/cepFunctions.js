export const getAddress = async (cep) => {
  // seu código aqui
  try {
    const urlAPI1 = `https://cep.awesomeapi.com.br/json/${cep}`;
    const urlAPI2 = `https://brasilapi.com.br/api/cep/v2/${cep}`;
    const promessa = await Promise.any([fetch(urlAPI1), fetch(urlAPI2)]);
    const response = await promessa.json();
    return response;
  } catch (error) {
    throw new Error('CEP não encontrado');
  }
};

export const searchCep = async () => {
  // seu código aqui
  const enderecoSpan = document.querySelector('.cart__address');
  try {
    const qualCep = document.querySelector('.cep-input').value;
    const {
      address_name: rua,
      district,
      city,
      state,
      address_type: type,
    } = await getAddress(qualCep);
    enderecoSpan.innerText = `${type} ${rua} - ${district} - ${city} - ${state}`;
  } catch (error) {
    enderecoSpan.innerText = error.message;
  }
};
