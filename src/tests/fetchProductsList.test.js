import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    );
  });
  it("Teste se o retorno da função fetchProductsList com o argumento 'computador' é uma estrutura de dados igual ao objeto computadorSearch", async () => {
    const fetch1 = await fetchProductsList('computador');
    expect(fetch1).toEqual(computadorSearch);
  });
  it("Teste se, ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: 'Termo de busca não informado'.", () => {
    return expect(() => fetchProductsList()).rejects.toThrow(
      'Termo de busca não informado'
    );
  });
  it("Teste se, ao chamar a função fetchProductsList com argumento inválido, retorna um erro diferente.", async () => {
    const id = '123/57/f/3'
    const message = (await (await fetchProductsList('123/57/f/3')))
     return expect(message).toBe(
      'URL não mapeadahttps://api.mercadolibre.com/items/123/57/f/3'
    );
  });
});
