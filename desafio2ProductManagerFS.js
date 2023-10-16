const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = './product.json';
        this.usedCodes = new Set(); // Almacenar códigos utilizados
        this.nextId = 1; // Inicializar el próximo ID en 1
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
            // Asignar el próximo ID y luego incrementarlo para el siguiente producto
             product.id = this.nextId++;
            
             const products = await this.getProducts();

             

            // Incrementar el código automáticamente
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
            code = Math.floor(1000 + Math.random() * 9000); // Generar un código aleatorio de 4 dígitos
        } while (this.usedCodes.has(code));

        this.usedCodes.add(code);
        return code;
    }
    async updateProduct(id, updatedFields) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex((p) => p.id === id);

            if (productIndex !== -1) {
                // Actualizar los campos especificados sin cambiar el ID
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

// const test = async () => {
//     await productManager.addProduct(product1);
//     console.log('primer consulta', await productManager.getProducts());
//     await productManager.addProduct(product2);
//     await productManager.addProduct(product3);
//     console.log('segunda consulta', await productManager.getProducts());

//     await productManager.addProduct(product1);

//     const productId = 3;
//     const foundProduct = await productManager.getProductById(productId);

//     if (foundProduct) {
//         console.log(`Producto con ID ${productId}:`, foundProduct);
//     }
// };

// test();
