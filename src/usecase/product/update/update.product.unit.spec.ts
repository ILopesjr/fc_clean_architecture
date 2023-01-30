import ProductFactory from '../../../domain/product/factory/product.factory';
import UpdateProductUseCase from './update.product.usecase';

const product = ProductFactory.create('a', 'Product 1', 100);

const input = {
  id: product.id,
  name: 'Product 1 Updated',
  price: 200,
};

const MockProductRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test for update Product Use Case', () => {
  it('should update a product', async () => {
    const productRepository = MockProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const output = await updateProductUseCase.execute(input);
    expect(output).toEqual(input);
  });
});
