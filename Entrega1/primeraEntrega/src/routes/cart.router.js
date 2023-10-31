import { Router } from "express";
import { CartManager } from "../CartManager.js";
import { ProductManager } from "../ProductManager.js";

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager(); 

// Crear el carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Buscar carrito por ID
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);

        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/:idCart/product/:idProd', async (req, res) => {
    try {
        const { idProd, idCart } = req.params;
        const cart = await cartManager.getCartById(idCart);
        const product = await productManager.getProductById(idProd); 
        if (cart && product) {
            await cartManager.saveProductToCart(idCart, idProd);
            res.status(201).json({ message: 'Product added to cart successfully' });
        } else {
            res.status(404).json({ error: 'Cart or Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
