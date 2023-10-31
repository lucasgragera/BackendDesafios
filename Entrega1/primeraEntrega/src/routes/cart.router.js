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
            // Calcula la cantidad total de cada producto en el carrito
            const cartWithQuantity = {
                ...cart,
                products: cart.products.map((product) => ({
                    ...product,
                    quantity: product.quantity || 1, // Establece una cantidad predeterminada si no está definida
                })),
            };

            res.status(200).json(cartWithQuantity);
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
        const cart = await cartManager.getCartById(Number(idCart));
        const product = await productManager.getProductById(Number(idProd)); 
        if (cart && product) {
            const updatedCart = await cartManager.saveProductToCart(Number(idCart), Number(idProd));
            const addedProduct = updatedCart.products.find(p => p.product === Number(idProd));
            res.status(201).json({ message: 'Product added to cart successfully', addedProduct, cart: updatedCart });
        } else {
            res.status(404).json({ error: 'Cart or Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;
