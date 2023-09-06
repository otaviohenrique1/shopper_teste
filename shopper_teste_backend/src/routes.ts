import { Router } from "express";
import ProductController from "./controller/ProductController";

const routes = Router();

const product = new ProductController();
routes.get("/product", product.listAll);
routes.get("/product/:code", product.listByCode);
routes.put("/product/:code", product.editPrice);

export default routes;
