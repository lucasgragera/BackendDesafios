

import express from 'express';
import { ProductManager } from './ProductManager.js';

const productManager = new ProductManager();

const app = express();

app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit));
            res.status(200).json(limitedProducts);
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductById(Number(id));

        if (!product) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el producto" });
    }
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));