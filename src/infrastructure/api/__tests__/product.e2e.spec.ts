import { app, sequelize } from "../express";
import request from "supertest";

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        name: 'Product 1',
        price: 10,
        description: 'Product 1 description',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Product 1');
    expect(response.body.price).toBe(10);
    expect(response.body.description).toBe('Product 1 description');
  });

  it('should not create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'john',
    });
    expect(response.status).toBe(500);
  });

  it('should list all products', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        name: 'Product 1',
        price: 10,
        description: 'Product 1 description',
      });
    expect(response.status).toBe(200);
    const response2 = await request(app)
      .post('/product')
      .send({
        name: 'Product 2',
        price: 20,
        description: 'Product 2 description',
      });
    expect(response2.status).toBe(200);
    const response3 = await request(app).get('/product');
    expect(response3.status).toBe(200);
    expect(response3.body.length).toBe(2);
  });
});