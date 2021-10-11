import { Carrito } from "../classModels/Carrito";

const chart = new Carrito();

export const getProductsFromChart = (req, res) => {
  return res.status(200).json(chart);
};

export const addProducts = (req, res) => {
  let { body } = req;
  chart.products.push(body);
  return res.json(body);
};

export const deleteProducts = (req, res) => {
  let { id } = req.params;
  let producto = chart.products.findIndex((i) => i.id == id);
  let deleted = chart.products.splice(producto, 1);
  res.json(deleted);
};
