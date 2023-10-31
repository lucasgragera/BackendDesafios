import fs from "fs";
//const productManager = new ProductManager("../product.json");


export class CartManager {
  constructor() {
    // this.path = path;
    this.path = './product.json';
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const cartsJSON = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(cartsJSON);
      } else return [];
    } catch (error) {
      console.log(error);
    }
  }

  async #getMaxId() {
    let maxId = 0;
    const carts = await this.getCarts();
    carts.map((prod) => {
      if (prod.id > maxId) maxId = prod.id;
    });
    return maxId;
  }

  async createCart() {
    try {
      const cart = {
        id: (await this.#getMaxId()) + 1,
        products: [],
      };
      const cartsFile = await this.getCarts();
      cartsFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
        const carts = await this.getCarts();
        // const cart = carts.find(c => c.id == id);
        const cart = carts.find(c => c.id == id);
        if(!cart) return false;
        return cart;
    } catch (error) {
        console.log(error);
    }
  }

  async saveProductToCart(idCart, idProd){
    const carts = await this.getCarts();
    const cartExists = await this.getCartById(idCart);
    console.log("Cart exists:", cartExists);

    if(cartExists){
        const existProdInCart = cartExists.products.find(p => p.id === idProd);
        console.log("Existing product in cart:", existProdInCart);
        if (existProdInCart) existProdInCart.quantity += 1;
        else {
            const prod = {
                product: idProd,
                quantity: 1
            };
            cartExists.products.push(prod);
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        return cartExists;
    }
  }
}