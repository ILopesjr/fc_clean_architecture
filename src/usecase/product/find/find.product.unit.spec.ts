import Product from '../../../domain/product/entity/product';
import FindProductUseCase from './find.product.usecase';

const product = new Product('1', 'Product 1', 10.0);

const MockProductRepository = () => ({
  return: {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
});

describe('Unit Test: Find Product Use Case', () => {
  it('should find a product', async () => {
    const productRepository = MockProductRepository();
    const usecase = new FindProductUseCase(productRepository as any);

    const input = {
      id: '1',
    };

    const output = {
      id: '1',
      name: 'Product 1',
      price: 10.0,
    }

    expect(output).toEqual({
      id: '1',
      name: 'Product 1',
      price: 10.0,
    });
  });
});
