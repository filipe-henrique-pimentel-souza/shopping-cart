import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/items/MLB1405519561'
    );
  });
  it("Teste se o retorno da função fetchProduct com o argumento 'MLB1405519561' é uma estrutura de dados igual à variável \'product\'", async () => {
    const fetch1 = await fetchProduct('MLB1405519561');
    expect(fetch1).toEqual(product);
  });
  it("Teste se, ao chamar a função fetchProduct sem argumento, retorna um erro com a mensagem: 'ID não informado'.", () => {
    return expect(() => fetchProduct()).rejects.toThrow(
      'ID não informado'
    );
  });
  it("Teste se, ao chamar a função fetchProduct com argumento inválido, retorna um erro diferente.", async () => {
    const id = '123/57/f/3'
    const message = (await (await fetchProduct('123/57/f/3')))
     return expect(message).toBe(
      'URL não mapeadahttps://api.mercadolibre.com/items/123/57/f/3'
    );
  });
});
