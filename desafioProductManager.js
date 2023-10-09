class ProductManager {
    constructor() {
        this.products = [];
        this.usedCodes = new Set(); // Almacenar códigos utilizados
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Verificar campos obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw console.log(Error('Todos los campos son obligatorios.')); 
        }

        // Verificar code
        if (this.usedCodes.has(code)) {
            throw new Error('Code duplicado.');
        }

        // Verificar ID 
        const newId = this.#getMaxId() + 1;
        if (this.usedCodes.has(newId)) {
            throw new Error('ID duplicado.');
        }

        const product = {
            id: newId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        // Agregar códigos utilizados
        this.usedCodes.add(code);

        this.products.push(product);
        console.log("Producto agregado:");
    }

    #getMaxId() {
        let maxId = 0;
        this.products.forEach((product) => {
            if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    }

    getProducts() {
        return this.products;
    }

    getProductById(idProduct) {
        const product = this.products.find((p) => p.id === idProduct);

        if (!product) {
            throw console.log(Error('Not found'));
        }

        return product;
    }
}

// const productManager = new ProductManager();

// productManager.addProduct('Titulo de prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

// console.log(productManager.getProducts());
// console.log(productManager.getProductById(3));
