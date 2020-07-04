import { Router } from "express";
import { getRepository } from "typeorm";
import Product from "../models/Product";

const productsRoutes = Router();

interface ProductDTO {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  user_id: string;
}

class CreateProductService {
  public async execute({
    name,
    description,
    category,
    price,
    stock,
    user_id,
  }: ProductDTO): Promise<Product> {
    const productsRepository = getRepository(Product);

    const product = productsRepository.create({
      category,
      name,
      description,
      price,
      stock,
      user_id,
    });

    await productsRepository.save(product);
    return product;
  }
}

productsRoutes.get("/", async (req, res) => {
  const productsRepository = getRepository(Product);
  const allProducts = await productsRepository.find();
  return res.json(allProducts);
});

productsRoutes.get("/filter", async (req, res) => {
  const { name, description, category } = req.body;
  const productsRepository = getRepository(Product);
  const allProductsName = await productsRepository.findOne({ name });
  if (name) {
    return res.json(allProductsName);
  }
  const allProductsDescription = await productsRepository.findOne({
    description,
  });
  if (description) {
    return res.json(allProductsDescription);
  }
  const allProductsCategory = await productsRepository.findOne({
    category,
  });
  if (category) {
    return res.json(allProductsCategory);
  }
});

productsRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const productsRepository = getRepository(Product);
  await productsRepository.delete(id);
  return res.status(204).send();
});

productsRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, category, price, stock } = req.body;

  const productsRepository = getRepository(Product);
  const productToUpdate = await productsRepository.findOne(id);
  productsRepository.update(id, { name, description, category, price, stock });
  return res.json(productToUpdate);
});

productsRoutes.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, category, price, stock } = req.body;
    const { id } = req.user;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({
      name,
      description,
      category,
      price,
      stock,
      user_id: id,
    });
    return res.json(product);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default productsRoutes;
