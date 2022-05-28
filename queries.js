const express = require("express");

const app = express();
const PORT = 3000;
const Product = require("./models").product;
const Category = require("./models").category;
app.use(express.json());

app.get("/test", async (req, res) => {
  res.send({ message: "hello motto" });
});

// GET all products with category
app.get("/products", async (req, res) => {
  try {
    const allProducts = await Product.findAll({
      include: { model: Category },
    });
    res.send(allProducts);
  } catch (e) {
    console.log(e);
  }
});

// GET all categories with products
app.get("/categories", async (req, res) => {
  const allCategories = await Category.findAll({ include: { model: Product } });
  res.send(allCategories);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
