import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import FindProductUseCase from './find.product.usecase';
import CreateProductUseCase from '../create/create.product.usecase';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';

describe('Integration Test: Find Product Use Case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const findProductUseCase = new FindProductUseCase(productRepository);

    const input = {
      id: '123',
      name: 'Product 1',
      price: 10,
    };

    const output = {
      id: expect.any(String),
      name: 'Product 1',
      price: 10,
    };

    const createdProduct = await createProductUseCase.execute(input);
    expect(createdProduct).toEqual(output);

    const result = await findProductUseCase.execute({ id: createdProduct.id });
    expect(result).toEqual(output);
  });
});
