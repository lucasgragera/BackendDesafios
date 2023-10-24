import fs from 'fs';

export {productManager};

class ProductManager {
    constructor() {
        this.path = './product.json';
        this.usedCodes = new Set();
        this.nextId = 1;
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(productsJSON);
            } else return [];
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(product) {
        try {
            product.id = this.nextId++;

            const products = await this.getProducts();

            product.code = await this.generateUniqueCode();

            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
    }

    async generateUniqueCode() {
        let code;
        do {
            code = Math.floor(1000 + Math.random() * 9000);
        } while (this.usedCodes.has(code));

        this.usedCodes.add(code);
        return code;
    }
    async updateProduct(id, updatedFields) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex((p) => p.id === id);

            if (productIndex !== -1) {
                products[productIndex] = { ...products[productIndex], ...updatedFields };
                await fs.promises.writeFile(this.path, JSON.stringify(products));
            } else {
                console.log(`Producto con ID ${id} no encontrado.`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const updatedProducts = products.filter((product) => product.id !== id);

            if (products.length !== updatedProducts.length) {
                await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
                console.log(`Producto con ID ${id} eliminado.`);
            } else {
                console.log(`Producto con ID ${id} no encontrado.`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find((p) => p.id === id);

            if (product) {
                return product;
            } else {
                console.log(`Producto con ID ${id} no encontrado.`);
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const productManager = new ProductManager();

const product1 = {
    title: 'Manzana',
    description: 'Roja',
    price: '200',
    thumbnail: 'No',
    stock: 500
};

const product2 = {
    title: 'Banana',
    description: 'Amarilla',
    price: '250',
    thumbnail: 'No',
    stock: 300
};

const product3 = {
    title: 'Melon',
    description: 'Violeta',
    price: '50',
    thumbnail: 'No',
    stock: 2
};

const product4 = {
    title: 'Sandia',
    description: 'Sandia',
    price: '500',
    thumbnail: 'No',
    stock: 10
};
const product5 = {
    title: 'Rucula',
    description: 'Rucula',
    price: '30',
    thumbnail: 'No',
    stock: 10
};
const product6 = {
    title: 'Naranja',
    description: 'Naranja',
    price: '100',
    thumbnail: 'No',
    stock: 50
};
const product7 = {
    title: 'Limon',
    description: 'Limon',
    price: '40',
    thumbnail: 'No',
    stock: 200
};
const product8 = {
    title: 'Mandarina',
    description: 'Mandarina',
    price: '30',
    thumbnail: 'No',
    stock: 200
};
const product9 = {
    title: 'Huevos',
    description: 'Maple 30u',
    price: '1200',
    thumbnail: 'No',
    stock: 20
};
const product10 = {
    title: 'Pimiento',
    description: 'Rojo',
    price: '50',
    thumbnail: 'No',
    stock: 50
};

//Metodo para testear el funcionamiento del codigo
const test = async () => {
    await productManager.addProduct(product1);
    await productManager.addProduct(product2);
    await productManager.addProduct(product3);
    await productManager.addProduct(product4);
    await productManager.addProduct(product5);
    await productManager.addProduct(product6); 
    await productManager.addProduct(product7);
    await productManager.addProduct(product8);
    await productManager.addProduct(product9);
    await productManager.addProduct(product10);
    console.log('Lista de productos', await productManager.getProducts());

test();
}
