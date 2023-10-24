import express from 'express';
// import { products } from '../products.js';
import {products} from './ProductManager.js'
const app = express();

app.get('/products', (req, res) => {
    const { limit } = req.query;

    if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit));
        res.status(200).json(limitedProducts);
    } else {
        res.status(200).json(products);
    }
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id == Number(id));

    if (!product) {
        res.status(404).json({ error: "Producto no encontrado" });
    } else {
        res.status(200).json(product);
    }
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));