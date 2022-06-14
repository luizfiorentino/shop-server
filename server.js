const express = require("express");
const app = express();
const PORT = 4000;
const routerProducts = require("./routers/products");
const routerShopCart = require("./routers/shopCart");
const authRouter = require("./routers/auth");

const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/products", routerProducts);
app.use("/shopCarts", routerShopCart);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening", PORT);
});
