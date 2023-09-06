import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import * as Yup from "yup";

export default class ProductController {
  private repository = AppDataSource.getRepository(Product);

  async listAll(request: Request, response: Response, next: NextFunction) {
    const products = await this.repository.find();
    return response.json(products);
  }

  async listByCode(request: Request, response: Response, next: NextFunction) {
    const { code } = request.params;
    const product = await this.repository
      .find({ where: { code: parseInt(code) } });
    return response.status(201).json(product);
  };

  async editPrice(request: Request, response: Response, next: NextFunction) {
    const { code } = request.params;

    const { cost_price } = request.body;

    const data = { cost_price };

    const validation = Yup
      .object()
      .shape({
        cost_price: Yup
          .number()
          .required('Campo de preço invalido'),
      });

    await validation.validate(data, { abortEarly: false });

    const product = await this.repository.findOneBy({ code: parseInt(code) });

    this.repository.merge(product, data);

    const results = await this.repository.save(product);

    return response.status(201).send(results);
  };
}
