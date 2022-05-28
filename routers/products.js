// Create a new Router for the product routes.
//Export the router and import it in the main server.js
//file, attach the router to the app using app.use

const { Router } = require("express");
const Product = require("../models").product;
const Category = require("../models").category;

const router = new Router();

router.get("/t", async (req, res) => {
  res.send({ message: "hello motto" });
});

router.get("/products", async (req, res) => {
  try {
    const allProducts = await Product.findAll({
      include: { model: Category },
    });
    res.send(allProducts);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
