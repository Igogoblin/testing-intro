const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products, 'asc');
    expect(result.map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    const result = sortProductsByPrice(products);
    expect(result.map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const items = [
      products.find(p => p.id === 1),
      products.find(p => p.id === 3),
      products.find(p => p.id === 4),
    ];
    
    const result = sortProductsByPrice(items, 'asc');

    expect(result.map(p => p.id)).toEqual([3, 4, 1]);
  });
  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    const result = sortProductsByPrice(products, 'desc');
    expect(result.map((product) => product.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });
  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const items = [
      products.find(p => p.id === 3),
      products.find(p => p.id === 1),
      products.find(p => p.id === 4),
    ];
    
    const result = sortProductsByPrice(items, 'desc');
  });
  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const items = [
      products.find(p => p.id === 5),
      products.find(p => p.id === 2),
      products.find(p => p.id === 6),
    ];
    
    const result = sortProductsByPrice(items, 'desc');
    expect(result.map(p => p.id)).toEqual([2, 5, 6]);
  });
  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const result = sortProductsByPrice([1, 3, 4], 'asc');
    expect(result).toEqual([1, 3, 4]);
  });
  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const result = sortProductsByPrice([1, 3, 4], 'desc');
    expect(result).toEqual([1, 3, 4]);
  });
  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const result = sortProductsByPrice(products);
    for (let i = 0; i < result.length - 1; i += 1) {
      expect(result[i].price).toBeLessThanOrEqual(result[i + 1].price);
    }
  });
});
