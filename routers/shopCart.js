const { Router } = require("express");
const ShopCart = require("../models").shopCart;

const router = new Router();

// GET all items added to shopCart
router.get("/", async (req, res, next) => {
  try {
    const allCarts = await ShopCart.findAll();
    return res.status(200).send({ message: "ok", allCarts });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

// POST a new item to the cart
router.post("/", async (req, res, next) => {
  try {
    const { productId, productName, price, userEmail } = req.body;
    const newItem = await ShopCart.create({
      productId,
      productName,
      price,
      userEmail,
    });
    return res.status(200).send({ message: "new item added", newItem });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// removes a item added to the cart
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await ShopCart.findByPk(id);
    if (!item) {
      return res.status(404).send("Item not found");
    }

    await item.destroy();

    res.send({ message: "ok", id });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
