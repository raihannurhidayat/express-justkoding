const path = require("path");
const express = require("express");
const routerCategories = require("./routers/router.categories.js");
const routerProduct = require("./routers/router.product.js");
const routerProfile = require("./routers/router.profile.js");
const routerReview = require("./routers/router.review.js");
const authRouter = require("./routers/authRouter.js");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const { errorHandler, notFound } = require("./middleware/Error.middleware.js");
const cookieParse = require("cookie-parser");

dotenv.config();

const app = express();
const port = process.env.PORT;

// midleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "/public/uploads"))
);

// routing
app.use("/api/v1/categories", routerCategories);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", routerProduct);
app.use("/api/v1/profile", routerProfile);
app.use("/api/v1/review", routerReview);

app.use(notFound);
app.use(errorHandler);
// server
app.listen(5000, () => {
  console.log(`server up an running in http://localhost:${port}`);
});
