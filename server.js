import { express } from "express";
import carritoRouter from "./Carrito";
import productosRouter from "./Productos";

const app = express();

app.use(express.json());
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hola Root" });
});

const errorHandler = (err, req, res) => {
  if (!err) {
    return res.status(409);
  } else {
    return res.json({
      error: -1,
      descripcion: `ruta ${err.route} método ${err.method} no autorizada`,
    });
  }
};

app.use("/carrito", carritoRouter);
app.use("/productos", productosRouter);
app.use(errorHandler);
