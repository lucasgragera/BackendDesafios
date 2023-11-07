import express from 'express';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import productRouter from './routes/product.router.js';
import cartManager from './routes/cart.router.js';
import realtimeproducts from './routes/realtimeproducts.router.js'
import { ProductManager } from './ProductManager.js';

const store = new ProductManager();
const app = express();

app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/carts', cartManager);
app.use("/" , realtimeproducts);
app.use('/realtimeproducts', realtimeproducts);

app.get('/', (req, res) => {
    res.render('websocket')
})

const PORT = 8080;

const httpServer = app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
    console.log("Cliente conectado");
    const productos = await store.getProducts();
    socket.emit("productos", productos);
    
})


export default socketServer;