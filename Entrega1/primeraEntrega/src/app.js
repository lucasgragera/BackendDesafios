

import express from 'express';
import productRouter from './routes/product.router.js'; 
import cartManager from './routes/cart.router.js';

const app = express();

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartManager);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));
