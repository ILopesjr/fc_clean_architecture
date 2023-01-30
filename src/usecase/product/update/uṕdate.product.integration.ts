import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import CreateProductUseCase from '../create/create.product.usecase';
import UpdateProductUseCase from './update.product.usecase';

describe('Update Product Use Case', () => {
  let sequelize: Sequelize;
  let productRepository: ProductRepository;
  let createProductUseCase: CreateProductUseCase;
  let updateProductUseCase: UpdateProductUseCase;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
    productRepository = new ProductRepository();
    createProductUseCase = new CreateProductUseCase(productRepository);
    updateProductUseCase = new UpdateProductUseCase(productRepository);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should update a product', async () => {
    const product = await createProductUseCase.execute({
      name: 'Product 1',
      price: 100,
    });
    const updatedProduct = await updateProductUseCase.execute({
      id: product.id,
      name: 'Product 1 Updated',
      price: 200,
    });
    expect(updatedProduct.id).toEqual(product.id);
    expect(updatedProduct.name).toEqual('Product 1 Updated');
    expect(updatedProduct.price).toEqual(200);
  });
});
