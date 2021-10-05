import { Router } from "express";

const productosRouter = Router();

let admin = true;
let products = [];

class Producto {
  constructor(name, description, code, image, price, stock) {
    this.id = id;
    this.timestamp = Date.now();
    this.name = name;
    this.description = description;
    this.code = code;
    this.image = image;
    this.price = price;
    this.stock = stock;
  }

  getProducts(req, res) {
    let { id } = req.params;
    let productToShow = products.find((product) => product.id == id);
    if (id) {
      return res.json(productToShow);
    } else {
      return res.json(products);
    }
  }

  addProducts(req, res, next) {
    const { name, description, code, image, price, stock } = req.body;

    if (!admin) {
      next({ route: `${config.hostname}productos`, method: "POST" });
    } else {
      const productToAdd = new Producto(
        name,
        description,
        code,
        image,
        price,
        stock
      );
      res.json(productToAdd);
    }
  }

  updateProduct(req, res, next) {
    let { id } = req.params;
    const { name, description, code, image, price, stock } = req.body;
    const productToUpdate = products.find((product) => product.id == id);

    if (!admin) {
      next({ route: `${config.hostname}productos`, method: "PUT" });
    } else {
      if (!productToUpdate) {
        res.json({ message: "producto no encontrado" });
      } else {
        (productToUpdate.name = name),
          (productToUpdate.description = description),
          (productToUpdate.code = code),
          (productToUpdate.image = image),
          (productToUpdate.price = price),
          (productToUpdate.stock = stock);
        res.json(productToUpdate);
      }
    }
  }

  deleteProduct(req, res) {
    if (!admin) {
      next({ route: `${config.hostname}productos`, method: "PUT" });
    } else {
      let { id } = req.params;
      let product = products.findIndex((i) => i.id == id);
      let productToDelete = products.splice(product, 1);

      res.json(productToDelete);
    }
  }
}

productosRouter
  .get("/", getProducts)
  .post("/agregarProducto", addProducts)
  .put("/actualizarProducto/:id", updateProduct)
  .delete("/borrarProducto/:id", deleteProduct);

export default productosRouter;
