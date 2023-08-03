import express from "express";
import fs from "fs/promises";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`Servidor ON`);
});

app.get("/products", async (req, res) => {
  try {
    const data = await fs.readFile("products.json", "utf8");
    const products = JSON.parse(data);

    // Lee el valor de la query "limit"
    const limit = req.query.limit;

    // Si se recibió la query"limit", devuelve el número de productos solicitados
    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      res.json(limitedProducts);
    } else {
      // Si no se recibió la query "limit", devuelve todos los productos
      res.json(products);
    }
  } catch (error) {
    console.error("Error al leer el archivo products.json:", error);
    res.json({ error: "Error al obtener los productos" });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const data = await fs.readFile("products.json", "utf8");
    const products = JSON.parse(data);

    // Lee el valor del param "pid"
    const pid = parseInt(req.params.pid);

    // Busca el producto en la lista por su "id"
    const producto = products.find((item) => item.id === pid);

    // Si el producto existe lo devuelve, si no devuelve un mensaje de error
    if (producto) {
      res.json(producto);
    } else {
      res.json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al leer el archivo products.json:", error);
    res.json({ error: "Error al obtener el producto" });
  }
});

app.listen(8080, () => {
  console.log("Servidor en puerto 8080");
});
