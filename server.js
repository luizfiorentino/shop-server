const express = require("express");
const app = express();
const PORT = 4000;
const routerProducts = require("./routers/products");

app.use(express.json());
//app.use(cors());

app.use("/", routerProducts);

app.listen(PORT, () => {
  console.log("Listening", PORT);
});
