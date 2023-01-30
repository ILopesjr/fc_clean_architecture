import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import CreateProductUseCase from '../create/create.product.usecase';
import ListProductUseCase from './list.product.usecase';

describe('Integration test for listing product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should list a product', async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);
    await useCase.execute({
      name: 'Product 1',
      price: 100,
    });

    const listProductUseCase = new ListProductUseCase(productRepository);
    const output = await listProductUseCase.execute({});

    expect(output.products.length).toBe(1);
    expect(output.products[0].name).toBe('Product 1');
    expect(output.products[0].price).toBe(100);
  });
});
