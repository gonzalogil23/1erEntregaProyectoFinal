import { Router } from "express";

const carritoRouter = Router();

class Carrito {
  constructor() {
    this.id = id;
    this.timestamp = Date.now();
    this.products = [];
  }

  getProductsFromChart(req, res) {
    res.json(this.products);
  }

  addProducts(req, res) {
    let { body } = req;
    this.products.push(body);
    return res.json(body);
  }

  deleteProduct(req, res) {
    let { id } = req.params;
    let producto = this.products.findIndex((i) => i.id == id);
    let deleted = this.products.splice(producto, 1);
    res.json(deleted);
  }
}
const chart = new Carrito();

carritoRouter
  .get("/listaProductos", getProductsFromChart)
  .post("/agregarProducto/:id", addProducts)
  .delete("/borrarProducto/:id", deleteProduct);

export default carritoRouter;
