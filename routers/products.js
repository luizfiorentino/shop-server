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

// GET all products and their category
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.findAll({
      include: { model: Category },
    });
    res.send(allProducts);
  } catch (e) {
    console.log(e);
  }
});

// GET one product and its category
router.get("/:id", async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const thisProduct = await Product.findByPk(productId, {
      include: { model: Category },
    });
    if (!thisProduct) {
      res.status(404).send("This id does not match any of the products'");
    } else {
      res.send(thisProduct);
    }
  } catch (e) {
    next(e);
    console.log(e);
  }
});

module.exports = router;
