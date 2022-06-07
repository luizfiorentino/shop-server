const express = require("express");
const app = express();
const PORT = 4000;
const routerProducts = require("./routers/products");

const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/products", routerProducts);

app.listen(PORT, () => {
  console.log("Listening", PORT);
});
