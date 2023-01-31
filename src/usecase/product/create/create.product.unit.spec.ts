import CreateProductUseCase from './create.product.usecase';

const input = {
  name: 'Product',
  price: 10,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test create product use case', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it('should throw error when name is empty', async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(
      productCreateUseCase.execute({ ...input, name: '' })
    ).rejects.toThrowError('Name is required');
  });

  it('should throw error when price is less than zero', async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(
      productCreateUseCase.execute({ ...input, price: -1 })
    ).rejects.toThrowError('Price must be greater than zero');
  });
});
