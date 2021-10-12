import { Producto } from "../classModels/Productos.js";
import fs from "fs";

let admin = true;
let products = [];

export const getProducts = (req, res) => {
  let { id } = req.params;
  let productToShow = products.find((product) => product.id == id);
  if (id) {
    return res.json(productToShow);
  } else {
    return res.json(products);
  }
};

export const addProducts = (req, res, next) => {
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
    products.push(productToAdd);
    fs.appendFile(
      "./products.txt",
      JSON.stringify(productToAdd, null, "\t"),
      (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("producto guardado");
        }
      }
    );
    res.json(productToAdd);
  }
};

export const updateProduct = (req, res, next) => {
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
};

export const deleteProduct = (req, res) => {
  if (!admin) {
    next({ route: `${config.hostname}productos`, method: "PUT" });
  } else {
    let { id } = req.params;
    let product = products.findIndex((i) => i.id == id);
    let productToDelete = products.splice(product, 1);

    res.json(productToDelete);
  }
};
