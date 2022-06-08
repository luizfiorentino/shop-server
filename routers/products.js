// Create a new Router for the product routes.
//Export the router and import it in the main server.js
//file, attach the router to the app using app.use

const { Router } = require("express");
const Product = require("../models").product;
const Category = require("../models").category;
const Review = require("../models").review;

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

// GET all reviews
router.get("/reviews/all", async (req, res, next) => {
  try {
    const allReviews = await Review.findAll();
    res.status(200).send({ message: "ok", allReviews });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

// GET all reviews for a product
router.get("/reviews/:prodId", async (req, res, next) => {
  try {
    const prodId = parseInt(req.params.prodId);
    const thisProduct = await Product.findByPk(parseInt(prodId));
    if (!thisProduct) {
      res.status(404).send("Product not found");
    } else {
      const reviews = await Review.findAll({
        where: { productId: prodId },
      });
      //  where: { userId: req.user.id },
      res.status(200).send(reviews);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// router.get("/reviews/:id", async (req, res, next) => {
//   try {
//     const reviewId = parseInt(req.params.id);
//     const thisReview = await Review.findByPk(reviewId);
//     if (!thisReview) {
//       res.status(404).send("This id does not match any of the products'");
//     } else {
//       res.send(thisReview);
//     }
//   } catch (e) {
//     next(e);
//     console.log(e);
//   }
// });

// POST a new review
router.post("/reviews/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userReview } = req.body;
    const newReview = await Review.create({
      userReview,
      productId: id,
    });
    res.send({ message: "review sent", newReview });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
