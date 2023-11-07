import { Router } from "express";
import { ProductManager } from "../ProductManager.js";
const router = Router();
const store = new ProductManager();

router.get("/", async (req, res) => {
  const products = await store.getProducts();

  res.render("realtimeproducts");
});

export default router;