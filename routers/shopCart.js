const { Router } = require("express");
const ShopCart = require("../models").shopCart;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const allCarts = await ShopCart.findAll();
    return res.status(200).send({ message: "ok", allCarts });
  } catch (e) {
    console.log(e.message);
  }
});

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

module.exports = router;
