import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Integration test create product use case", () => {
  let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
      sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
      const productRepository = new ProductRepository();
      const usecase = new CreateProductUseCase(productRepository);
      const input = {
          id: "123",
          name: "Product 1",
          price: 10
      }

      const output = {
          id: expect.any(String),
          name: "Product 1",
          price: 10
      }
      const result = await usecase.execute(input);
      expect(result).toEqual(output);
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);
    const input = {
        id: "123",
        name: "",
        price: 10
    }

    await expect(usecase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is less than zero", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);
    const input = {
        id: "123",
        name: "Product 1",
        price: -1
    }

    await expect(usecase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});

  